
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (err) => {
        const status = err?.response?.status;
        if (status === 401 || status === 403) {
          try {
            await logOut();
            navigate('/login');
          } catch (logoutError) {
            console.error('Logout failed during interception:', logoutError);
          }
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;