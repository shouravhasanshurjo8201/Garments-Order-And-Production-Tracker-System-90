import axios from "axios"

const DBsaveUser = async userData => {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_URL}/user`,
    userData
  )
  return data
}
export default DBsaveUser