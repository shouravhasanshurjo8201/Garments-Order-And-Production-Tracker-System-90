import { Link, useLocation, useNavigate } from "react-router"
import useAuth from "../../hooks/useAuth"
import { TbFidgetSpinner } from "react-icons/tb"
import { FcGoogle } from "react-icons/fc"
import toast from "react-hot-toast"
import { useForm } from "react-hook-form"
import DBsaveUser from "../../hooks/useAxios"

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || "/"

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  // FORM SUBMIT
  const onSubmit = async (data) => {
    const { name, email, password, role, image } = data

    try {
      // Firebase Auth Create
      await createUser(email, password)

      // Firebase Profile Update
      await updateUserProfile(name, image)

      // Save user to DB
      const userInfo = {
        name,
        email,
        role,
        status: "pending",
        photoURL: image,
      }

      await DBsaveUser(userInfo)

      toast.success("Signup Successful!")
      reset()
      navigate(from, { replace: true })

    } catch (err) {
      toast.error(err?.message || "Signup failed")
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
    <div className="flex justify-center items-center py-4 bg-white">
      <div className="flex flex-col w-xl p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">

        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Register to continue</p>
        </div>

        {/* SIGNUP FORM */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">

            {/* NAME */}
            <div>
              <label className="block mb-2 text-sm">Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Enter Your Name"
                className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* IMAGE */}
            <div>
              <label className="block mb-2 text-sm">Profile Image</label>
              <input
                {...register("image", { required: "Image URL is required" })}
                type="text"
                placeholder="Enter Image URL"
                className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900"
              />
              {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
            </div>

            {/* ROLE */}
            <div>
              <label className="block mb-2 text-sm">Select Role</label>
              <select
                {...register("role", { required: true })}
                className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900"
              >
                <option value="buyer">Buyer</option>
                <option value="manager">Manager</option>
              </select>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-2 text-sm">Email</label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Enter Your Email"
                className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* PASSWORD */}
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
                className="w-full px-3 py-2 border rounded-md bg-gray-200 text-gray-900"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

          </div>

          <button type="submit" className="bg-lime-500 w-full rounded-md py-3 text-white">
            {loading ? <TbFidgetSpinner className="animate-spin m-auto" /> : "Continue"}
          </button>
        </form>

        {/* GOOGLE SIGNIN */}
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-sm">Signup with social accounts</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 cursor-pointer"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </div>

        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="hover:underline hover:text-lime-500 text-gray-600">
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}

export default SignUp
