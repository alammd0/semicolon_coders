"use client";

import { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import ImageTool from "@editorjs/image";

export default function CreateBlogPage() {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {

    if (!editorRef.current) {
        editorRef.current = new EditorJS({
            holder: "editorjs",
            autofocus: true,
            placeholder: "Start writing your blog...",
            tools: {
                header: Header,
                paragraph: Paragraph,
                list: List,
                code: Code,
                quote: Quote,
                table: Table,
                image: ImageTool
            },
        });
    }

    return () => {
        editorRef.current?.destroy();
        editorRef.current = null;
    };

  }, []);

  const handleSave = async () => {
    try {

        if(!editorRef.current){
            return;
        }
        const data = editorRef.current.save();

        console.log(data);
    }
    catch(error){
        console.log(error);
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Create Blog</h1>
        <div id="editorjs" className="border rounded-md p-4 bg-white" />
        <button
            onClick={handleSave}
            className="mt-6 bg-black text-white px-6 py-2 rounded"
        >
            Save Blog
        </button>
    </div>
  );
}
