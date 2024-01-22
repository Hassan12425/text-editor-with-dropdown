'use client';

import { useEffect, useRef, useState } from "react";

import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { TRANSFORMERS } from "@lexical/markdown";

import TreeViewPlugin from "@/app/plugins/TreeViewPlugin";
import ToolbarPlugin from "@/app/plugins/ToolbarPlugin";
import AutoLinkPlugin from "@/app/plugins/AutoLinkPlugin";
import CodeHighlightPlugin from "@/app/plugins/CodeHighlightPlugin";


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
function Placeholder() {
    return <div className="editor-placeholder"></div>;
}
const editorConfig = {
    theme: ExampleTheme,
    namespace: "daily-standup-editor",
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
interface EditorProps {
  text?: string;
//   setText: (newText: string) => void; 
setInputText: React.Dispatch<React.SetStateAction<string>>;


}

export function Editor({text,setInputText}:EditorProps): JSX.Element | null {
    const contentEditableRef = useRef<HTMLDivElement | null>(null);
    const [selectedBackgroundColor, setSelectedBackgroundColor] = useState<string>('transparent');



    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = () => {
      setIsSidebarOpen(true);
    };
    
  const handleBackgroundChange = (selectedColor: string) => {
   
    setSelectedBackgroundColor(selectedColor);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

    return (
        <LexicalComposer initialConfig={editorConfig}>
 <div className="editor-wrapper">

 <div className="toolbar">
    {/* <ToolbarPlugin openSidebar={openSidebar} /> */}
            <ToolbarPlugin openSidebar={openSidebar} />

  </div>
            <div className="editor-container"  ref={contentEditableRef}>
   
          {/* <EditorSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        onBackgroundChange={handleBackgroundChange} 
        title='Editor Section'
        ctitle="Color"

        /> */}
                <div className="editor-inner " style={{ backgroundColor: selectedBackgroundColor }}>
                    <RichTextPlugin 
                    contentEditable={<ContentEditable className="editor-input " value={text}   />}
                        placeholder={<Placeholder />}
                        ErrorBoundary={LexicalErrorBoundary}
                    />
                  {/* <textarea  className="editor-input2"  value={text} onChange={handleInputChange} onClick={handleInputClick}  /> */}
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
           
        </LexicalComposer>
    );
}
