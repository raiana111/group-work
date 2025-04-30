import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Container, Typography, Button, CircularProgress, Card, CardContent, CardActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import axiosApi from '../AxiosApi';
import { IPost, ICategory } from '../types';

export const Home = () => {
  const { accessToken, username } = useAuthStore();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | ''>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (accessToken) {
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
    } else {
      setLoading(false);
    }
  }, [accessToken, selectedCategory]);

  if (loading) return <CircularProgress />;

  return (
    <Container>
      {accessToken ? (
        <>
          <Typography variant="h4" gutterBottom>
            Привет, {username}!
          </Typography>
          <Typography variant="h5" gutterBottom>
            Ваши посты:
          </Typography>

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

          {posts.length > 0 ? (
            <div>
              {posts.map((post) => (
                <Card key={post.id} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="h6">{post.title}</Typography>
                    <Typography variant="body2" color="textSecondary">{post.content}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" component={Link} to={`/posts/${post.id}`}>
                      Подробнее
                    </Button>
                    {accessToken && (
                      <Button size="small" color="error" component={Link} to={`/edit-post/${post.id}`}>
                        Редактировать
                      </Button>
                    )}
                  </CardActions>
                </Card>
              ))}
            </div>
          ) : (
            <Typography>Посты не найдены</Typography>
          )}

          <Button variant="contained" component={Link} to="/create-post" sx={{ mt: 2 }}>
            Создать новый пост
          </Button>
        </>
      ) : (
        <Typography variant="h5" gutterBottom>
          Вы не авторизованы. Пожалуйста, войдите.
        </Typography>
      )}
    </Container>
  );
};

