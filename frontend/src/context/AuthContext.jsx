import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile as firebaseUpdateProfile,
} from 'firebase/auth';
import { auth, googleProvider } from '../config/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const syncWithBackend = useCallback(async (fbUser) => {
    try {
      const token = await fbUser.getIdToken();
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/sync`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firebaseUid: fbUser.uid,
            email: fbUser.email,
            name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
            profileImage: fbUser.photoURL || '',
          }),
          signal: controller.signal,
        }
      );
      clearTimeout(timeout);

      if (response.ok) {
        const profile = await response.json();
        setUser({ ...profile, token });
      } else {
        setUser({
          _id: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
          email: fbUser.email || '',
          profileImage: fbUser.photoURL || '',
          role: 'user',
          token,
        });
      }
    } catch (error) {
      console.error('Backend sync failed, using Firebase data:', error);
      const token = await fbUser.getIdToken();
      setUser({
        _id: fbUser.uid,
        name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
        email: fbUser.email || '',
        profileImage: fbUser.photoURL || '',
        role: 'user',
        token,
      });
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      try {
        if (fbUser) {
          await syncWithBackend(fbUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth state error:', error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [syncWithBackend]);

  const handleLogin = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleRegister = async (name, email, password) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await firebaseUpdateProfile(result.user, { displayName: name });
    return result;
  };

  const handleGoogleLogin = async () => {
    return signInWithPopup(auth, googleProvider);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const handleUpdateProfile = async (userData) => {
    const fbUser = auth.currentUser;
    if (!fbUser) throw new Error('Not authenticated');

    if (userData.name) {
      await firebaseUpdateProfile(fbUser, { displayName: userData.name });
    }

    const token = await fbUser.getIdToken();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/auth/sync`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            firebaseUid: fbUser.uid,
            email: fbUser.email,
            name: userData.name || fbUser.displayName,
            profileImage: userData.profileImage || user?.profileImage || '',
          }),
        }
      );

      if (response.ok) {
        const profile = await response.json();
        setUser({ ...profile, token });
        return profile;
      }
    } catch (error) {
      console.error('Backend sync failed during profile update:', error);
    }

    setUser((prev) => ({
      ...prev,
      name: userData.name || prev?.name,
      profileImage: userData.profileImage || prev?.profileImage,
      token,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        handleLogin,
        handleRegister,
        handleGoogleLogin,
        handleLogout,
        handleUpdateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
