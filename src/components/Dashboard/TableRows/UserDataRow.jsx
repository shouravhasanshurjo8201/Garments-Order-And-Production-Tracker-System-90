
import { useState } from 'react'
import { TbEdit, TbShieldCheck, TbUserX, TbCircleKey, TbMail } from 'react-icons/tb'
import UpdateUserRoleModal from '../../Modal/UpdateUserRoleModal'

const UserDataRow = ({ user, index, refetchUsers }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <tr className="hover:bg-lime-50/30 transition-all duration-300 group border-b border-gray-100 last:border-none">
        {/* Serial Number */}
        <td className="px-5 py-5 text-xs font-mono text-gray-400 group-hover:text-lime-600 transition-colors">
          {(index + 1).toString().padStart(2, '0')}
        </td>
        
        {/* Profile Info */}
        <td className="px-5 py-5">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <img 
                className="w-12 h-12 rounded-2xl object-cover ring-4 ring-white shadow-md group-hover:scale-105 transition-transform duration-300" 
                src={user?.image || user?.photoURL || 'https://i.ibb.co/mJR9z8p/user.png'} 
                alt="avatar" 
              />
              {/* Status Indicator Dot */}
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm ${
                user?.status === 'Suspended' ? 'bg-red-500' : 'bg-green-500 animate-pulse'
              }`} />
            </div>
            <div className="max-w-[150px] truncate">
              <p className="font-bold text-gray-800 leading-tight group-hover:text-lime-700 transition-colors truncate">
                {user?.name || 'Anonymous User'}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium md:hidden">
                <TbMail size={12} />
                <span className="truncate">{user?.email}</span>
              </div>
            </div>
          </div>
        </td>

        {/* Desktop Email */}
        <td className="px-5 py-5 hidden md:table-cell">
           <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
             <TbMail className="text-gray-300" size={16} />
             <span>{user?.email}</span>
           </div>
        </td>

        {/* Role Badge */}
        <td className="px-5 py-5">
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase px-3 py-1.5 rounded-xl transition-all shadow-sm ${
            user?.role === 'Admin' ? 'bg-purple-100 text-purple-700 border border-purple-200' : 
            user?.role === 'Manager' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
            'bg-gray-100 text-gray-600 border border-gray-200'
          }`}>
            <TbCircleKey size={14} className={user?.role === 'Admin' ? 'animate-spin-slow' : ''} />
            {user?.role || 'Buyer'}
          </span>
        </td>

        {/* Status Badge */}
        <td className="px-5 py-5">
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase px-3 py-1.5 rounded-xl transition-all ${
            user?.status === 'Suspended' 
            ? 'bg-red-100 text-red-600 ring-1 ring-red-200' 
            : 'bg-lime-100 text-lime-700 ring-1 ring-lime-200'
          }`}>
            {user?.status === 'Suspended' ? <TbUserX size={14}/> : <TbShieldCheck size={14}/>}
            {user?.status || 'Active'}
          </span>
        </td>

        {/* Action Button */}
        <td className="px-5 py-5 text-right">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="group/btn relative p-2.5 bg-gray-50 hover:bg-gray-900 text-gray-400 hover:text-white rounded-2xl transition-all duration-300 active:scale-90 border border-gray-100 hover:border-gray-900"
          >
            <TbEdit size={20} className="group-hover/btn:rotate-12 transition-transform" />
            {/* Tooltip */}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              Edit Role
            </span>
          </button>
        </td>
      </tr>

      {/* Update Role Modal */}
      <UpdateUserRoleModal
        isOpen={isModalOpen} 
        closeModal={() => setIsModalOpen(false)} 
        user={user} 
        refetchUsers={refetchUsers}
      />
    </>
  )
}

export default UserDataRow