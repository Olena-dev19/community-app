import { deleteCommentAsync } from "../../features/comments/commentsSlice";
import type { Comment } from "../../types/comment";
import styles from "./CommentsItem.module.css";
import { useAppDispatch } from "../../app/hooks";
import { useState } from "react";
import { addCommentAsync } from "../../features/comments/commentsSlice";

interface Props {
  comment: Comment;
}

const CommentItem = ({ comment }: Props) => {
  const dispatch = useAppDispatch();
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleDelete = () => {
    dispatch(
      deleteCommentAsync({
        postId: comment.postId,
        commentId: comment._id,
      }),
    );
  };
  const handleReply = () => {
    if (!replyText.trim()) return;

    dispatch(
      addCommentAsync({
        postId: comment.postId,
        text: replyText,
        parentComment: comment._id,
      }),
    );
    setReplyText("");
    setShowReplyInput(false);
  };
  return (
    <div className={styles.comment}>
      <div className={styles.commentWrapper}>
        <div>
          <p>{comment.text}</p>
          <span className={styles.commentDate}>
            By {comment.userName} on{" "}
            {new Date(comment.createdAt).toLocaleString()}
          </span>
        </div>
        <button
          className={styles.replyBtn}
          onClick={() => setShowReplyInput((prev) => !prev)}
        >
          Reply
        </button>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          <svg
            xmlns="http://www.w3.org"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
      {showReplyInput && (
        <div className={styles.replyBox}>
          <input
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
          />
          <button onClick={handleReply}>Send</button>
        </div>
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div className={styles.replies}>
          {comment.replies.map((reply) => (
            <CommentItem key={reply._id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentItem;
