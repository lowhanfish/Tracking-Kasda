import { create } from 'zustand';

const BASE_URL = 'http://localhost:3000/';

// Fungsi untuk mengecek token di localStorage
const checkToken = () => {
  const token = localStorage.getItem('authToken');
  // Mengembalikan nilai boolean: true jika token ada, false jika tidak
  return !!token; 
};

const useStorex = create((set) => ({
  // State untuk status login
  isLoggedIn: checkToken(),

  // State untuk URL API
  url: {
    URL_APP: BASE_URL,
    URL_LOGIN: `${BASE_URL}auth/login`,
    URL_MENU: `${BASE_URL}auth/login`,
    dua: `${BASE_URL}duax`
  },

  // State dan fungsi count Anda
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
  
  // Fungsi untuk login dan logout
  login: (token) => {
    // Simpan token ke localStorage
    localStorage.setItem('authToken', token);
    // Perbarui state isLoggedIn menjadi true
    set({ isLoggedIn: true });
  },

  logout: () => {
    // Hapus token dari localStorage
    localStorage.removeItem('authToken');
    // Perbarui state isLoggedIn menjadi false
    set({ isLoggedIn: false });
  },
}));

export default useStorex;