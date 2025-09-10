import Mention from "@tiptap/extension-mention";
import { TextSelection } from "@tiptap/pm/state";
import { Extension } from "@tiptap/react";

export const SmartBraces = Extension.create({
  name: "smartBraces",

  addKeyboardShortcuts() {
    const braces = {
      "(": ")",
      "[": "]",
      "{": "}",
      '"': '"',
      "'": "'",
      "`": "`",
    } as const;

    const shortcuts: Record<string, () => boolean> = {};

    (Object.keys(braces) as Array<keyof typeof braces>).forEach((open) => {
      shortcuts[open] = () => {
        const { state, dispatch } = this.editor.view;
        const { selection } = state;
        const close = braces[open];

        if (selection.empty) {
          const tr = state.tr.insertText(open + close, selection.from);
          const newPos = selection.from + 1;
          tr.setSelection(TextSelection.create(tr.doc, newPos));
          dispatch(tr);
        } else {
          const tr = state.tr
            .insertText(close, selection.to)
            .insertText(open, selection.from);
          dispatch(tr);
        }
        return true;
      };
    });

    shortcuts.Backspace = () => {
      const { state, dispatch } = this.editor.view;
      const { selection } = state;

      if (selection.empty) {
        const pos = selection.from;
        const before = state.doc.textBetween(pos - 1, pos);
        const after = state.doc.textBetween(pos, pos + 1);

        if (
          before in braces &&
          braces[before as keyof typeof braces] === after
        ) {
          const tr = state.tr.delete(pos - 1, pos + 1);
          dispatch(tr);
          return true;
        }
      }
      return false;
    };

    return shortcuts;
  },
});

export const MentionConcept = Mention.configure({
  HTMLAttributes: {
    class: "px-1 py-0.5 rounded bg-muted text-primary",
  },
});
