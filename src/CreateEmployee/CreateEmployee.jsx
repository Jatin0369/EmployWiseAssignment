import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditUser() {
  const location = useLocation();
  const navigate = useNavigate();

  const userToEdit = location.state ? location.state.user : null;

  const [firstName, setFirstName] = useState(userToEdit?.first_name || "");
  const [lastName, setLastName] = useState(userToEdit?.last_name || "");
  const [email, setEmail] = useState(userToEdit?.email || "");

  useEffect(() => {
    if (!userToEdit) {
      toast.error("No user data found to edit.");
      navigate("/emplist");
    }
  }, [userToEdit, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://reqres.in/api/users/${userToEdit.id}`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
      });

      toast.success("User updated successfully!");
      navigate("/emplist"); // Redirect back to the user list
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again.");
    }
  };

  return (
    <div className="w-[30vw] py-4 shadow-lg border-blue-400 rounded-md bg-white mx-auto mt-12">
      <p className="text-3xl font-semibold text-center mt-4">Edit User</p>
      <form onSubmit={handleSubmit} className="mt-[2vw] w-[75%] mx-auto">
        <div className="p-2">
          <label className="block w-full my-2 text-gray-400">First Name</label>
          <input
            type="text"
            className="border-2 border-grey rounded-md w-[90%] h-[2.4vw] p-2 focus:border-blue-400 focus:outline-none"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="p-2">
          <label className="block w-full my-2 text-gray-400">Last Name</label>
          <input
            type="text"
            className="border-2 border-grey rounded-md w-[90%] h-[2.4vw] p-2 focus:border-blue-400 focus:outline-none"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="p-2">
          <label className="block w-full my-2 text-gray-400">Email</label>
          <input
            type="email"
            className="border-2 border-grey rounded-md w-[90%] h-[2.4vw] p-2 focus:border-blue-400 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="p-2 mt-4">
          <button
            type="submit"
            className="login-btn block w-[90%] h-[2.4vw] rounded-md font-semibold bg-blue-400 text-white"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUser;
