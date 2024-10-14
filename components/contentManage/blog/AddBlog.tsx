"use client"

import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";

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

  return <ReactQuill modules={modules} theme="snow" value={value} onChange={setValue} />;
};

export default AddBlog