import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import AddUserModal from './AddUserModal'; // 👈 Import the new modal

const AddItem = () => {
    const { setSortKey, sortKey } = useAppContext();
    const [isModalOpen, setIsModalOpen] = useState(false); // 👈 New state for modal

    const sortOptions = [
        { label: 'None', key: null },
        { label: 'User Name', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Company', key: 'company' },
    ];

    return (
        <div className="flex items-center space-x-3">
            {/* Add User Button - now opens the modal */}
            <button
                type="button"
                onClick={() => setIsModalOpen(true)} // 👈 Open Modal
                className="text-white bg-blue-700 py-4 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-30"
            >
                Add User
            </button>

            {/* Sort By Dropdown */}
            <select
                value={sortKey || 'None'}
                onChange={(e) => setSortKey(e.target.value === 'None' ? null : e.target.value)}
                className="p-3 border border-gray-300 rounded-lg text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-blue-500 focus:border-blue-500"
            >
                <option value="None" disabled>Sort By</option>
                {sortOptions.map(option => (
                    <option key={option.key} value={option.key}>
                        {option.label}
                    </option>
                ))}
            </select>

            {/* Render the Modal */}
            <AddUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)} // 👈 Close Modal
            />
        </div>
    );
};

export default AddItem;