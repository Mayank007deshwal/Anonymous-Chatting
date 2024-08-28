import "../style/Post.css";
import { useNavigate } from "react-router-dom";
const Post = ({ post, deletePost, onEdit }) => {
  const placeholderImage = "https://via.placeholder.com/300";
  const navigate = useNavigate(); // Get the navigate function

  const handleViewClick = () => {
    // Navigate to the PostRoom component with the post ID
    navigate(`/posts/${post.id}`);
  };
  // console.log(post);
  return (
    <div
      className="card mb-4 shadow-sm"
      style={{ width: "18rem", margin: "0 auto" }}
    >
      {/* <img
        src={post.image_url || placeholderImage}
        className="card-img-top"
        alt="Post Thumbnail"
        style={{
          width: "100%",
          height: "250px", // Set a fixed height for uniformity
          objectFit: "cover", // Ensures the image covers the area while maintaining aspect ratio
        }}
      /> */}

      {post.image_type && post.image_type.startsWith("video/") ? (
        <video
          className="card-img-top"
          style={{
            width: "100%",
            height: "250px",
            objectFit: "cover",
          }}
          controls
        >
          <source src={post.image_url} type={post.image_type} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          src={post.image_url || placeholderImage}
          className="card-img-top"
          alt="Post Thumbnail"
          style={{
            width: "100%",
            height: "250px",
            objectFit: "cover",
          }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title truncate">{post.title}</h5>
        <p className="card-text truncate">{post.description}</p>
        <div className="d-flex justify-content-between">
          <button className="btn btn-primary btn-sm" onClick={handleViewClick}>
            View
          </button>
          <div>
            <button
              className="btn btn-danger btn-sm me-2"
              onClick={() => deletePost(post.id)}
            >
              Delete
            </button>
            <button
              className="btn btn-warning btn-sm"
              onClick={() => onEdit(post)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
