## User Management App with React (README.md)

This document explains the user management app built with React and its functionalities. It also details the setup instructions and technologies used.

## Project Overview

This React application provides a user management system that allows users to:

* Login with email and password
* View a list of users
* Search, sort, and paginate through the user list
* Edit user details (name and email)
* Delete users

The app utilizes the free [Reqres API](https://reqres.in/) to simulate user data and actions.

## Live Demo

See the app in action at: [https://employwiseassignment.onrender.com/](https://employwiseassignment.onrender.com/)

## Features

**Authentication:**

* Login with email and password
* Token-based authentication with cookies
* Redirection to the user list upon successful login

**User Management:**

* Displays a list of users fetched from the Reqres API
* Sorting (by name, email, ID) and searching functionalities
* Pagination for navigating through user pages
* Editing user details (name and email) with API integration
* User deletion with toast notifications for feedback

**Notifications:**

* Utilizes [react-toastify](https://fkhadra.github.io/react-toastify/) for displaying success and error messages
* Replaces traditional alerts for login, update, delete, and navigation actions

**Protected Routes:**

* Implements a `PrivateRoute` component to restrict access to specific pages (user list, edit) unless logged in

## Technologies Used

* **React:** Core frontend framework
* **React Router:** Navigation and route protection
* **Axios:** Makes API calls to the Reqres API
* **React Toastify:** Notification handling
* **Tailwind CSS:** User interface styling
* **Reqres API:** Mock API for user management operations

## Running the Project

1. **Prerequisites:** Ensure you have Node.js and npm (or yarn) installed on your system.
2. **Clone the Repository:** Clone this repository using Git
3. **Install Dependencies:** Run `npm install` (or `yarn install`) in the project directory to install required packages.
4. **Start the Development Server:** Run `npm start` (or `yarn start`) to start the development server. The app will be available at `http://localhost:3000/` by default.

**Note:**

* Depending on your deployment platform, configuration for environment variables and API endpoints might be necessary.


## Assumptions and Considerations

* This project utilizes a free mock API for demonstration purposes. In a real-world scenario, you would connect to a secure backend API.
* Error handling for user authentication and API calls can be further enhanced for production use.
* This is a basic user management system; advanced functionalities like user roles and permissions can be added.

