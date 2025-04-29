import { useState, useEffect } from 'react';
import { Container, TextField, Button, Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axiosApi from '../AxiosApi';
import { useNavigate } from 'react-router';
import { ICategory, IPostCreate } from '../types';

export const CreatePost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [extraInfo, setExtraInfo] = useState('');
  const [categoryId, setCategoryId] = useState<number | ''>('');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosApi.get<ICategory[]>('/categories/');
        setCategories(response.data);
      } catch (error) {
        setError('Failed to load categories.');
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      if (!title || !content || !categoryId) {
        setError('Please fill in all required fields.');
        return;
      }

      const requestData: IPostCreate = {
        title,
        content,
        category_id: categoryId as number,
        extra_info: extraInfo || null,
      };

      await axiosApi.post('/posts/', requestData);

      navigate('/');
    } catch (error) {
      setError('Failed to create post. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>Create Post</Typography>

        <Box component="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Content"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value as number)}
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
            label="Extra Info"
            variant="outlined"
            margin="normal"
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          />

          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 1 }}>{error}</Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{ mt: 3, borderRadius: 2 }}
          >
            Create Post
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};