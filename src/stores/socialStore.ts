import { create } from "zustand"

interface StoreState {
	input: string
	result: socialNameResult | null
	loading: boolean
	setInput: (input: string) => void
	setResult: (result: socialNameResult | null) => void
	setLoading: (loading: boolean) => void
}

export const useSocialStore = create<StoreState>((set) => ({
	input: "",
	result: null,
	loading: false,
	setInput: (input: string) => set({ input }),
	setResult: (result: socialNameResult | null) => set({ result }),
	setLoading: (loading: boolean) => set({ loading })
}))
