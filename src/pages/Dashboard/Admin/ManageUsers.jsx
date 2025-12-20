import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow'
import { useEffect, useState, useCallback, useMemo } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useAuth from '../../../hooks/useAuth'
import { Navigate } from 'react-router'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import { TbAlertCircle, TbUsers, TbSearch, TbRefresh } from 'react-icons/tb'

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure()
  const { user, loading: authLoading } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    document.title = "Manage Users | Dashboard";
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true)
      const res = await axiosSecure.get('/users')
      setUsers(res.data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }, [axiosSecure])

  useEffect(() => {
    const checkAdminAndFetch = async () => {
      if (!user?.email) return
      try {
        const res = await axiosSecure.get(`/user/admin?email=${user.email}`)
        setIsAdmin(res.data.admin)
        if (res.data.admin) {
          await fetchUsers()
        }
      } catch (error) {
        console.error('Admin check error:', error)
        setIsAdmin(false)
      } finally {
        if (!isAdmin) setLoading(false)
      }
    }
    checkAdminAndFetch()
  }, [axiosSecure, user?.email, fetchUsers])

  const filteredUsers = useMemo(() => {
    return users.filter(u => 
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [users, searchTerm])

  if (authLoading || isAdmin === null) {
    return <LoadingSpinner />
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 bg-gray-50 min-h-screen pb-10">
      <div className="py-8">
        {/* --- Header Section --- */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-lime-500 p-4 rounded-3xl text-white shadow-xl shadow-lime-100 ring-4 ring-lime-50">
              <TbUsers size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-800 tracking-tight leading-none mb-2">
                User Management
              </h2>
              <p className="text-sm text-gray-400 font-medium">
                Review, update roles, and manage system access
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
            {/* Search Bar */}
            <div className="relative flex-row lg:flex-row-0">
              <TbSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text"
                placeholder="Search by name or email..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full lg:w-80 pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-4 focus:ring-lime-500/10 focus:border-lime-500 outline-none transition-all text-sm font-medium" 
              />
            </div>

            {/* Stats Card */}
            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6">
              <div className="text-center border-r border-gray-100 pr-6">
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Total</p>
                <p className="text-xl font-black text-gray-800 leading-none">{users.length}</p>
              </div>
              <button 
                onClick={fetchUsers}
                className="p-2.5 hover:bg-gray-50 text-lime-600 rounded-xl transition-all active:rotate-180 duration-500"
                title="Refresh Data"
              >
                <TbRefresh size={24} />
              </button>
            </div>
          </div>
        </div>

        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-x-auto">
          <div className="inline-block min-w-full shadow-sm rounded-xl overflow-hidden border border-gray-200 bg-white">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="bg-gray-50/50 text-gray-400 border-b border-gray-100">
                  <th className="px-6 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em]">
                    SI
                  </th>
                  <th className="px-6 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em]">
                    User 
                  </th>
                  <th className="px-6 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em] hidden xl:table-cell">
                    Email Address
                  </th>
                  <th className="px-6 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em]">
                    Access Role
                  </th>
                  <th className="px-6 py-6 text-left text-[10px] font-black uppercase tracking-[0.2em]">
                     Status
                  </th>
                  <th className="px-6 py-6 text-right text-[10px] font-black uppercase tracking-[0.2em]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-50">
                {filteredUsers.map((userItem, index) => (
                  <UserDataRow
                    key={userItem._id}
                    user={userItem}
                    index={index}
                    refetchUsers={fetchUsers}
                  />
                ))}
              </tbody>
            </table>

            {!loading && filteredUsers.length === 0 && (
              <div className="min-h-[450px] flex flex-col justify-center items-center text-center p-12 bg-white">
                <div className="bg-orange-50 p-8 rounded-[2.5rem] mb-6">
                  <TbAlertCircle className="text-7xl text-orange-400 animate-bounce" />
                </div>
                <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">No Users Found</h2>
                <p className="text-gray-400 max-w-sm mx-auto leading-relaxed font-medium">
                  {searchTerm 
                    ? `We couldn't find any results for "${searchTerm}". Try a different name or email.`
                    : "The user database is currently empty. New users will appear here once they sign up."
                  }
                </p>
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="mt-6 text-lime-600 font-bold hover:underline"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
            
            {/* Table Loading Overlay */}
            {loading && users.length > 0 && (
               <div className="absolute inset-x-0 bottom-0 top-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-10">
                  <LoadingSpinner></LoadingSpinner>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ManageUsers