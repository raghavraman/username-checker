import { create } from "zustand"

interface StoreState {
	input: string
	result: socialNameResult | null
	setInput: (input: string) => void
	setResult: (result: socialNameResult) => void
}

export const useSocialStore = create<StoreState>((set) => ({
	input: "",
	result: null,
	setInput: (input: string) => set({ input }),
	setResult: (result: socialNameResult) => set({ result })
}))
