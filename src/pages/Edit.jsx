import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";
import PostService from "../services/post.service";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);

  const [post, setPost] = useState({
    title: "",
    summary: "",
    content: "",
    cover: "",
  });

  const [coverPreview, setCoverPreview] = useState("");
  const [coverFile, setCoverFile] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getById(id);
        console.log(response);
        if (response.status === 200) {
          setPost(response.data);
          setCoverPreview(response.data.cover);
          if (response.data.author._id !== userInfo?.id) {
            Swal.fire(
              "Error",
              "You are not allowed to edit this post",
              "error"
            );
            navigate("/");
            return;
          }
        }
      } catch (error) {
        Swal.fire(
          "Error",
          error?.response?.data?.message || error.message,
          "error"
        );
      }
    };

    fetchPost();
  }, [id, userInfo, navigate]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverFile(file);
      setPost((prev) => ({ ...prev, cover: file.name }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!post.title || !post.content) {
      Swal.fire("Error", "Title and content are required", "error");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("summary", post.summary);
      formData.append("content", post.content);

      if (coverFile) {
        formData.append("cover", coverFile);
      }

      const response = await PostService.updatePost(id, formData);
      if (response.status === 200) {
        Swal.fire("Success", "Post updated successfully", "success").then(
          () => {
            navigate(`/post/${id}`);
          }
        );
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error?.response?.data?.message || error.message,
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-20">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Post</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={post.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">Summary</label>
            <textarea
              name="summary"
              value={post.summary}
              onChange={handleChange}
              rows="8"
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">Content</label>
            <textarea
              name="content"
              value={post.content}
              onChange={handleChange}
              rows="8"
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">Cover Image</label>

            {coverPreview && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Current/Preview:</p>
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="w-full max-w-md h-48 object-cover rounded border"
                />
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleCoverUpload}
              className="w-full px-4 py-2 border rounded"
            />
            <p className="text-sm text-gray-500 mt-2">
              Upload a new image to replace the cover
            </p>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
