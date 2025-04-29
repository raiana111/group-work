import { useEffect, useState } from 'react';
import axiosApi from '../AxiosApi';
import { ICategory } from '../types';
import { Link } from 'react-router-dom';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

export const CategoriesList = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    axiosApi.get<ICategory[]>('/categories/').then(res => setCategories(res.data));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Categories</Typography>
      <Button component={Link} to="/create-category" variant="contained" sx={{ mb: 2 }}>
        Create Category
      </Button>
      <List>
        {categories.map(cat => (
          <ListItem key={cat.id} component={Link} to={`/edit-category/${cat.id}`}>
            <ListItemText primary={cat.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};