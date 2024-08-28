// import "../style/Modal.css";

import React, { useState, useEffect } from "react";
import PostList from "../components/PostList";
import Modal from "../components/Modal"; // Import the Modal component
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [page, setPage] = useState(1);

  const fetchPosts = async (pageNumber) => {
    setLoading(true);
    console.log("env:", import.meta.env);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/posts?page=${pageNumber}`
      );
      const data = await response.json();
      console.log(data);
      // setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      setPosts((prevPosts) => {
        const newPosts = data.posts.filter(
          (post) => !prevPosts.some((prevPost) => prevPost.id === post.id)
        );
        return [...prevPosts, ...newPosts];
      });

      setHasMore(data.has_more);
    } catch (error) {
      console.log("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const handleAddOrUpdatePost = async (post) => {
    const formData = new FormData();
    formData.append("post[title]", post.title);
    formData.append("post[description]", post.description);
    if (post.image) formData.append("post[image]", post.image);

    if (currentPost) {
      // Update existing post
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER_URL}/posts/${currentPost.id}`,
          {
            method: "PUT",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedPost = await response.json();
        setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)));
      } catch (error) {
        console.error("Error updating post:", error);
      }
    } else {
      // Add new post

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER_URL}/posts`,
          {
            method: "POST",
            // headers: {
            //   "Content-Type": "application/json",
            // },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const savedPost = await response.json();
        setPosts([savedPost, ...posts]);
      } catch (error) {
        console.error("Error adding post:", error);
      }
    }

    setCurrentPost(null);
    setIsModalOpen(false);
  };

  const handleEditPost = (post) => {
    setCurrentPost(post);
    setIsModalOpen(true);
  };

  const deletePost = async (postId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER_URL}/posts/${postId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedPosts = posts.filter((post) => post.id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.log("Error adding post:", error);
    }
  };

  const handleScroll = () => {
    if (loading) return;

    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const offsetHeight = document.documentElement.offsetHeight;

    if (windowHeight + scrollTop >= offsetHeight - 5 && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div>
      <button
        className="btn btn-primary mt-2 fix-button"
        onClick={() => setIsModalOpen(true)}
      >
        Add New Post
      </button>
      <PostList posts={posts} deletePost={deletePost} onEdit={handleEditPost} />
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentPost(null);
        }}
        onSubmit={handleAddOrUpdatePost}
        currentPost={currentPost} // Pass the current post being edited
      />
    </div>
  );
};

export default Home;
