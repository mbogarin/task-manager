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

## Table of Contents

- [Project Description](#project-description)

- [Installation & Setup](#installation--setup)

- [Usage](#usage)

- [Roadmap](#roadmap)

- [Collaborators](#collaborators)

- [Project Structure](#project-structure)

## Installation & Setup

### 1. Clone the repository:

```bash
git clone https://github.com/mbogarin/task-manager.git
```

### 2. Navigate into the project directory:

```bash
cd task-manager
```

### 3. Install dependencies:

```bash
npm install
```

### 4. Create a .env file and add your Auth0 configuration values.

### 5. Start the development server:

```bash
npm run dev
```

### 6. Open the application

Open your browser and navigate to:

```text

http://localhost:5173

```

---

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

---

## Project Structure

```bash
src/
├── components/
│   ├── LoginButton.tsx
│   ├── LogoutButton.tsx
│   ├── NavBar.tsx
│   ├── TaskCard.tsx
│   └── TaskForm.tsx
│
├── context/
│   ├── TaskContext.tsx
│   ├── taskContextCore.ts
│   └── useTaskContext.tsx
│
├── pages/
│   ├── DashboardPage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── TaskDetailsPage.tsx
│
├── services/
│   └── AuthenticationGuard.tsx
│
├── types/
│   ├── auth.ts
│   └── task.ts
│
├── App.tsx
└── main.tsx
```

---

## Roadmap

Future enhancements include:

- Backend database integration
- Task filtering
- Search functionality
- User-specific task persistence
- Due dates and reminders
- Mobile-friendly improvements

---

## Collaborators

Currently this project was developed independently.

Future collaborators can be listed here:

### Credits

- Classmates and mentors at Coding Temple

---

## Notes

This project was created as part of a Software Engineering Bootcamp to practice React, TypeScript, Context API, and Auth0 authentication concepts.
