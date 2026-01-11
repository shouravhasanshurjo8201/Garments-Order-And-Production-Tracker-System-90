import { Link, useLocation, useNavigate } from "react-router"
import useAuth from "../../hooks/useAuth"
import { TbFidgetSpinner } from "react-icons/tb"
import { FcGoogle } from "react-icons/fc"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import { useEffect } from "react"
import { motion } from "framer-motion"

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading, setLoading } = useAuth()
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || "/"

  useEffect(() => {
    document.title = "SignUp | Garments Production System";
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm()

  const imageUrl = watch("image");

  const saveUserToDB = async (userInfo) => {
    try {
      const { data } = await axiosSecure.post('/login-user', userInfo)
      return data
    } catch (err) {
      console.error("DB Save Error:", err)
      throw err
    }
  }

  const onSubmit = async (data) => {
    const { name, email, password, role, image } = data
    try {
      await createUser(email, password)
      await updateUserProfile(name, image)

      const userInfo = {
        name,
        email,
        role,
        status: "pending",
        photoURL: image,
      }

      await saveUserToDB(userInfo)
      toast.success("Account Created Successfully!")
      reset()
      navigate(from, { replace: true })

    } catch (err) {
      console.error(err)
      toast.error(err?.message || "Signup failed")
      setLoading(false)
    }
  }

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
      toast.success("Google Sign-in Successful!")
      navigate(from, { replace: true })
    } catch (err) {
      console.error(err)
      toast.error("Google Sign-in Failed")
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl border border-gray-500/50 shadow rounded-[2.5rem] p-8 sm:p-12"
      >
        <div className="text-center mb-5">
          <h1 className="text-4xl font-black  tracking-tight">Create Account</h1>
          <p className="text-gray-400 mt-2 font-medium">Join our production management system</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div className="md:col-span-2">
              <label className="text-sm font-bold text-gray-500 ml-1">Full Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Enter Your Name"
                className="w-full mt-1.5 px-4 py-3.5 rounded-2xl border border-gray-500/50 focus:ring-4 focus:ring-lime-500/10 focus:border-lime-500 outline-none transition-all"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1 ml-2 font-medium">{errors.name.message}</p>}
            </div>

            <div className="md:col-span-1">
              <label className="text-sm font-bold text-gray-500 ml-1">Profile Image URL</label>
              <input
                {...register("image", { required: "Image URL is required" })}
                type="text"
                placeholder="https://....."
                className="w-full mt-1.5 px-4 py-3.5 rounded-2xl border border-gray-500/50 focus:ring-4 focus:ring-lime-500/10 focus:border-lime-500 outline-none transition-all"
              />
              {errors.image && <p className="text-red-500 text-xs mt-1 ml-2 font-medium">{errors.image.message}</p>}
            </div>

            <div className="md:col-span-1">
              <label className="text-sm font-bold text-gray-500 ml-1">Account Role</label>
              <select
                {...register("role", { required: true })}
                className="w-full mt-1.5 px-4 py-3.5 rounded-2xl border border-gray-500/50 focus:ring-4 focus:ring-lime-500/10 focus:border-lime-500 outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="Buyer">Buyer</option>
                <option value="Manager">Manager</option>
              </select>
            </div>

            <div className="md:col-span-1">
              <label className="text-sm font-bold text-gray-500 ml-1">Email Address</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" }
                })}
                type="email"
                placeholder="Enter Your Email"
                className="w-full mt-1.5 px-4 py-3.5 rounded-2xl border border-gray-500/50 focus:ring-4 focus:ring-lime-500/10 focus:border-lime-500 outline-none transition-all"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 ml-2 font-medium">{errors.email.message}</p>}
            </div>

            <div className="md:col-span-1">
              <label className="text-sm font-bold text-gray-500 ml-1">Password</label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z]).+$/,
                    message: "Use Upper & Lower case"
                  }
                })}
                type="password"
                placeholder="••••••••"
                className="w-full mt-1.5 px-4 py-3.5 rounded-2xl border border-gray-500/50 focus:ring-4 focus:ring-lime-500/10 focus:border-lime-500 outline-none transition-all"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1 ml-2 font-medium">{errors.password.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-lime-700 hover:bg-lime-600 text-white/80 py-4 rounded-2xl font-bold text-lg shadow shadow-lime-500/30 active:scale-[0.98] transition-all disabled:opacity-70 mt-4"
          >
            {loading ? <TbFidgetSpinner className="animate-spin m-auto text-2xl" /> : "Create Account"}
          </button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-500/50"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-lime-500 rounded-2xl px-4 text-white/80 font-bold tracking-[0.2em]">Or use social</span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="flex w-full items-center justify-center gap-3 border border-gray-500/50 py-4 rounded-2xl font-bold text-gray-500 hover:bg-lime-700 hover:text-white/80 transition-all active:scale-[0.98]"
        >
          <FcGoogle size={24} />
          Sign up with Google
        </button>

        <p className="text-center text-sm font-medium text-gray-500 mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-lime-600 font-bold hover:underline">
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default SignUp