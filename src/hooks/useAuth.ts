import { useEffect, useState } from 'react';
import { IUser } from '../types';

export const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setUser({
        id: null,
        username: null,
        accessToken,
        refreshToken: localStorage.getItem('refreshToken'),
      });
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  return { user, loading };
};