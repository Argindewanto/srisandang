import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthStore = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
};

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "M41np5dx7";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      login: (username: string, password: string) => {
        const isValid = 
          username === ADMIN_USERNAME && 
          password === ADMIN_PASSWORD;
        
        if (isValid) {
          set({ isAuthenticated: true });
          localStorage.setItem('isAuthenticated', 'true');
        }
        return isValid;
      },
      logout: () => {
        set({ isAuthenticated: false });
        localStorage.removeItem('isAuthenticated');
      },
    }),
    {
      name: 'auth-storage',
    }
  )
); 