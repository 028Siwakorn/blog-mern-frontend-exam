import React, { useRef, forwardRef, useImperativeHandle } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const Editor = forwardRef(({ value, onChange }, ref) => {
  const quillRef = useRef(null);

  // Expose methods to parent via ref
  useImperativeHandle(ref, () => ({
    getQuill: () => {
      return quillRef.current?.getEditor();
    },
  }));

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
    />
  );
});

export default Editor;
