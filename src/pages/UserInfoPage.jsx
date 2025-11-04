import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

const UserInfoPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { filteredUsers, updateUser } = useAppContext();

    const userToEdit = filteredUsers.find(user => user.id.toString() === id);

    const [formState, setFormState] = useState(userToEdit || {});
    const [saved, setSaved] = useState(false);




    useEffect(() => {
        if (!userToEdit) {
            navigate('/');
        }
    }, [userToEdit, navigate]);

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
        setSaved(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(userToEdit.id, formState);
        setSaved(true);
    };

    useEffect(() => {
        if (saved) {
            const timer = setTimeout(() => {
                setSaved(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [saved]);



    if (!userToEdit) {
        return <div className="text-center text-lg mt-10 dark:text-white">Loading or User Not Found...</div>;
    }

    const fields = ['profile', 'name', 'email', 'phone', 'company', 'country'];


    return (
        <div className='flex justify-around gap-x-20 items-center px-4 '>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl mt-10">
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                    Update User Details: {userToEdit.name}
                </h2>

                {saved && (
                    <div className="p-3 mb-4 text-xl text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800 absolute bottom-0 right-10 px-10 py-10">
                        Details updated successfully!
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {fields.map(field => (
                        <div key={field}>
                            <label htmlFor={field} className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                                {field}
                            </label>
                            <input
                                type="text"
                                id={field}
                                name={field}
                                value={formState[field] || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                        </div>
                    ))}

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => navigate('/')}
                            className="py-2 px-4 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300"
                        >
                            Back to Home
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

            <div className="mt-10 zen-dots-regular">
                <div className='card border-4 border-amber-300 px-6 py-10 rounded-br-[56px] rounded-tl-[56px] rounded-sm bg-gray-100 text-black'>
                    <div className='flex items-center gap-x-6 mb-16 flex-row-reverse'>
                        {formState.profile && (
                            <img src={formState.profile} alt="Profile" className="w-20 h-20 rounded-full bg-sky-600" />
                        )}
                        <span className="inline-flex flex-col gap-2">
                            <h1 className="text-3xl font-bold">{formState.name}</h1>
                            <p>{formState.email}</p>
                        </span>
                    </div>
                    <p>{formState.phone}</p>
                    <span className='flex justify-between mb-4 mt-2'>
                        <p>{formState.company}</p>
                        <p>{formState.country}</p>
                    </span>
                </div>
            </div>
        </div>
    );

};

export default UserInfoPage;