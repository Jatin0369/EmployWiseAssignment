# User Management App

This is a user management app built with React. It integrates with the [Reqres API](https://reqres.in/) to manage users, including functionalities like login, viewing users, editing user details, and deleting users. The app uses several modern libraries to enhance the user experience and facilitate easy state management, routing, and notifications.

## Live Site

Check out the live version of the app [here].

## Features

### 1. **Login System**
- **Login Page:** Users authenticate using email and password.
- **Authentication:** Tokens are used for authentication and stored in cookies.
- **Redirection:** Upon successful login, users are redirected to the user list page.

### 2. **User List**
- Displays a list of users fetched from the Reqres API.
- **Sorting:** Allows sorting of users by name, email, or ID (ascending/descending).
- **Searching:** Search for users by name, email, or ID.
- **Pagination:** Navigation between pages (Next/Previous).
- **Delete User:** Users can be deleted, and toast notifications are shown upon successful deletion.

### 3. **User Edit Functionality**
- **Edit User:** Users can update details (name, email) of a selected user.
- **API Integration:** Updates data via the API (PUT `/users/:id`).
- **Error Handling:** Handles missing or invalid data with error messages.

### 4. **Notifications**
- Uses [react-toastify](https://fkhadra.github.io/react-toastify/) for success and error notifications.
- Notifications replace alert messages for actions like login, update, delete, and page navigation.

### 5. **Protected Routes**
- Implements a `PrivateRoute` component to restrict access to certain pages, like the user list and edit pages, unless the user is logged in.

---

## Technologies Used

- **React:** Core framework for building the frontend.
- **React Router:** For navigation and route protection.
- **Axios:** For making API calls to the Reqres API.
- **React Toastify:** For handling notifications.
- **Tailwind CSS:** For styling the user interface.
- **Reqres API:** A mock API to simulate real-world user management operations.

---

## How It All Comes Together

1. **Login:** Users authenticate with email and password, and are redirected to the user list page after successful login.
2. **User List:** The list displays all users fetched from the Reqres API with options to search, sort, paginate, edit, and delete.
3. **Edit User:** Admin users can edit the details of a user (name and email), and changes are saved via the Reqres API.
4. **Delete User:** Users can be deleted, with feedback provided via toast notifications.
5. **Protected Routes:** Pages like the user list and user editing are protected and only accessible after logging in.

---
