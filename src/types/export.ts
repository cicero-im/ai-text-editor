import type {
	ConfigInterface,
	DocumentInterface,
	FolderCollection,
	Role,
} from "./document";
import type { Prompt } from "./prompt";

export interface ExportBase {
	version: number;
}

export interface ExportV1 extends ExportBase {
	chats?: DocumentInterface[];
	folders: FolderCollection;
	prompts?: Prompt[];
	config?: ConfigInterface;
}

export type OpenAIChat = {
	title: string;
	mapping: {
		[key: string]: {
			id: string;
			message?: {
				author: {
					role: Role;
				};
				content: {
					parts?: string[];
				};
			} | null;
			parent: string | null;
			children: string[];
		};
	};
	current_node: string;
};

export default ExportV1;
