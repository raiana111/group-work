import { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';
import axiosApi from '../AxiosApi';
import { useNavigate, useParams } from 'react-router-dom';

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


  const handleDelete = async () => {
    try {
      await axiosApi.delete(`/categories/${id}/`);
      navigate('/categories');  
    } catch {
      setError('Ошибка удаления категории');
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
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          fullWidth
          sx={{ mt: 3 }}
        >
          Delete Category
        </Button>
      </Paper>
    </Container>
  );
};
