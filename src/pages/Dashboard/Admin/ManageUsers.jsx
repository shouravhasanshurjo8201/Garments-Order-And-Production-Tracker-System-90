import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow'
import { useEffect, useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useAuth from '../../../hooks/useAuth'
import { Navigate } from 'react-router'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import { TbAlertCircle } from 'react-icons/tb'

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure()
  const { user, loading: authLoading } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    document.title = "Manage Users | Dashboard";
  }, []);

  //  Check Admin Role from DB
  useEffect(() => {
    if (!user?.email) return
    axiosSecure
      .get(`/user/admin?email=${user.email}`)
      .then(res => {
        setIsAdmin(res.data.admin)
      })
  }, [axiosSecure, user])

  // Fetch All Users (Admin Only)
  useEffect(() => {
    if (!isAdmin) return
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get('/users')
        setUsers(res.data)
      } catch (error) {
        console.error('Error fetching users:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [axiosSecure, isAdmin])

  if (authLoading || loading) {
    return <LoadingSpinner />
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <h2 className="text-2xl text-center text-lime-500 font-bold mb-6">Manage Users</h2>

        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-white border-b text-sm uppercase">
                    Si
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-sm uppercase">
                    Photo
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-sm uppercase">
                    Name
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-sm uppercase">
                    Email
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-sm uppercase">
                    Role
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-sm uppercase">
                    Status
                  </th>
                  <th className="px-5 py-3 bg-white border-b text-sm uppercase">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((userItem, index) => (
                  <UserDataRow
                    key={userItem._id}
                    user={userItem}
                    index={index}
                    refetchUsers={() => {
                      axiosSecure.get('/users').then(res => setUsers(res.data))
                    }}
                  />
                ))}
              </tbody>
            </table>

            {users.length === 0 && (

              <div className="min-h-[50vh] flex flex-col justify-center items-center text-center">
                <TbAlertCircle className="text-6xl text-red-500 mb-4 animate-pulse" />
                <h2 className="text-3xl font-bold text-gray-700 mb-2">Users Not Found!</h2>
                <p className="text-gray-500 max-w-md">Sorry, The item you are looking for is not Available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageUsers
