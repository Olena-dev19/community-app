import styles from "./PostItem.module.css";
import { useState } from "react";
import CommentsList from "../Comments/CommentsList";

interface PostItemProps {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  userName: string;
}

const PostItem: React.FC<PostItemProps> = ({
  _id,
  title,
  content,
  createdAt,
  userName,
}) => {
  const [showComments, setShowComments] = useState(false);
  const handleCommentClick = () => {
    setShowComments(!showComments);
  };

  return (
    <li className={styles.postItem}>
      <div className={styles.postTitle}>{title}</div>
      <div className={styles.postContent}>{content}</div>
      <div className={styles.postMeta}>
        By {userName} on {new Date(createdAt).toLocaleString()}
      </div>

      <div className={styles.actions}>
        <button className={styles.commentButton} onClick={handleCommentClick}>
          💬
        </button>
      </div>
      {showComments && <CommentsList postId={_id} />}
    </li>
  );
};

export default PostItem;
