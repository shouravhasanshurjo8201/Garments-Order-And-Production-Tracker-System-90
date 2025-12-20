import useAxiosSecure from "./useAxiosSecure";

const useUserApi = () => {
  const axiosSecure = useAxiosSecure();

  const saveUserToDB = async (userData) => {
    try {
      const { data } = await axiosSecure.post('/login-user', userData);
      return data;
    } catch (error) {
      console.error("Login-User Error:", error?.response?.data || error.message);
      throw error;
    }
  };

  return { saveUserToDB };
};

export default useUserApi;


