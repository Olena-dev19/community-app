import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addCommentAsync } from "../../features/comments/commentsSlice";
import styles from "./AddCommentForm.module.css";
import { fetchCommentsByPost } from "../../features/comments/commentsSlice";

interface Props {
  postId: string;
  parentComment?: string;
}

const AddCommentForm = ({ postId, parentComment }: Props) => {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    if (!text.trim()) return;

    dispatch(addCommentAsync({ postId, text, parentComment }));

    dispatch(fetchCommentsByPost(postId));
    setText("");
  };
  return (
    <div className={styles.addComment}>
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <button onClick={handleSubmit}>
        <svg
          xmlns="http://www.w3.org"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      </button>
    </div>
  );
};

export default AddCommentForm;
