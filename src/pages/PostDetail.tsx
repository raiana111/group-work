import { useEffect, useState } from 'react';
import { Container, Typography, Button, CircularProgress } from '@mui/material';
import axiosApi from '../AxiosApi';
import { useNavigate, useParams } from 'react-router-dom';
import { IPost } from '../types';

export const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<IPost | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    axiosApi.get<IPost>(`/posts/${id}/`)
      .then(res => setPost(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!token) {
      alert('You are not authorized!');
      return;
    }

    try {
      await axiosApi.delete(`/posts/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/posts');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  if (loading) return <CircularProgress />;
  if (!post) return <Typography>Post not found</Typography>;

  return (
    <Container>
      <Typography variant="h4">{post.title}</Typography>
      <Typography variant="subtitle1">Category: {post.category}</Typography>
      <Typography variant="subtitle2">Author: {post.author}</Typography>
      <Typography variant="body1">{post.content}</Typography>
      {post.extra_info && <Typography color="textSecondary">Extra info: {post.extra_info}</Typography>}

      <Button variant="contained" sx={{ mt: 2, mr: 2 }} onClick={() => navigate(`/edit-post/${post.id}`)}>
        Edit
      </Button>

      {token && (
        <Button color="error" variant="contained" onClick={handleDelete}>
          Delete
        </Button>
      )}
    </Container>
  );
};

