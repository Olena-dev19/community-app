import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { addPostAsync } from "../../features/posts/postsSlice";
import type { RootState } from "../../app/store";
import styles from "./AddPost.module.css";

interface Props {
  onClose: () => void;
}

const AddPost = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();
  const { name } = useSelector((state: RootState) => state.user);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;

    dispatch(
      addPostAsync({
        title,
        content,
        userName: name || "Anonymous",
      }),
    );

    setTitle("");
    setContent("");
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✖
        </button>

        <h2>Create post</h2>

        <input
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title..."
        />

        <textarea
          className={styles.textarea}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
        />

        <button className={styles.button} onClick={handleSubmit}>
          Post
        </button>
      </div>
    </div>
  );
};

export default AddPost;
