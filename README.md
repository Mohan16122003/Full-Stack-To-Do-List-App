# Todo Task Management App

## Overview
The Todo Task Management App is a web application designed to help users manage their tasks efficiently. It features a modern user interface with capabilities for task creation, editing, deletion, sorting, and filtering. The application is built using React for the frontend, Node.js and Express for the backend, and SQLite for data storage.

## Features
- Create, edit, and delete tasks
- Sort tasks by various criteria
- Filter tasks by completion status
- Toggle between list and grid views
- Persistent data storage using SQLite

## Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- SQLite

## Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd ToDo-app
   ```

2. **Install Backend Dependencies**
   Navigate to the backend directory and install the necessary packages:
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   Navigate to the frontend directory and install the necessary packages:
   ```bash
   cd ../src
   npm install
   ```

4. **Set Up the SQLite Database**
   Ensure SQLite is installed and set up the database:
   ```bash
   # Create the database file
   touch tasks.db

   # Run any necessary migrations (if applicable)
   # This step may involve running a script or using a migration tool
   ```

## Running the Application

1. **Start the Backend Server**
   In the backend directory, run the server:
   ```bash
   cd backend
   npm start
   ```
   The backend server will start on `http://localhost:3000`.

2. **Start the Frontend Development Server**
   In the frontend directory, start the React development server:
   ```bash
   cd ../src
   npm start
   ```
   The frontend will be available at `http://localhost:3000`.

## Usage
- Open your web browser and navigate to `http://localhost:3000`.
- Use the interface to add, edit, delete, sort, and filter tasks.

## Development
- The application uses Redux for state management and Axios for API interactions.
- TypeScript is used for type safety and improved code quality.

## Future Enhancements
- Implement authentication for user accounts
- Add more advanced filtering options
- Improve error handling and validation

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for review.

## License
This project is licensed under the MIT License.
