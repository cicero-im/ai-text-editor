import { create, type StoreApi } from "zustand";
import { persist } from "zustand/middleware";
import { type CloudAuthSlice, createCloudAuthSlice } from "./cloud-auth-slice";

export type StoreState = CloudAuthSlice;

export type StoreSlice<T> = (
	set: StoreApi<StoreState>["setState"],
	get: StoreApi<StoreState>["getState"],
) => T;

const useCloudAuthStore = create<StoreState>()(
	persist(
		(set, get) => ({
			...createCloudAuthSlice(set, get),
		}),
		{
			name: "cloud",
			partialize: (state) => ({
				cloudSync: state.cloudSync,
				fileId: state.fileId,
			}),
			version: 1,
		},
	),
);

export default useCloudAuthStore;
