import { useState } from 'react';
import axiosApi from '../AxiosApi';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';

export const CreateCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axiosApi.post('/categories/', { name });
      navigate('/categories');
    } catch {
      setError('Ошибка создания категории');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 8 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Create Category
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
            Create
          </Button>
        </form>
      </Paper>
    </Container>
  );
};