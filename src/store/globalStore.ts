import { create } from 'zustand'

interface GlobalState {
  cursorType: 'default' | 'hover'
  setCursorType: (type: 'default' | 'hover') => void
}

export const useGlobalStore = create<GlobalState>((set) => ({
  cursorType: 'default',
  setCursorType: (type) => set({ cursorType: type }),
}))
