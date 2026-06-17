### Task Management App

## Author

**Magali Bogarin**

GitHub: https://github.com/mbogarin

## Project Description

The Task Management App is a React and TypeScript application that allows users to create, manage, update, and track tasks through an intuitive interface.

The application utilizes TypeScript for type safety, React Context API for global state management, React Router for navigation, and Auth0 for secure authentication and authorization.

### Technologies Used

- React
- TypeScript
- React Router
- Context API
- Auth0
- Bootstrap

### Challenges Faced

One challenge during development was managing task data across multiple components while keeping the application organized and maintainable. This was solved by implementing the Context API and creating a custom hook to simplify access to shared task data.

## Future Improvements

- Persist tasks using a backend API
- Add task due dates
- Add task categories and filtering
- Add search functionality
- Implement task sorting options
- Add user-specific task storage

## Table of Contents

- Project Description
- Installation & Setup
- Usage
- Project Structure
- Roadmap
- Collaborators

## Installation & Setup

Clone the repository:

```bash
git clone https://github.com/mbogarin/task-manager.git
```

Navigate into the project:

````bash
cd task-manager

Install dependencies:
```bash
npm install
````

Create a .env file and add your Auth0 configuration values.

Start the development server:

```bash
npm run dev
```

## Usage

Users can:

- Register using Auth0
- Log in securely
- Create tasks
- Edit tasks
- Delete tasks
- Mark tasks as completed
- View task details
- Access protected routes after authentication

### Screenshots

![Dashboard Screenshot](/images/dashboard.png)

## Project Structure

```bash
task-manager/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── types/
│   ├── auth/
│   └── App.tsx
```

## Roadmap

Future enhancements include:

- Backend database integration
- Task filtering
- Search functionality
- User-specific task persistence
- Due dates and reminders
- Mobile-friendly improvements

## Collaborators

Currently this project was developed independently.

Future collaborators can be listed here:

### Credits

Classmates and mentors at Coding Temple

### How to Contribute

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push your branch
5. Submit a pull request

⸻

## Notes

This project was created as part of a Software Engineering Bootcamp to practice React, TypeScript, Context API, and Auth0 authentication concepts.
