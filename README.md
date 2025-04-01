# Tech House Task Management Application

A task management application built with Angular 17 and Node.js, featuring a clean and intuitive user interface.

## Features

- 📝 Create, read, and delete tasks
- 📱 Responsive design for mobile, tablet, and desktop
- 🔔 Toast notifications for user feedback
- 📊 Pagination for task list
- 🧪 Unit tests

## Tech Stack

### Frontend
- Angular 19
- TypeScript
- Angular Signals
- Angular Standalone Components

### Backend
- Node.js
- TypeScript

## Prerequisites

- Node.js
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/catuga/tech-house-todo-app.git
cd tech-house-todo-app
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Start both frontend and backend servers:
```bash
npm start
```

The application will be available at `http://localhost:4200`.

## Testing

### Frontend Tests
```bash
npm test
```

## Project Structure

```
tech-house-todo-app/
├── src/                     # Frontend source code
│   ├── app/                 # Angular application
│   │   ├── components/      # Reusable components
│   │   ├── services/        # Angular services
│   │   ├── utils/           # Utility functions and types
│   │   └── views/           # Page components
│   ├── assets/              # Static assets
│   │   └── scss/            # SCSS styles
│   │       ├── base/        # Base styles
│   │       │   ├── _variables.scss    # Global variables
│   │       │   ├── _typography.scss   # Typography styles
│   │       │   └── _reset.scss        # Reset/normalize styles
│   │       ├── components/            # Component styles
│   │       │   └── _buttons.scss      # Button styles
│   │       └── styles.scss  # Main styles file
│   └── styles.scss          # Styles entry point
├── backend/                 # Backend source code
│   ├── src/                 # Node.js source code
│   └── package.json         # Backend dependencies
└── package.json             # Frontend dependencies
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Angular](https://angular.io/)
- [Node.js](https://nodejs.org/)