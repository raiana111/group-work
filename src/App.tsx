import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login.tsx';
import { Register } from './pages/Register.tsx';
import { Home } from './pages/Home.tsx';
import { CreatePost } from './pages/CreatePost.tsx';
import { PostsList } from './pages/PostsList';
import { PostDetail } from './pages/PostDetail.tsx';
import { CategoriesList } from './pages/CategoriesList';
import { CreateCategory } from './pages/CreateCategory';
import { EditCategory } from './pages/EditCategory';
import { EditPost } from './pages/EditPost.tsx';
import Header from './components/Header.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/categories" element={<CategoriesList />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/create-category" element={<CreateCategory />} />
          <Route path="/edit-category/:id" element={<EditCategory />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;