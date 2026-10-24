import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import useStore from "@store/store";
import { CLEAR_HISTORY_COMMAND } from "lexical";
import { useEffect } from "react";

const EditorRefresh = () => {
	const [editor] = useLexicalComposerContext();
	const chats = useStore((state) => state.chats);
	const currentChatIndex = useStore((state) => state.currentChatIndex);
	const _editorRefresh = useStore((state) => state.forceEditorRefresh);

	useEffect(() => {
		// Focus the editor when the effect fires!
		if (chats) {
			if (chats[currentChatIndex].editorState !== undefined) {
				const editorStateJSON = editor.parseEditorState(
					chats[currentChatIndex].editorState,
				);
				editor.setEditorState(editorStateJSON);
				editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
			}
		}
	}, [
		currentChatIndex,
		chats,
		editor.dispatchCommand,
		editor.parseEditorState,
		editor.setEditorState,
	]);
	return null;
};

export default EditorRefresh;
