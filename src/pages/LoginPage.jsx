import React, { useState, useEffect } from 'react'; // <-- Import useEffect
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { signIn, error, user } = useAuth();
    const navigate = useNavigate();

    // 🏆 Solution: Use useEffect to handle navigation after render
    useEffect(() => {
        if (user) {
            // This runs after the render phase, avoiding the error
            navigate('/', { replace: true });
        }
    }, [user, navigate]); // Rerun only when 'user' or 'navigate' changes

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = signIn(username, password);
        // Successful sign-in will update the 'user' state, which triggers the useEffect above
        // and navigates the user.
        console.log(success)
    };

    // If 'user' is true, the component will render its current state briefly (or just null),
    // and then the useEffect will redirect it.
    if (user) {
        return <div className="text-center p-10 dark:text-white">Redirecting...</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">Admin Sign In</h2>
                {error && <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800">{error}</div>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* ... (rest of the form) ... */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username (admin)</label>
                        <input
                            type="text"
                            required
                            autoComplete='username'
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password (admin@1234)</label>
                        <input
                            type="password"
                            required
                            autoComplete='current-password'
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;