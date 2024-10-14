"use client";

import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const AddBlog = () => {
  const [value, setValue] = useState("");

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <div>
      <ReactQuill
        modules={modules}
        theme="snow"
        value={value}
        onChange={setValue}
      />

      {/* <h2>Your Blog Preview:</h2>
      <div
        style={{ padding: "10px", border: "1px solid #ddd", marginTop: "20px" }}
        dangerouslySetInnerHTML={{ __html: value }} 
      /> */}
    </div>
  );
};

export default AddBlog;
