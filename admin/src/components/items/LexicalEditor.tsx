import React from 'react'
import { $getRoot, $getSelection } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

const theme = {
    // Masukkan class CSS Anda di sini untuk styling
    paragraph: 'editor-paragraph',
    text: {
        bold: 'editor-text-bold',
        italic: 'editor-text-italic',
    },
};

function onError(error) {
    console.error(error);
}

const LexicalEditor = () => {
    const initialConfig = {
        namespace: 'MyEditor',
        theme,
        onError,
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div className="editor-container">
                <PlainTextPlugin
                    contentEditable={<ContentEditable className="editor-input" />}
                    placeholder={<div className="editor-placeholder">Mulai mengetik...</div>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                {/* Plugin tambahan */}
                <HistoryPlugin />
            </div>
        </LexicalComposer>
    );
}

export default LexicalEditor
