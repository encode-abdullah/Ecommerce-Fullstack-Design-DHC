import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (userData, token) => set({ user: userData, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      isAdmin: () => get().user?.isAdmin || false
    }),
    {
      name: 'auth-storage'
    }
  )
)

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      savedItems: [],
      totalItems: 0,
      totalPrice: 0,
      setCart: (items) => set({ cartItems: items }),
      addItem: (item) => set((state) => {
        const existing = state.cartItems.find(i => i.product._id === item.product._id)
        if (existing) {
          return {
            cartItems: state.cartItems.map(i => 
              i.product._id === item.product._id 
                ? { ...i, quantity: i.quantity + item.quantity } 
                : i
            )
          }
        }
        return { cartItems: [...state.cartItems, item] }
      }),
      removeItem: (productId) => set((state) => ({
        cartItems: state.cartItems.filter(i => i.product._id !== productId)
      })),
      updateQuantity: (productId, quantity) => set((state) => ({
        cartItems: state.cartItems.map(i => 
          i.product._id === productId ? { ...i, quantity } : i
        )
      })),
      clearCart: () => set({ cartItems: [] }),
      saveForLater: (productId) => set((state) => {
        const itemToSave = state.cartItems.find(i => i.product._id === productId)
        if (!itemToSave) return {}
        const filteredCart = state.cartItems.filter(i => i.product._id !== productId)
        const alreadySaved = state.savedItems.some(i => i._id === itemToSave.product._id)
        const newSaved = alreadySaved ? state.savedItems : [...state.savedItems, itemToSave.product]
        return {
          cartItems: filteredCart,
          savedItems: newSaved
        }
      }),
      moveToCart: (product) => set((state) => {
        const filteredSaved = state.savedItems.filter(i => i._id !== product._id)
        const existing = state.cartItems.find(i => i.product._id === product._id)
        const newCart = existing 
          ? state.cartItems.map(i => i.product._id === product._id ? { ...i, quantity: i.quantity + 1 } : i)
          : [...state.cartItems, { product, quantity: 1 }]
        return {
          cartItems: newCart,
          savedItems: filteredSaved
        }
      }),
      removeSavedItem: (productId) => set((state) => ({
        savedItems: state.savedItems.filter(i => i._id !== productId)
      }))
    }),
    {
      name: 'cart-storage'
    }
  )
)

export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: true,
      toggleTheme: () => set((state) => ({ isDark: !state.isDark }))
    }),
    {
      name: 'theme-storage'
    }
  )
)

export const useWishlistStore = create(
  persist(
    (set) => ({
      wishlist: [],
      setWishlist: (items) => set({ wishlist: items }),
      addToWishlist: (product) => set((state) => ({
        wishlist: state.wishlist.find(i => i._id === product._id) 
          ? state.wishlist 
          : [...state.wishlist, product]
      })),
      removeFromWishlist: (productId) => set((state) => ({
        wishlist: state.wishlist.filter(i => i._id !== productId)
      }))
    }),
    {
      name: 'wishlist-storage'
    }
  )
)