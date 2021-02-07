import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/global/store/store';
import { getPosts } from 'src/project_a/features/posts/postsSlice';

// redux example
const ExampleTodoPage = () => {
  const dispatch = useDispatch();
  const { posts, isLoading, error } = useSelector(
    (state: RootState) => state.projectA.posts,
  );

  // redux CSR
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  if (posts.length === 0 || error || isLoading) return null;

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <p>{post.title}</p>
        </li>
      ))}
    </ul>
  );
};

export default ExampleTodoPage;
