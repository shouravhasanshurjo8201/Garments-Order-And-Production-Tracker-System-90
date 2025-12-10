import { Link, Navigate, useLocation, useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import useAuth from "../../hooks/useAuth"
import { FcGoogle } from "react-icons/fc"
import { TbFidgetSpinner } from "react-icons/tb"
import LoadingSpinner from "../../components/Shared/LoadingSpinner"
import DBsaveUser from "../../hooks/useAxios"

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || "/"
  const { register, handleSubmit, formState: { errors } } = useForm()

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace />

  // Email + Password login
  const onSubmit = async (data) => {
    const { email, password } = data
    try {
      const result = await signIn(email, password)
      const loggedUser = result.user
      // Save to DB
      const userInfo = {
        name: loggedUser.displayName,
        email: loggedUser.email,
      }

      await DBsaveUser(userInfo)

      toast.success("Login Successful")
      navigate(from, { replace: true })
    } catch (err) {
      // Custom error messages
      if (err.code === "auth/user-not-found") {
        toast.error("User not found! Please register first.")
      } else if (err.code === "auth/wrong-password") {
        toast.error("Incorrect password. Try again.")
      } else {
        toast.error("Login failed. Try again.")
      }
      setLoading(false)
    }
  }

  // GOOGLE SIGNIN
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle()
      const loggedUser = result.user

      // Save to DB
      const userInfo = {
        name: loggedUser.displayName,
        email: loggedUser.email,
        role: "buyer",
        status: "pending",
        photoURL: loggedUser.photoURL
      }

      await DBsaveUser(userInfo)

      toast.success("Google Sign-in Successful!")
      navigate(from, { replace: true })
    } catch (err) {
      console.error(err)
      toast.error(err?.message || "Signup failed")
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">Sign in to access your account</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm">Email address</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Enter Your Email"
              className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900 border-gray-300 focus:outline-lime-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters required" },
              })}
              type="password"
              placeholder="*******"
              className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900 border-gray-300 focus:outline-lime-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <button type="submit" className="bg-lime-500 w-full rounded-md py-3 text-white">
            {loading ? <TbFidgetSpinner className="animate-spin m-auto" /> : "Continue"}
          </button>
        </form>

        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-400">Login with social accounts</p>
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
        </div>

        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 cursor-pointer rounded"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>

        <p className="px-6 text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" state={from} className="hover:underline hover:text-lime-500 text-gray-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
