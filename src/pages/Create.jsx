import React, { useState, useRef } from "react";
import PostService from "../services/post.service.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import Editor from "../components/Editor.jsx";

const Create = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  const [post, setPost] = useState({
    title: "",
    author: "",
    summary: "",
    content: "",
    cover: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setPost({
        ...post,
        [name]: e.target.files[0],
      });
    } else {
      setPost({
        ...post,
        [name]: value,
      });
    }
  };

  const handleContentChange = (value) => {
    setContent(value);
    setPost({ ...post, content: value });
  };

  const resetForm = () => {
    setPost({
      title: "",
      author: "",
      summary: "",
      content: "",
      cover: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.set("title", post.title);
      data.set("summary", post.summary);
      data.set("content", post.content);
      // backend expects field name 'cover' (multer .single('cover'))
      if (post.cover) data.set("cover", post.cover);

      const res = await PostService.createPost(data);

      if (res.status === 201 || res.status === 200) {
        await Swal.fire({
          title: "Add new post",
          text: "Post created successfully!",
          icon: "success",
        });
        resetForm();
        navigate("/");
      }
    } catch (error) {
      await Swal.fire({
        title: "Add new post",
        text: error.response?.data?.message || "Request failed",
        icon: "error",
      });
      console.error("Create post error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-base-200">
      <div className="w-full max-w-6xl">
        <div className="card bg-base-100 shadow-xl rounded-lg">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center mb-8">Create Post</h1>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* LEFT: COVER */}
              <div className="md:col-span-1">
                <label className="label">
                  <span className="label-text font-semibold">Cover Image</span>
                </label>

                <input
                  type="file"
                  name="cover"
                  accept="image/*"
                  onChange={handleChange}
                  className="file-input file-input-bordered w-full"
                />

                <div className="mt-4">
                  <img
                    src={
                      post.cover
                        ? URL.createObjectURL(post.cover)
                        : "https://vaultproducts.ca/cdn/shop/products/4454FC90-DAF5-43EF-8ACA-A1FF04CE802D.jpg?v=1656626547"
                    }
                    alt="cover preview"
                    className="object-contain h-56 w-full rounded-lg border"
                  />
                </div>
              </div>

              {/* RIGHT: FORM FIELDS */}
              <div className="md:col-span-2 grid grid-cols-1 gap-4">
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Title</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    placeholder="Post title"
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Summary</span>
                  </label>
                  <textarea
                    name="summary"
                    value={post.summary}
                    onChange={handleChange}
                    placeholder="Short summary..."
                    className="textarea textarea-bordered w-full"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Content</span>
                  </label>
                  <div className="h-64">
                    <Editor
                      value={content}
                      onChange={handleContentChange}
                      ref={editorRef}
                    />
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="md:col-span-3 flex justify-center gap-4 mt-6">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={resetForm}
                >
                  Reset
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Post
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
