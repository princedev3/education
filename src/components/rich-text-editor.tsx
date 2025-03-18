"use client";
import Highlight from "@tiptap/extension-highlight";
import { useEditor, EditorContent } from "@tiptap/react";
import TextAlign from "@tiptap/extension-text-align";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menu-bar";
import { useEffect, useState } from "react";
interface textEditorProp {
  content: string;
  handleDesc: (conttent: string) => void;
}
const RichTextEditor = ({ content, handleDesc }: textEditorProp) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-2",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-2",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: {
          class: "my-custom-class",
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: "border outline-none rounded-lg min-h-[120px] p-3 ",
      },
    },
    onUpdate: ({ editor }) => {
      handleDesc(editor.getHTML());
    },
  });

  if (!isMounted || !editor) {
    return null;
  }

  return (
    <div className="">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
export default RichTextEditor;
