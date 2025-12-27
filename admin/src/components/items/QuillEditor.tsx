import React from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Box, Typography, styled, Theme } from '@mui/material';

// Definisikan Interface untuk Props
type QuillEditorProps = {
    label?: string;
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
    error?: boolean;
    helperText?: string;
}

// Styling custom dengan TypeScript
const Root = styled(Box)(({ theme }: { theme: Theme }) => ({
    '& .ql-container': {
        borderBottomLeftRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius,
        fontFamily: theme.typography.fontFamily,
        fontSize: '1rem',
        borderColor: theme.palette.divider,
    },
    '& .ql-toolbar': {
        borderTopLeftRadius: theme.shape.borderRadius,
        borderTopRightRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
        borderColor: theme.palette.divider,
        position: 'relative',
        zIndex: 1,
    },
    '& .ql-editor': {
        minHeight: '200px',
        '&.ql-blank::before': {
            color: theme.palette.text.disabled,
            fontStyle: 'normal',
        },
    },
    // Efek saat error (opsional)
    '& .ql-container.error': {
        borderColor: theme.palette.error.main,
    },

}));

const QuillEditor = ({
    label,
    value,
    onChange,
    placeholder,
    error,
    helperText
}: QuillEditorProps) => {
    return (
        <Box sx={{ mb: 3 }}>
            {label && (
                <Typography
                    component="div"
                    className="inputText"
                    variant="body2"
                    sx={{ mb: 1, fontWeight: 500, color: error ? 'error.main' : 'text.primary' }}
                >
                    <span className='inputText'>{label}</span>
                </Typography>
            )}

            <Root sx={{ borderColor: error ? 'error.main' : 'divider' }}>
                <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder || "Tulis sesuatu..."}
                />
            </Root>

            {helperText && (
                <Typography variant="caption" color={error ? 'error' : 'textSecondary'} sx={{ mt: 0.5, ml: 1.5 }}>
                    {helperText}
                </Typography>
            )}
        </Box>
    );
};

export default QuillEditor;