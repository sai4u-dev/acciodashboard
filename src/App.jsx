import './App.css'
import Home from './pages/Home'
import { useAppContext } from './contexts/AppContext'
import ThemeToggle from './components/ThemeToggle';
import { useAuth } from './contexts/AuthContext'; // Import useAuth for Sign Out
import Search from './components/Home/Search';
import Actions from './components/Home/Actions';
import AddItem from './components/Home/AddItem';
import Table from './components/Home/Table';
// App.jsx

function App() {
  const { user, signOut } = useAuth(); // Assuming useAuth is available
  const { isDarkMode } = useAppContext();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} transition-colors duration-300 overflow-hidden relative`}>
      <header className="flex justify-around items-center py-4 bg-white dark:bg-gray-800 shadow-md  ">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">User Dashboard</h1>
        <div className='flex items-center space-x-4'>
          <span className='text-sm text-gray-600 dark:text-gray-300'>Welcome, {user?.username || 'Admin'}</span>
          <div className='flex gap-x-4'>
            <Search />
            <AddItem />
          </div>
          <ThemeToggle />
          <button
            onClick={signOut}
            className="py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg text-sm transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>
      <div className='p-6 '>
        <Table />
      </div>
    </div>
  )
}

export default App