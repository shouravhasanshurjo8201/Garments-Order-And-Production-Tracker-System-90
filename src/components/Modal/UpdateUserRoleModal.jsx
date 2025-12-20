import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import { TbUserEdit, TbAlertTriangle, TbLoader2, TbChevronDown, TbCircleCheck } from 'react-icons/tb'

const UpdateUserRoleModal = ({ isOpen, closeModal, user, refetchUsers }) => {
  const axiosSecure = useAxiosSecure()
  const [role, setRole] = useState(user?.role || 'Buyer')
  const [status, setStatus] = useState(user?.status || 'Active')
  const [reason, setReason] = useState('')
  const [feedback, setFeedback] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setRole(user.role || 'Buyer')
      setStatus(user.status || 'Active')
    }
  }, [user, isOpen])

  const handleUpdate = async () => {
    if (status === 'Suspended' && (!reason.trim() || !feedback.trim())) {
      return toast.error('Please explain the reason for suspension')
    }

    try {
      setLoading(true)
      const payload = {
        role,
        status,
        suspendReason: status === 'Suspended' ? reason : '',
        suspendFeedback: status === 'Suspended' ? feedback : '',
      }

      await axiosSecure.patch(`/user/update/${user._id}`, payload)
      toast.success("User Successfully Updated!");
    
      refetchUsers()
      closeModal()
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.message || 'Failed to sync user data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        {/* Modern Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-md" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-8 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-8 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-[2.5rem] bg-white p-10 text-left align-middle shadow-2xl transition-all border border-gray-100">
                
                {/* Header Section */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-lime-50 text-lime-600 rounded-3xl ring-8 ring-lime-50/50">
                    <TbUserEdit size={32} />
                  </div>
                  <div>
                    <DialogTitle as="h3" className="text-2xl font-black text-gray-800 tracking-tight leading-none mb-1">
                      User Governance
                    </DialogTitle>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{user?.role }</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Role Selector */}
                  <div className="relative group">
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-1 tracking-[0.2em]">
                      System Privilege
                    </label>
                    <div className="relative">
                      <select
                        value={role}
                        onChange={e => setRole(e.target.value)}
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 text-gray-700 font-bold focus:border-lime-500 focus:bg-white outline-none transition-all cursor-pointer appearance-none"
                      >
                        <option value="Buyer"> Buyer</option>
                        <option value="Manager"> Manager</option>
                        <option value="Admin"> Admin</option>
                      </select>
                      <TbChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Status Selector */}
                  <div>
                    <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 ml-1 tracking-[0.2em]">
                      Account State
                    </label>
                    <div className="relative">
                      <select
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        className={`w-full border-2 rounded-2xl px-5 py-4 font-bold outline-none transition-all cursor-pointer appearance-none ${
                          status === 'Suspended' 
                          ? 'bg-red-50 border-red-100 text-red-600 focus:border-red-500' 
                          : 'bg-green-50 border-green-100 text-green-700 focus:border-lime-500'
                        }`}
                      >
                        <option value="Active"> Active</option>
                        <option value="Suspended"> Suspend</option>
                      </select>
                      <TbChevronDown className={`absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none ${status === 'Suspended' ? 'text-red-400' : 'text-green-400'}`} />
                    </div>
                  </div>

                  {/* Enhanced Suspension UI */}
                  {status === 'Suspended' && (
                    <div className="space-y-4 pt-2 animate-in fade-in zoom-in-95 duration-500">
                      <div className="flex items-start gap-3 bg-red-600 text-white p-4 rounded-2xl shadow-xl shadow-red-100">
                        <TbAlertTriangle size={24} className="shrink-0 animate-pulse" />
                        <p className="text-[11px] font-bold leading-relaxed">
                          CRITICAL: Suspending "{user?.name}" will revoke all dashboard access and cancel active sessions immediately.
                        </p>
                      </div>

                      <input
                        type="text"
                        value={reason}
                        onChange={e => setReason(e.target.value)}
                        placeholder="Short Reason (e.g., Policy Violation)"
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 text-sm font-medium focus:border-red-500 focus:bg-white outline-none transition-all"
                      />

                      <textarea
                        value={feedback}
                        onChange={e => setFeedback(e.target.value)}
                        placeholder="Detailed message for the user's login screen..."
                        className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl px-5 py-4 text-sm font-medium focus:border-red-500 focus:bg-white outline-none transition-all resize-none"
                        rows="3"
                      />
                    </div>
                  )}
                </div>

                {/* Modern Footer Actions */}
                <div className="mt-10 flex flex-col-reverse sm:flex-row gap-4">
                  <button
                    onClick={closeModal}
                    className="flex-1 px-6 py-4 rounded-2xl bg-gray-100 text-gray-500 font-black uppercase text-[10px] tracking-[0.2em] hover:bg-gray-200 transition-all active:scale-95"
                  >
                    Discard
                  </button>
                  <button
                    disabled={loading}
                    onClick={handleUpdate}
                    className={`flex-[1.5] flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-lg active:scale-95 disabled:opacity-50 ${
                      status === 'Suspended' 
                      ? 'bg-red-600 text-white shadow-red-100 hover:bg-red-700' 
                      : 'bg-gray-900 text-white shadow-gray-200 hover:bg-lime-500'
                    }`}
                  >
                    {loading ? (
                      <TbLoader2 className="animate-spin" size={20} />
                    ) : (
                      'Save & Apply'
                    )}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default UpdateUserRoleModal