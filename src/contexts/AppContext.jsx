import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import axios from 'axios';

const AppContext = createContext();

const API_URL = 'https://dummyjson.com/users';

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  // --- Data Fetching ---
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      const initialUsers = response.data.users.map(user => ({
        id: user.id,
        profile: user.image,
        name: user.firstName + " " + user.lastName,
        email: user.email,
        phone: user.phone,
        company: user.company.name,
        country: user.address.country,
      }));
      setUsers(initialUsers);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // --- Dark Mode Implementation ---
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // --- Data Manipulation (Delete, Update, Filter, Sort, Add) ---

  // NEW/UPDATED: Function to add a user
  const addUser = useCallback((newUser) => {
    // Add the new user to the beginning of the list
    setUsers(prevUsers => [newUser, ...prevUsers]);
  }, []);

  const deleteUser = useCallback((id) => {
    // Optimistically update the local state without re-fetching
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
  }, []);

  const updateUser = useCallback((id, updatedDetails) => {
    setUsers(prevUsers =>
      prevUsers.map(user => (user.id === id ? { ...user, ...updatedDetails } : user))
    );
  }, []);

  // Effect to handle searching and sorting on the 'users' state
  // This runs whenever 'users' or 'searchTerm' changes.
  useEffect(() => {
    let currentUsers = [...users];

    // 1. Filtering/Searching
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      currentUsers = currentUsers.filter(user =>
        user.name.toLowerCase().includes(lowerSearch) ||
        user.email.toLowerCase().includes(lowerSearch)
      );
    }

    // 2. Sorting
    if (sortKey) {
      currentUsers.sort((a, b) => {
        const aValue = a[sortKey]?.toString().toLowerCase() || '';
        const bValue = b[sortKey]?.toString().toLowerCase() || '';
        if (aValue < bValue) return -1;
        if (aValue > bValue) return 1;
        return 0;
      });
    }

    setFilteredUsers(currentUsers);
  }, [users, searchTerm, sortKey]);

  const contextValue = {
    filteredUsers,
    loading,
    searchTerm,
    setSearchTerm,
    sortKey,
    setSortKey,
    deleteUser,
    updateUser,
    addUser, // EXPOSED
    isDarkMode,
    toggleTheme,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);