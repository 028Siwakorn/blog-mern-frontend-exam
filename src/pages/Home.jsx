import React, { useState, useEffect } from "react";
import Post from "../components/Post";
import PostService from "../services/post.service";
import Swal from "sweetalert2";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const response = await PostService.getAllPosts();
        if (response.status === 200) {
          setPosts(response.data);
        }
      } catch (error) {
        Swal.fire({
          title: "Home",
          text: error?.response?.data?.message || error?.message,
          icon: "error",
        });
      }
    };
    fetchAllPost();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-base-content underline decoration-2 underline-offset-4">
        Latest Posts
      </h1>

      {posts.length === 0 && (
        <h2 className="text-center text-base-content/60 text-xl mt-10">
          No posts available
        </h2>
      )}

      {posts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <Post {...post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
