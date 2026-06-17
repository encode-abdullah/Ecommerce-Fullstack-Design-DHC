import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { login, register, getProfile, updateProfile } from '../api';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };
    case 'LOGIN_FAIL':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return { ...state, user: null, token: null, isAuthenticated: false, loading: false };
    case 'UPDATE_PROFILE':
      return { ...state, user: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      if (state.token) {
        try {
          const user = await getProfile();
          dispatch({ type: 'SET_USER', payload: user });
        } catch (error) {
          dispatch({ type: 'LOGOUT' });
        }
      }
    };
    fetchUser();
  }, [state.token]);

  const handleLogin = async (credentials) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const data = await login(credentials);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      return data;
    } catch (error) {
      dispatch({ type: 'LOGIN_FAIL' });
      throw error;
    }
  };

  const handleRegister = async (userData) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const data = await register(userData);
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      return data;
    } catch (error) {
      dispatch({ type: 'LOGIN_FAIL' });
      throw error;
    }
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const handleUpdateProfile = async (userData) => {
    try {
      const updated = await updateProfile(userData);
      dispatch({ type: 'UPDATE_PROFILE', payload: updated });
      return updated;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        handleLogin,
        handleRegister,
        handleLogout,
        handleUpdateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);