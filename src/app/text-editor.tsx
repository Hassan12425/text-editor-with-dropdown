'use client';

import { useEffect, useRef, useState } from "react";

import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { TRANSFORMERS } from "@lexical/markdown";



import AutoLinkPlugin from "@/app/plugins/AutoLinkPlugin";


import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";


import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import ExampleTheme from "@/app/themes/ExampleTheme";
import EditorSidebar from "./components/EditorSidebar";
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";

interface EditorProps {

  initialContent?: string;
  initialBackgroundColor?: string;
  onContentChange?: (newContent: string, newBackgroundColor: string) => void;
}


function Placeholder() {
  return <div className="editor-placeholder">Enter Some Text.......</div>;
}
const EMPTY_CONTENT = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';



export function Editor({ initialContent, initialBackgroundColor, onContentChange }: EditorProps): JSX.Element | null {
  const contentEditableRef = useRef<HTMLDivElement | null>(null);
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState<string>('white');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [content, setContent] = useState<string>(initialContent || '');
  const onChange = (editorState: any) => {
    editorState.read(() => {
      const json = editorState.toJSON();
      const jsonString = JSON.stringify(json);
      setContent(jsonString);


      if (onContentChange) {
        onContentChange(jsonString, selectedBackgroundColor);
      }

      console.log(jsonString);
    });
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleBackgroundChange = (selectedColor: string) => {
    setSelectedBackgroundColor(selectedColor);
  };

  const editorConfig = {
    theme: ExampleTheme,
    namespace: "MyEditor",
    editorState: initialContent || EMPTY_CONTENT,
    onError(error: unknown) {
      throw error;
    },

    // Any custom nodes go here
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode
    ],
  };

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-wrapper">
        <span className="toolbar">
          <ToolbarPlugin openSidebar={openSidebar} />
        </span>
        <div className="editor-container" ref={contentEditableRef}>
          <div className="editor-inner " style={{ backgroundColor: selectedBackgroundColor }}>
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input " />}
              placeholder={<Placeholder />}
              ErrorBoundary={LexicalErrorBoundary}
            />

            <OnChangePlugin onChange={onChange} />
            <ListPlugin />
            
            <HistoryPlugin />
            <AutoFocusPlugin />
            <CodeHighlightPlugin />
            <LinkPlugin />
            <TabIndentationPlugin />
            <AutoLinkPlugin />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />

          </div>
        </div>
      </div>
      {isSidebarOpen ? (
        <EditorSidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          onBackgroundChange={handleBackgroundChange}
          title="Editor Section"
          ctitle="Color"
        />
      ) : (
        <></>
      )}


    </LexicalComposer>
  );
}
