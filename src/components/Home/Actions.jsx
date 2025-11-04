import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';
import { FaTrash, FaInfoCircle } from 'react-icons/fa';

const Actions = ({ userId }) => {
  const navigate = useNavigate();
  const { deleteUser } = useAppContext();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete user ID: ${userId}?`)) {
      deleteUser(userId);
    }
  };

  const handleInfo = () => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={handleInfo}
        className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm p-2 transition-colors"
        title="View/Update Info"
      >
        <FaInfoCircle className="w-4 h-4" />
      </button>
      <button
        onClick={handleDelete}
        className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm p-2 transition-colors"
        title="Delete User"
      >
        <FaTrash className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Actions;