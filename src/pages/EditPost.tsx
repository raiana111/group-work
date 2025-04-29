import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from '../AxiosApi';
import { IPost, ICategory } from '../types';
import { Container, TextField, Button, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export const EditPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<IPost | null>(null);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await axiosApi.get<IPost>(`/posts/${id}/`);
        setPost(postResponse.data);

        const categoriesResponse = await axiosApi.get<ICategory[]>('/categories/');
        setCategories(categoriesResponse.data);
      } catch (error) {
        setError('Failed to load data.');
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!post) return;

    setLoading(true);
    setError('');

    try {
      await axiosApi.patch(`/posts/${id}/`, {
        title: post.title,
        content: post.content,
        category_id: post.category_id,
        author: post.author,
        extra_info: post.extra_info || null,
      });
      navigate('/posts');
    } catch (error) {
      setError('Failed to edit post.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: unknown } }
  ) => {
    if (!post) return;
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  if (!post) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Edit Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Content"
            name="content"
            value={post.content}
            onChange={handleChange}
            required
            margin="normal"
            multiline
            rows={4}
          />
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Category</InputLabel>
            <Select
              name="category_id"
              value={post.category_id || ''}
              onChange={handleChange}
              label="Category"
            >
              <MenuItem value="" disabled>
                Select a category
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Author"
            name="author"
            value={post.author}
            onChange={handleChange}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Extra Info"
            name="extra_info"
            value={post.extra_info || ''}
            onChange={handleChange}
            margin="normal"
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            Save
          </Button>
        </form>
      </Paper>
    </Container>
  );
};