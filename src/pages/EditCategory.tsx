import { useEffect, useState } from 'react';
import axiosApi from '../AxiosApi';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';

export const EditCategory = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axiosApi.get(`/categories/${id}/`).then(res => setName(res.data.name));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosApi.patch(`/categories/${id}/`, { name });
      navigate('/categories');
    } catch {
      setError('Ошибка редактирования категории');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Edit Category
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Category Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            margin="normal"
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Save
          </Button>
        </form>
      </Paper>
    </Container>
  );
};