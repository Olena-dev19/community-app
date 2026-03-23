import styles from "./CommentsList.module.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { useEffect } from "react";
import { fetchCommentsByPost } from "../../features/comments/commentsSlice";
import CommentItem from "./CommentItem";
import AddCommentForm from "./AddCommentForm";
import { useAppDispatch } from "../../app/hooks";

interface Props {
  postId: string;
}

const CommentsList = ({ postId }: Props) => {
  const dispatch = useAppDispatch();
  const comments = useSelector(
    (state: RootState) => state.comments.comments[postId],
  );

  const loading = useSelector((state: RootState) => state.comments.loading);

  useEffect(() => {
    dispatch(fetchCommentsByPost(postId));
  }, [dispatch, postId]);

  if (loading) {
    return <div>Loading comments...</div>;
  }
  return (
    <div className={styles.commentsSection}>
      {!comments || comments.length === 0 ? (
        <div>No comments yet. Be the first to comment!</div>
      ) : (
        comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))
      )}
      <AddCommentForm postId={postId} />
    </div>
  );
};

export default CommentsList;
