import axios from "axios"

const DBsaveUser = async userData => {
  try {
    await axios.post(
      `${import.meta.env.VITE_API_URL}/jwt`,
      { email: userData.email },
      { withCredentials: true }
    );

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/user`,
      userData,
      { withCredentials: true }
    );

    return data;
  } catch (error) {
    console.error("Error in DBsaveUser:", error);
    throw error;
  }
}

export default DBsaveUser;