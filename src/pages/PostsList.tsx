import { useEffect, useState } from 'react';
import axiosApi from '../AxiosApi';
import { IPost } from '../types';
import { Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

export const PostsList = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosApi.get<IPost[]>('/posts/')
      .then(res => setPosts(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>All Posts</Typography>
      <List>
        {posts.map(post => (
          <ListItem key={post.id} component={Link} to={`/posts/${post.id}`}>
            <ListItemText
              primary={post.title}
              secondary={`Category: ${post.category} | Author: ${post.author}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};