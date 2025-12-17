import { useState } from 'react'
import UpdateUserRoleModal from '../../Modal/UpdateUserRoleModal'
const UserDataRow = ({ user, index, refetchUsers }) => {
  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => setIsOpen(false)

  return (
    <tr>
      {/* Number */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <p className="text-gray-900">{index + 1}</p>
      </td>

      {/* Photo */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <img
          src={user?.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png'}
          alt="user"
          className="w-10 h-10 rounded-full object-cover"
        />
      </td>

      {/* Name */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <p className="text-gray-900">{user?.name}</p>
      </td>

      {/* Email */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <p className="text-gray-900">{user?.email}</p>
      </td>

      {/* Role */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800">
          {user?.role}
        </span>
      </td>

      {/* Status */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            user?.status === 'suspended'
              ? 'bg-red-100 text-red-700'
              : 'bg-green-100 text-green-700'
          }`}
        >
          {user?.status || 'Active'}
        </span>
      </td>

      {/* Action */}
      <td className="px-5 py-5 border-b bg-white text-sm">
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Update Role
        </button>

        {/* Modal */}
        <UpdateUserRoleModal
          isOpen={isOpen}
          closeModal={closeModal}
          user={user}
          refetchUsers={refetchUsers}
        />
      </td>
    </tr>
  )
}

export default UserDataRow
