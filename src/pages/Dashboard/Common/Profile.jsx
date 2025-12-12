import { useEffect, useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import coverImg from '../../../assets/images/cover.jpg'
import toast from "react-hot-toast";
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';

const Profile = () => {
  const { user, updateUserProfile } = useAuth()
  const axiosSecure = useAxiosSecure()
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [openModal, setOpenModal] = useState(false)
  const [name, setName] = useState("")
  const [photo, setPhoto] = useState("")

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/user?email=${user.email}`)
        .then((res) => {
          setUserData(res.data)
          setName(res.data.name)
          setPhoto(res.data.photoURL)
          setLoading(false)
        })
        .catch(() => setLoading(false))
    }
  }, [user?.email, axiosSecure])

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(name, photo);
    } catch (error) {
      toast.error("Firebase update failed!");
      return;
    }

    axiosSecure.patch("/user", {
      email: user.email,
      name,
      photoURL: photo,
    })
      .then(() => {
        toast.success("Profile Updated Successfully!");
        setOpenModal(false);
      })
      .catch(() => toast.error("Database update failed!"));
  };


  if (loading) return <LoadingSpinner/>

  return (
    <>
      <div className='flex justify-center items-center '>
        <div className='bg-blue-100 shadow-lg rounded-2xl md:w-4/5 lg:w-3/5 border-2 border-blue-500'>
          <img src={coverImg} className='w-full mb-4 rounded-t-xl h-56' />

          <div className='flex flex-col items-center p-4 -mt-16'>
            <img src={user?.photoURL} className='rounded-full h-24 w-24 border-2 border-white' />

            <p className='p-1 px-4 font-bold text-white bg-lime-500 my-4 rounded-full'>
              {userData.role}
            </p>
            <button
                  onClick={() => setOpenModal(true)}
                  className='bg-lime-500 px-10 py-1 rounded-lg text-white hover:bg-lime-800'
                >
                  Update Profile
                </button>

            <p className='mt-2 text-xl font-medium text-gray-800'>
              User ID: {user?.uid}
            </p>

            <div className='w-full p-2 mt-4'>
              <div className='flex flex-wrap justify-between text-sm text-gray-600'>
                <p className='flex flex-col'>
                  Name
                  <span className='font-bold'>{userData?.name}</span>
                </p>

                <p className='flex flex-col'>
                  Email
                  <span className='font-bold'>{userData?.email}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {openModal && (
        <div className='fixed inset-0 bg-black/60  flex justify-center items-center'>
          <div className='bg-blue-100 p-6 rounded-lg w-96 mx-auto'>
            <h2 className='text-xl text-lime-500 font-bold mb-4'>Update Profile</h2>

            <form onSubmit={handleUpdate}>
              <label>Name</label>
              <input
                type='text'
                className='border w-full p-2 mb-3 rounded'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label>Photo URL</label>
              <input
                type='text'
                className='border w-full p-2 mb-3 rounded'
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />

              <button className='bg-lime-500 text-white px-6 py-2 rounded w-full'>
                Save Changes
              </button>

              <button
                type='button'
                onClick={() => setOpenModal(false)}
                className='mt-2 w-full bg-gray-300 p-2 rounded'
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Profile
