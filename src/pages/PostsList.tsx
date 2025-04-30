import { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import axiosApi from '../AxiosApi';
import { Link } from 'react-router-dom';
import { IPost, ICategory } from '../types';

export const PostsList = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | ''>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosApi.get<ICategory[]>('/categories/')
      .then(res => setCategories(res.data));

    const fetchPosts = () => {
      let url = '/posts/';
      if (selectedCategory !== '') {
        url += `?category=${selectedCategory}`;
      }

      axiosApi.get<IPost[]>(url)
        .then(res => setPosts(res.data))
        .finally(() => setLoading(false));
    };

    fetchPosts();
  }, [selectedCategory]);

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Все посты</Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Категория</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value === "" ? "" : Number(e.target.value))}
          label="Категория"
        >
          <MenuItem value="">Все</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <List>
        {posts.map((post) => (
          <ListItem key={post.id} component={Link} to={`/posts/${post.id}`}>
            <ListItemText
              primary={post.title}
              secondary={`Категория: ${post.category} | Автор: ${post.author}`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

