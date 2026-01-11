import { Link, Navigate, useLocation, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import useAuth from "../../hooks/useAuth"
import { FcGoogle } from "react-icons/fc"
import { TbFidgetSpinner } from "react-icons/tb"
import LoadingSpinner from "../../components/Shared/LoadingSpinner"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import { useEffect } from "react"
import { motion } from "framer-motion"

const Login = () => {
  useEffect(() => {
    document.title = "Login | Garments Production System";
  }, []);

  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth()
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || "/"

  const { register, handleSubmit, formState: { errors }, setValue } = useForm()

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace />

  const saveUserToDB = async (userInfo) => {
    try {
      const { data } = await axiosSecure.post('/login-user', userInfo)
      return data
    } catch (err) {
      console.error("Database sync failed:", err)
    }
  }

  const onSubmit = async (data) => {
    try {
      const result = await signIn(data.email, data.password)
      const loggedUser = result.user
      const userInfo = {
        name: loggedUser.displayName || "Unknown",
        email: loggedUser.email,
      }

      await saveUserToDB(userInfo)
      toast.success("Welcome Back! Login Successful")
      navigate(from, { replace: true })

    } catch (err) {
      console.error(err)
      if (err.code === "auth/user-not-found") {
        toast.error("User not found! Please register first.")
      } else if (err.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.")
      } else {
        toast.error("Login failed. Check your credentials.")
      }
      setLoading(false)
    }
  }

  // Google Sign-In Handling
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle()
      const loggedUser = result.user
      const userInfo = {
        name: loggedUser.displayName,
        email: loggedUser.email,
        role: "Buyer",
        status: "pending",
        photoURL: loggedUser.photoURL
      }

      await saveUserToDB(userInfo)
      toast.success("Google Login Successful!")
      navigate(from, { replace: true })

    } catch (err) {
      console.error(err)
      toast.error("Google Sign-in failed. Try again.")
      setLoading(false)
    }
  }

  const setDemoCredentials = (email, password, role) => {
    setValue("email", email)
    setValue("password", password)
    toast.success(`${role} credentials loaded`)
  }

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md border border-gray-500/50 shadow-2xl rounded-3xl p-8 sm:p-10"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black  tracking-tight">Welcome Back</h1>
          <p className="text-gray-400 mt-2 font-medium">Please enter your details to login</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="text-sm font-bold text-gray-500 ml-1">Email Address</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
              })}
              type="email"
              placeholder="Enter Email Address"
              className="w-full mt-1.5 px-4 py-3.5 rounded-2xl border border-gray-500/50   focus:ring-4 focus:ring-lime-500/10 focus:border-lime-500 outline-none transition-all"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 ml-2 font-medium">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-sm font-bold text-gray-500 ml-1">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Must be at least 6 characters" }
              })}
              type="password"
              placeholder="••••••••"
              className="w-full mt-1.5 px-4 py-3.5 rounded-2xl border border-gray-500/50  focus:ring-4 focus:ring-lime-500/10 focus:border-lime-500 outline-none transition-all"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 ml-2 font-medium">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lime-700 hover:bg-lime-600 text-white/80 py-4 rounded-2xl font-bold text-lg shadow shadow-lime-500/30 active:scale-[0.98] transition-all disabled:opacity-70"
          >
            {loading ? <TbFidgetSpinner className="animate-spin m-auto text-2xl" /> : "Sign In"}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-500/50"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className=" px-4 text-white/80 p-1 bg-lime-800 rounded-2xl font-bold tracking-widest">Or login with</span>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-3 border border-gray-500/60 py-3.5 rounded-2xl font-bold text-gray-500 hover:bg-lime-500/50 hover:text-white transition-all active:scale-[0.98]"
          >
            <FcGoogle size={24} />
            Continue with Google
          </button>

          {/* Demo Credentials  */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            <button
              onClick={() => setDemoCredentials("demouser@gmail.com", "User@10", "User")}
              className="text-[10px] font-black uppercase py-2  text-lime-600 rounded-lg border border-lime-500/50 hover:bg-lime-700 hover:text-white transition-all"
            >
              Buyer
            </button>
            <button
              onClick={() => setDemoCredentials("managermail123@gmail.com", "Manager@10", "Manager")}
              className="text-[10px] font-black uppercase py-2 text-lime-600 rounded-lg border border-lime-500/50 hover:bg-lime-700 hover:text-white transition-all"
            >
              Manager
            </button>
            <button
              onClick={() => setDemoCredentials("adminemail123@gmail.com", "Admin@10", "Admin")}
              className="text-[10px] font-black uppercase py-2 text-lime-600 rounded-lg border border-lime-500/50 hover:bg-lime-700 hover:text-white transition-all"
            >
              Admin
            </button>
          </div>
        </div>

        <p className="text-center text-sm font-medium text-gray-500 mt-8">
          New to the system?{" "}
          <Link to="/signup" state={from} className="text-lime-600 font-bold hover:underline">
            Create an Account
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Login