import React from "react";
import Post from "./Post";

const PostList = ({ posts, deletePost, onEdit }) => {
  //   return (
  //     <div>
  //       {posts.map((post) => (
  //         <Post key={post.id} post={post} deletePost={deletePost} />
  //       ))}
  //     </div>
  //   );

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          deletePost={deletePost}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default PostList;
