import { create } from 'zustand'

var URL = 'http://localhost:3000/'

const useStorex = create((set) => ({
  count: 0,
  url : {
    URL_APP : URL,
    URL_LOGIN : URL+'auth/login',
    dua : URL+'duax'
  },
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}))

export default useStorex