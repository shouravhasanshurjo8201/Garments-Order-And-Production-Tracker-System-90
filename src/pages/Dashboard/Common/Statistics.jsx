import { TbAlertCircle } from "react-icons/tb"
import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics"
import LoadingSpinner from "../../../components/Shared/LoadingSpinner"
import useAuth from "../../../hooks/useAuth"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import { useEffect, useState } from "react"
import BuyerStatistics from "../../../components/Dashboard/Statistics/BuyerStatistics"
import ManagerStatistics from "../../../components/Dashboard/Statistics/ManagerStatistics"

const Statistics = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = " Dashboard";
  }, []);
  
  // Get user data from DB
  useEffect(() => {
    if (!user?.email) return

    const fetchData = async () => {
      try {
        // User data
        const userRes = await axiosSecure.get(`/user?email=${user.email}`)
        setUserData(userRes.data)

      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [user?.email, axiosSecure])

  if (loading) return <LoadingSpinner />;
  if (userData?.status === "Suspended") return 
  (<div className="min-h-[50vh] flex flex-col justify-center items-center text-center">
    <TbAlertCircle className="text-6xl text-red-500 mb-4 animate-pulse" />
    <h2 className="text-3xl font-bold text-gray-700 mb-2">Your Account is Suspended!</h2>
    <p className="text-gray-500 max-w-md">Sorry, The item you are looking for is not Available.</p>
  </div>)

  return (
    <div>
      {userData?.role === "Admin" && <AdminStatistics/>}
      {userData?.role === "Manager" && <ManagerStatistics/>}
      {userData?.role === "Buyer" && <BuyerStatistics/>}
    </div>
  )
}

export default Statistics
