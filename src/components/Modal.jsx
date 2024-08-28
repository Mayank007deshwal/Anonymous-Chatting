import "../style/Modal.css";
import React, { useState, useEffect, useRef } from "react";

// const Modal = ({ isOpen, onClose, onSubmit }) => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const titleInputRef = useRef(null);

//   useEffect(() => {
//     if (isOpen && titleInputRef.current) {
//       titleInputRef.current.focus();
//     }
//   }, [isOpen]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ title, description });
//     setTitle("");
//     setDescription("");
//     onClose();
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-wrapper" onClick={onClose}>
//       <div className="modal-container" onClick={(e) => e.stopPropagation()}>
//         <h2>Add New Post</h2>
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Title</label>
//             <input
//               type="text"
//               ref={titleInputRef}
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label>Description</label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit">Add Post</button>
//           <button type="button" onClick={onClose}>
//             Cancel
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Modal;

const Modal = ({ isOpen, onClose, onSubmit, currentPost }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.title);
      setDescription(currentPost.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [currentPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("image", image);
    onSubmit({ title, description, image });
    setTitle("");
    setDescription("");
    setImage(null);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-wrapper" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2>{currentPost ? "Edit Post" : "Add New Post"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              ref={titleInputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* <div className="form-group">
            <label htmlFor="image">Image:</label>
            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div> */}

          <div className="form-group">
            <label htmlFor="media">Media:</label>
            <input
              id="image"
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="modal-buttons">
            <button type="submit" className="submit-btn">
              {currentPost ? "Update Post" : "Add Post"}
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
