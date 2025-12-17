import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const UpdateUserRoleModal = ({ isOpen, closeModal, user, refetchUsers }) => {
  const axiosSecure = useAxiosSecure()
  const [role, setRole] = useState(user?.role)
  const [status, setStatus] = useState(user?.status || 'Active')
  const [reason, setReason] = useState('')
  const [feedback, setFeedback] = useState('')
  const [loading, setLoading] = useState(false)

  const handleUpdate = async () => {
    try {
      setLoading(true)

      const payload = {
        role,
        status,
        suspendReason: status === 'Suspended' ? reason : '',
        suspendFeedback: status === 'Suspended' ? feedback : '',
      }

      await axiosSecure.patch(`/user/update/${user._id}`, payload)

      toast.success('User updated successfully')
      refetchUsers()
      closeModal()
    } catch (err) {
      console.error(err)
      toast.error('Failed to update user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <DialogTitle className="text-lg font-semibold text-gray-900">
              Update User
            </DialogTitle>

            {/* Role */}
            <div className="mt-4">
              <label className="text-sm font-medium">Role</label>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full mt-1 border rounded-lg px-3 py-2"
              >
                <option value="Buyer">Buyer</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* Status */}
            <div className="mt-4">
              <label className="text-sm font-medium">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value)}
                className="w-full mt-1 border rounded-lg px-3 py-2"
              >
                <option value="Active">Active</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>

            {/* Suspend Reason */}
            {status === 'Suspended' && (
              <>
                <div className="mt-4">
                  <label className="text-sm font-medium">
                    Suspend Reason
                  </label>
                  <input
                    type="text"
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                    placeholder="Enter suspend reason"
                  />
                </div>

                <div className="mt-4">
                  <label className="text-sm font-medium">
                    Why Suspend Feedback
                  </label>
                  <textarea
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                    className="w-full mt-1 border rounded-lg px-3 py-2"
                    rows="3"
                    placeholder="Explain why the user is suspended"
                  />
                </div>
              </>
            )}

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded bg-gray-200"
              >
                Cancel
              </button>
              <button
                disabled={loading}
                onClick={handleUpdate}
                className="px-4 py-2 rounded bg-green-600 text-white"
              >
                {loading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default UpdateUserRoleModal
