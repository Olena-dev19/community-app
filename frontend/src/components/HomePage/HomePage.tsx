import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchPosts } from "../../features/posts/postsSlice";
import type { RootState } from "../../app/store";
import styles from "./HomePage.module.css";
import PostItem from "../PostItem/PostItem";
import { useAppDispatch } from "../../app/hooks";
import AddPost from "../AddPost/AddPost";
import { useState } from "react";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useSelector(
    (state: RootState) => state.posts,
  );
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <div className={styles.container}>Loading...</div>;
  if (error) return <div className={styles.container}>Error: {error}</div>;

  const handleClick = () => {
    setIsModal(true);
  };
  return (
    <div className={styles.container}>
      <div className={styles.btnWrapper}>
        <button className={styles.createBtn} onClick={handleClick}>
          Create Post
        </button>
      </div>
      <ul className={styles.postList}>
        {posts.map((post) => (
          <PostItem
            key={post._id}
            _id={post._id}
            title={post.title}
            content={post.content}
            createdAt={post.createdAt}
            userName={post.userName}
          />
        ))}
      </ul>
      {isModal && <AddPost onClose={() => setIsModal(false)} />}
    </div>
  );
};

export default HomePage;
