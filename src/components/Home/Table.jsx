import React from 'react';
import { useAppContext } from '../../contexts/AppContext';
import Actions from './Actions'; // Keep Actions component for the buttons

const Table = () => {
    const { filteredUsers, loading, setSortKey } = useAppContext();

    if (loading) {
        return <div className="text-center text-lg mt-10 dark:text-white">Loading user data...</div>;
    }

    const handleSort = (key) => {
        setSortKey(key);
    };

    // Mappings for table headers and sort keys
    const headers = [

        { title: 'User Profile', key: 'userprofile' },
        { title: 'User Name', key: 'name' },
        { title: 'Email', key: 'email' },
        { title: 'Phone Number', key: 'phone' },
        { title: 'Company', key: 'company' },
        { title: 'Country', key: 'country' },
        { title: 'Actions', key: 'actions' }, // No sorting on actions
    ];

    return (
        <div className='mt-8 w-full   '>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {headers.map((header) => (
                                <th
                                    key={header.key}
                                    scope="col"
                                    className={`px-6 py-3 ${header.key !== 'actions' ? 'cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors' : ''}`}
                                    onClick={() => header.key !== 'actions' && handleSort(header.key)}
                                >
                                    {header.title}
                                    {/* Optional: Add a sort icon here based on sortKey */}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className=''>
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"><img height={50} width={30} src={user.profile} alt={user.name} className='rounded-full bg-white' /></td>
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.name}</td>
                                    <td className="px-6 py-4">{user.email}</td>
                                    <td className="px-6 py-4">{user.phone}</td>
                                    <td className="px-6 py-4">{user.company}</td>
                                    <td className="px-6 py-4">{user.country}</td>
                                    <td className="px-6 py-4">
                                        <Actions userId={user.id} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-4 text-center dark:text-white">
                                    {loading ? "Loading..." : "No users found."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;