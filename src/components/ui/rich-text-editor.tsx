'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  Link as LinkIcon,
  ImageIcon,
} from 'lucide-react';
import { CldUploadWidget } from 'next-cloudinary';
import type { CloudinaryUploadWidgetResults } from 'next-cloudinary';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

interface CloudinaryInfo {
  secure_url: string;
  [key: string]: any;
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-brand-primary hover:text-brand-primary-dark underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg my-4',
        },
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class: 'prose prose-neutral max-w-none focus:outline-none min-h-[200px]',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const url = window.prompt('URL:');
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run();
    }
  };

  const handleImageUpload = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info as CloudinaryInfo;
    if (info?.secure_url) {
      editor
        .chain()
        .focus()
        .setImage({ src: info.secure_url, alt: 'Article image' })
        .run();
    }
  };

  return (
    <div className="border border-neutral-200 rounded-md">
      {/* Toolbar */}
      <div className="border-b border-neutral-200 bg-neutral-50 p-2 flex flex-wrap gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-neutral-100 ${
            editor.isActive('bold') ? 'bg-neutral-100' : ''
          }`}
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-neutral-100 ${
            editor.isActive('italic') ? 'bg-neutral-100' : ''
          }`}
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-neutral-100 ${
            editor.isActive('bulletList') ? 'bg-neutral-100' : ''
          }`}
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-neutral-100 ${
            editor.isActive('orderedList') ? 'bg-neutral-100' : ''
          }`}
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-neutral-100 ${
            editor.isActive('blockquote') ? 'bg-neutral-100' : ''
          }`}
          title="Quote"
        >
          <Quote className="h-4 w-4" />
        </button>
        <button
          onClick={addLink}
          className={`p-2 rounded hover:bg-neutral-100 ${
            editor.isActive('link') ? 'bg-neutral-100' : ''
          }`}
          title="Add Link"
        >
          <LinkIcon className="h-4 w-4" />
        </button>

        {/* Image Upload Button */}
        <CldUploadWidget
          uploadPreset="srisandang_uploads"
          onSuccess={handleImageUpload}
          options={{
            maxFiles: 1,
            resourceType: "image",
            clientAllowedFormats: ["png", "jpeg", "jpg"],
            maxFileSize: 5000000,
            folder: "srisandang/articles",
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                open();
              }}
              className="p-2 rounded hover:bg-neutral-100"
              title="Add Image"
            >
              <ImageIcon className="h-4 w-4" />
            </button>
          )}
        </CldUploadWidget>

        <div className="flex-1" />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded hover:bg-neutral-100"
          title="Undo"
        >
          <Undo className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded hover:bg-neutral-100"
          title="Redo"
        >
          <Redo className="h-4 w-4" />
        </button>
      </div>

      {/* Editor Content */}
      <div className="p-4">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
} 