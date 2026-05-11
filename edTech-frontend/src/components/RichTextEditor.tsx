import { useEffect } from "react";

import {
    useEditor,
    EditorContent
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

import Underline from "@tiptap/extension-underline";

import Color from "@tiptap/extension-color";

import { TextStyle } from "@tiptap/extension-text-style";

import Image from "@tiptap/extension-image";

import { Table } from "@tiptap/extension-table";

import { TableRow } from "@tiptap/extension-table-row";

import { TableCell } from "@tiptap/extension-table-cell";

import { TableHeader } from "@tiptap/extension-table-header";

type Props = {
    value: string;
    onChange: (value: string) => void;
};

const RichTextEditor = ({
    value,
    onChange
}: Props) => {

    const editor = useEditor({

        extensions: [

            StarterKit,

            Underline,

            TextStyle,

            Color,

            Image,

            Table.configure({
                resizable: true
            }),

            TableRow,

            TableHeader,

            TableCell
        ],

        content: value,

        onUpdate: ({ editor }) => {

            onChange(editor.getHTML());
        }
    });

    useEffect(() => {

        if (
            editor &&
            value !== editor.getHTML()
        ) {

            editor.commands.setContent(value);
        }

    }, [value, editor]);

    const addImage = () => {

        const url = window.prompt(
            "Enter image URL"
        );

        if (url) {

            editor?.chain()
                .focus()
                .setImage({ src: url })
                .run();
        }
    };

    return (

        <div className="border rounded p-3 bg-white">

            <div className="mb-3 d-flex flex-wrap gap-2">

                <button
                    type="button"
                    className="btn btn-dark btn-sm"
                    onClick={() =>
                        editor?.chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                >
                    Bold
                </button>

                <button
                    type="button"
                    className="btn btn-dark btn-sm"
                    onClick={() =>
                        editor?.chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                >
                    Italic
                </button>

                <button
                    type="button"
                    className="btn btn-dark btn-sm"
                    onClick={() =>
                        editor?.chain()
                            .focus()
                            .toggleUnderline()
                            .run()
                    }
                >
                    Underline
                </button>

                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                        editor?.chain()
                            .focus()
                            .toggleHeading({ level: 1 })
                            .run()
                    }
                >
                    H1
                </button>

                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() =>
                        editor?.chain()
                            .focus()
                            .toggleHeading({ level: 2 })
                            .run()
                    }
                >
                    H2
                </button>

                <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    onClick={() =>
                        editor?.chain()
                            .focus()
                            .toggleCodeBlock()
                            .run()
                    }
                >
                    Code
                </button>

                <button
                    type="button"
                    className="btn btn-success btn-sm"
                    onClick={addImage}
                >
                    Image
                </button>

                <button
                    type="button"
                    className="btn btn-warning btn-sm"
                    onClick={() =>
                        editor?.chain()
                            .focus()
                            .insertTable({
                                rows: 3,
                                cols: 3,
                                withHeaderRow: true
                            })
                            .run()
                    }
                >
                    Table
                </button>

                <input
                    type="color"
                    onChange={(e) =>
                        editor?.chain()
                            .focus()
                            .setColor(e.target.value)
                            .run()
                    }
                />

            </div>

            <EditorContent editor={editor} />

        </div>
    );
};

export default RichTextEditor;