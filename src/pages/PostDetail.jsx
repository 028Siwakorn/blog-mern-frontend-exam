import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import PostService from "../services/post.service";

const PostDetail = () => {
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [post, setPost] = useState({
    id: "",
    tile: "",
    createdAt: "",
    author: {},
    content: "",
  });
  useEffect(() => {
    const fectchPost = async () => {
      try {
        const response = await PostService.getById(id);
        if (response.status === 200) {
          setPost(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Post Detail",
          icon: "error",
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    fectchPost();
  }, [id]);

  const handleDelete = async () => {
    const isSubmitted = window.confirm("Please Confirm To Delete Your Book!");
    if (!isSubmitted) return;
    try {
      const response = await PostService.deletePost(post._id);
      if (response.status === 200) {
        alert("Post deleted successfully!");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="post-page min-h-full min-w-full items-center justify-center p-4 pt-20">
      <div className="bg-white p-8 rounded-b-lg shadow-lg max-4xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-grey-800">{post?.title}</h1>
        <div className="text-grey-600 mb-4 text-center">
          <time className="block mb-2">{post?.createdAt}</time>
          <div className="author mb-2">
            By{" "}
            <span className="text-blue-500">
              <a href={`/author/${post?.author?._id}`}>
                @{post?.author?.username}
              </a>
            </span>
          </div>
          {userInfo?.id === post?.author?._id && (
            <div className="edit-row mb-4 text-center flex items-center justify-center gap-2">
              <a className="btn btn-warning" href={`/edit/${post?._id}`}>
                Edit
              </a>
              <a className="btn btn-error" onClick={handleDelete}>
                Delete
              </a>
            </div>
          )}
        </div>
        <div
          className="content text-grey-700 prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: post?.content }}
        />
      </div>
    </div>
  );
};

export default PostDetail;
