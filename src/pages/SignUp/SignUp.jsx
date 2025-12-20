
import { Link, useLocation, useNavigate } from "react-router"
import useAuth from "../../hooks/useAuth"
import { TbFidgetSpinner } from "react-icons/tb"
import { FcGoogle } from "react-icons/fc"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import useAxiosSecure from "../../hooks/useAxiosSecure"
import { useEffect } from "react"

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
    formState: { errors },
    reset
  } = useForm()

  const saveUserToDB = async (userInfo) => {
    try {
      const { data } = await axiosSecure.post('/login-user', userInfo)
      return data
    } catch (err) {
      console.error("DB Save Error:", err)
      throw err
    }
  }

  // FORM SUBMIT
  const onSubmit = async (data) => {
    const { name, email, password, role, image } = data

    try {
      // ১. Firebase Auth Create
      await createUser(email, password)

      // ২. Firebase Profile Update
      await updateUserProfile(name, image)

      const userInfo = {
        name,
        email,
        role,
        status: "pending",
        photoURL: image,
      }

      await saveUserToDB(userInfo)

      toast.success("Signup Successful!")
      reset()
      navigate(from, { replace: true })

    } catch (err) {
      console.error(err)
      toast.error(err?.message || "Signup failed")
      setLoading(false)
    }
  }

  // GOOGLE SIGNIN
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
      toast.error(err?.message || "Signup failed")
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center py-4 bg-white">
      <div className="flex flex-col w-xl p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Register to continue</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Enter Your Name"
                className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900 focus:outline-lime-500"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm">Profile Image URL</label>
              <input
                {...register("image", { required: "Image URL is required" })}
                type="text"
                placeholder="Enter Image URL"
                className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900 focus:outline-lime-500"
              />
              {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm">Select Role</label>
              <select
                {...register("role", { required: true })}
                className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900 focus:outline-lime-500"
              >
                <option value="Buyer">Buyer</option>
                <option value="Manager">Manager</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm">Email</label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Enter Your Email"
                className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900 focus:outline-lime-500"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block mb-2 text-sm">Password</label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters required" },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z]).+$/,
                    message: "Must contain upper & lower case letters"
                  }
                })}
                type="password"
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900 focus:outline-lime-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>
          </div>

          <button type="submit" className="bg-lime-500 w-full rounded-md py-3 text-white font-semibold">
            {loading ? <TbFidgetSpinner className="animate-spin m-auto" /> : "Continue"}
          </button>
        </form>

        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-400">Signup with social accounts</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 cursor-pointer rounded hover:bg-gray-200 transition"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>

        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="hover:underline hover:text-lime-500 text-gray-600 font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp