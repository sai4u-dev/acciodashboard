# Admin Dashboard

![Admin Dashboard Banner](https://via.placeholder.com/1200x300?text=Admin+Dashboard) <!-- Replace with actual banner if available -->

A modern, responsive Admin Panel built with React for managing user data fetched from the DummyJSON API. This application allows administrators to view, edit, and manage user profiles, roles, and other information in an intuitive interface. It leverages a clean UI design with Tailwind CSS and includes features like user editing, role assignment, and more.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Management**: View a list of users fetched from the API, with pagination and search functionality.
- **Editing Users**: Edit user details such as name, email, phone, address, and more.
- **Role Management**: Assign and update user roles (e.g., admin, moderator, user).
- **Profile Editing**: Update personal info, including images, bank details, and company information.
- **Responsive Design**: Fully mobile-friendly interface using Tailwind CSS.
- **Notifications**: Real-time feedback with React Toastify for success/error messages.
- **Modals**: Use React Modal for editing forms and confirmations.
- **Routing**: Seamless navigation with React Router DOM.
- **Additional Tools**: Icons from React Icons for enhanced UI, and Axios for API requests.

This panel is designed for scalability, making it easy to extend with more features like user deletion, bulk actions, or advanced filtering.

## Tech Stack

- **Frontend Framework**: React.js (v19.1.1)
- **State Management**: Built-in React hooks (useState, useEffect)
- **Routing**: React Router DOM (v7.9.5)
- **HTTP Client**: Axios (v1.13.1)
- **Styling**: Tailwind CSS (v4.1.16)
- **Modals**: React Modal (v3.16.3)
- **Notifications**: React Toastify (v11.0.5)
- **Icons**: React Icons (v5.5.0)
- **Build Tool**: Vite (v7.1.7)
- **Linting**: ESLint with React plugins
- **API**: DummyJSON Users API (`https://dummyjson.com/users`)

## Installation

To get started with the project locally:

1. **Clone the Repository**:
   ```
   git clone https://github.com/your-username/admin-dashboard.git
   cd admin-dashboard
   ```

2. **Install Dependencies**:
   ```
   pnpm install
   ```

3. **Run the Development Server**:
   ```
   pnpm dev
   ```
   The app will be available at `http://localhost:5173`.

4. **Build for Production**:
   ```
   pnpm run build
   ```

5. **Preview the Build**:
   ```
   pnpm run preview
   ```

6. **Lint the Code**:
   ```
   pnpm run lint
   ```

Ensure you have Node.js (v18+) installed.

## Usage

- **Login/Dashboard**: Upon starting, the dashboard fetches users from the API and displays them in a table or card view.
- **Editing a User**: Click on a user to open a modal for editing details. Changes can be saved via PUT requests to the API (note: DummyJSON is read-only, so simulate updates locally or use a mock server).
- **Role Assignment**: Select from predefined roles (admin, moderator, user) and update via the edit form.
- **Search & Filter**: Use the search bar to filter users by name, email, or role.
- **Error Handling**: Toast notifications for API errors or validation issues.

For production, consider adding authentication (e.g., JWT) and deploying to platforms like Vercel or Netlify.

## API Integration

The app integrates with the DummyJSON API:
- **Endpoint**: `https://dummyjson.com/users`
- **Methods Used**:
  - GET: Fetch all users or a single user.
  - PUT/PATCH: Update user details (simulated, as API is mock).
  - Other endpoints like `/users/search` for filtering.

Example Axios call in code:
```jsx
import axios from 'axios';

const fetchUsers = async () => {
  const response = await axios.get('https://dummyjson.com/users');
  return response.data.users;
};
```

## Project Structure

```
├── public/
├── src/
│   ├── assets/          # Images and static files
│   ├── contexts/          # Images and static files
│   ├── components/      # Reusable UI components (e.g., UserTable, EditModal)
│   ├── pages/           # Main pages (e.g., Dashboard, UserDetails)
│   ├── App.jsx          # Main app entry
│   ├── main.jsx         # React DOM render
│   └── index.css        # Global styles
├── .eslintrc.js         # ESLint config
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite config
└── README.md            # This file
```

## Contributing

Contributions are welcome! Follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a Pull Request.

Please ensure your code follows ESLint rules and includes relevant tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by [Your Name/Team]. If you have questions, open an issue or reach out!
