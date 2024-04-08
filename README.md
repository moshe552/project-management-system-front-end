# Task Management Application

## Introduction

This frontend application is designed for efficient project and task management. It enables users to create projects, assign tasks, and track progress across different stages. With an intuitive interface for workflow management and features that facilitate collaborative teamwork, this application is ideal for boosting productivity and simplifying project processes.

## Features

- **Project Creation**: Easily create and manage projects with customizable options.
- **Task Assignment**: Assign tasks to team members with deadlines and priority levels.
- **Progress Tracking**: Monitor task and project progress across various stages.
- **Collaborative Teamwork**: Facilitate communication and collaboration among team members.
- **Intuitive Interface**: Navigate and manage your workflows with an easy-to-use interface.
- **Responsive Design**: Access the application on various devices with a responsive layout.

## Technologies

- **Language**: JavaScript
- **Framework**: React
- **Styling**: HTML, CSS with @emotion/react, and Material-UI for component styling

## Project Setup

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory and install dependencies:
   ```bash
   pnpm install
   ```
3. Create a .env file in the root directory of the project and add the server address as follows:
   ```
   VITE_SERVER_URL=https://bb-projects-db-api-mego-program1.vercel.app
   ```
   This URL is used to connect to the backend API for fetching and managing project data.
4. To start the development server, run:
    ```bash
    pnpm run dev
    ```

## Development Choices
ReactJS was chosen over Angular for its flexibility and faster UI development with a large community support.
Material-UI was preferred over Bootstrap for better integration with React and modern design offerings.
React DnD provides more flexibility in complex scenarios compared to alternatives like Beautiful DnD.

We welcome contributions to this project! Whether it's submitting bug reports, feature requests, or code contributions, please feel free to make a pull request or open an issue.
