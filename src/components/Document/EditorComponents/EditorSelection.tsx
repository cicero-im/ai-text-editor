import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { createDOMRange, createRectsFromDOMRange } from "@lexical/selection";
import useStore from "@store/store";
import type { GridSelection, NodeSelection } from "lexical";

import {
	$getSelection,
	$isRangeSelection,
	type RangeSelection,
	SELECTION_CHANGE_COMMAND,
} from "lexical";
import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
} from "react";

const LowPriority = 1;

const EditorSelection = (_editorRef: any) => {
	const [editor] = useLexicalComposerContext();
	const boxRef = useRef<HTMLDivElement>(null);
	const selectionState = useMemo(
		() => ({
			container: document.createElement("div"),
			elements: [],
		}),
		[],
	);
	if (selectionState.container) {
		// selectionState.container.classList.add("opacity-50");
		// selectionState.container.classList.add("pointer-events-none");
	}
	const selectionRef = useRef<RangeSelection | null>(null);
	const _chats = useStore((state) => state.chats);
	const _currentChatIndex = useStore((state) => state.currentChatIndex);
	const _currentSelection = useStore((state) => state.currentSelection);
	const setCurrentSelection = useStore((state) => state.setCurrentSelection);

	// Scan for selection change events and save the selection in storage

	let selectionRepeat: RangeSelection | GridSelection | NodeSelection | null =
		null;
	editor.registerCommand(
		SELECTION_CHANGE_COMMAND,
		() => {
			const tempSelection = $getSelection();
			if (selectionRepeat !== tempSelection) {
				selectionRepeat = tempSelection;
				if (selectionRepeat?.getTextContent() != null) {
					setCurrentSelection(selectionRepeat?.getTextContent());
				}
			}
			return true;
		},
		LowPriority,
	);

	function _roundToNearest24(num: number) {
		return Math.round(num / 24) * 24;
	}

	// get .editor-input element and log to console when it scrolls, useRef and useEffect, on finished scrolling, run updateLocation

	const _editorInput = document.getElementsByClassName("editor-input");

	const updateLocation = useCallback(() => {
		editor.getEditorState().read(() => {
			var _element = document.getElementsByClassName("editor-input");
			const selection = $getSelection();

			if ($isRangeSelection(selection)) {
				selectionRef.current = selection.clone();
				const anchor = selection.anchor;
				const focus = selection.focus;
				const range = createDOMRange(
					editor,
					anchor.getNode(),
					anchor.offset,
					focus.getNode(),
					focus.offset,
				);
				const boxElem = boxRef.current;
				if (range !== null && boxElem !== null) {
					const { left, bottom, width } = range.getBoundingClientRect();
					const selectionRects = createRectsFromDOMRange(editor, range);

					let correctedLeft =
						selectionRects.length === 1 ? left + width / 2 - 125 : left - 125;
					if (correctedLeft < 10) {
						correctedLeft = 10;
					}
					boxElem.style.left = `${correctedLeft}px`;
					boxElem.style.top = `${bottom + 20}px`;
					const selectionRectsLength = selectionRects.length;
					const { container } = selectionState;
					const elements: Array<HTMLSpanElement> = selectionState.elements;
					const elementsLength = elements.length;

					for (let i = 0; i < selectionRectsLength; i++) {
						const color = "50,150,255";
						const selectionRect = selectionRects[i];
						let elem: HTMLSpanElement = elements[i];
						if (elem === undefined) {
							elem = document.createElement("span");
							elements[i] = elem;
							container.appendChild(elem);
						}
						const style = `mix-blend-mode:color;position:absolute;top:${selectionRect.top}px;left:${selectionRect.left}px;height:${selectionRect.height}px;width:${selectionRect.width}px;background-color:rgba(${color}, 1);pointer-events:none;z-index:5;`;
						elem.style.cssText = style;
					}
					for (let i = elementsLength - 1; i >= selectionRectsLength; i--) {
						const elem = elements[i];
						container.removeChild(elem);
						elements.pop();
					}
				}
			}
		});
	}, [editor, selectionState]);

	const resetLocation = useCallback(() => {
		// remove elements with class selection-box-inner

		editor.getEditorState().read(() => {
			const selection = $getSelection();

			if ($isRangeSelection(selection)) {
				selectionRef.current = selection.clone();
				const anchor = selection.anchor;
				const focus = selection.focus;
				const range = createDOMRange(
					editor,
					anchor.getNode(),
					anchor.offset,
					focus.getNode(),
					focus.offset,
				);
				const boxElem = boxRef.current;
				if (range !== null && boxElem !== null) {
					const { left, bottom, width } = range.getBoundingClientRect();
					const selectionRects = createRectsFromDOMRange(editor, range);
					let correctedLeft =
						selectionRects.length === 1 ? left + width / 2 - 125 : left - 125;
					if (correctedLeft < 10) {
						correctedLeft = 10;
					}
					boxElem.style.left = `-2000px`;
					boxElem.style.top = `-2000px`;
					const selectionRectsLength = selectionRects.length;
					const { container } = selectionState;
					const elements: Array<HTMLSpanElement> = selectionState.elements;
					const elementsLength = elements.length;

					for (let i = 0; i < selectionRectsLength; i++) {
						const _selectionRect = selectionRects[i];
						let elem: HTMLSpanElement = elements[i];
						if (elem === undefined) {
							elem = document.createElement("span");
							elements[i] = elem;
							container.appendChild(elem);
						}
						const color = "0, 0, 0";
						const style = `position:absolute;display:none;top:-2000px;opacity:0;left:-2000px;height:0px;width:0px;background-color:rgba(${color}, 0.3);pointer-events:none;z-index:5;`;
						elem.style.cssText = style;
					}
					for (let i = elementsLength - 1; i >= selectionRectsLength; i--) {
						const elem = elements[i];
						container.removeChild(elem);
						elements.pop();
					}
				}
			}
		});
	}, [editor, selectionState]);

	useEffect(() => {
		if (_editorInput[0] !== undefined) {
			_editorInput[0].addEventListener("scroll", () => {
				resetLocation();
			});
		}

		if (_editorInput[0] !== undefined) {
			_editorInput[0].addEventListener("scrollend", () => {
				updateLocation();
			});
		}
	}, [_editorInput, resetLocation, updateLocation]);

	useLayoutEffect(() => {
		updateLocation();
		const container = selectionState.container;
		const body = document.body;
		if (body !== null) {
			body.appendChild(container);
			return () => {
				body.removeChild(container);
			};
		}
	}, [selectionState.container, updateLocation]);

	useEffect(() => {
		window.addEventListener("resize", updateLocation);
		document
			.getElementsByClassName("editor-input")[0]
			.addEventListener("blur", () => {
				updateLocation();
			});

		document
			.getElementsByClassName("editor-input")[0]
			.addEventListener("focus", () => {
				resetLocation();
			});

		return () => {
			window.removeEventListener("resize", updateLocation);
		};
	}, [updateLocation, resetLocation]);

	useEffect(() => {
		setCurrentSelection("");
		selectionState.elements.forEach((element: HTMLBodyElement) => {
			element.remove();
		});
		selectionState.elements = [];
	}, [selectionState, setCurrentSelection]);

	return (
		<div ref={boxRef} className="selection-box">
			<div className="selection-box-inner" />
		</div>
	);
};

export default EditorSelection;
