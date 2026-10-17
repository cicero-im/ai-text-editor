import defaultPrompts from "@constants/prompt";
import type { Prompt } from "@type/prompt";
import type { StoreSlice } from "./store";

export interface PromptSlice {
	prompts: Prompt[];
	setPrompts: (commandPrompt: Prompt[]) => void;
}

export const createPromptSlice: StoreSlice<PromptSlice> = (set, _get) => ({
	prompts: defaultPrompts,
	setPrompts: (prompts: Prompt[]) => {
		set((prev: PromptSlice) => ({
			...prev,
			prompts: prompts,
		}));
	},
});
