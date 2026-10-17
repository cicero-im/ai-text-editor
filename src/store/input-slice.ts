import type { Role } from "@type/document";
import type { StoreSlice } from "./store";

export interface InputSlice {
	inputRole: Role;
	setInputRole: (inputRole: Role) => void;
}

export const createInputSlice: StoreSlice<InputSlice> = (set, _get) => ({
	inputRole: "user",
	setInputRole: (inputRole: Role) => {
		set((prev: InputSlice) => ({
			...prev,
			inputRole: inputRole,
		}));
	},
});
