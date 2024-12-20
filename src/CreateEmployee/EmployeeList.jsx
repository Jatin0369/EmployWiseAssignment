import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Access the API base URL from .env

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users?page=${currentPage}`);
        setEmployees(response.data.data); // Users are under `data`
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employees:", error);
        toast.error("Failed to fetch employees. Please try again later.");
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [currentPage, API_BASE_URL]);

  const handleDelete = async (userId) => {
    try {
      // Simulate deletion using Reqres API
      await axios.delete(`${API_BASE_URL}/users/${userId}`);
      toast.success("User deleted successfully.");
      setEmployees(employees.filter((employee) => employee.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user. Please try again later.");
    }
  };

  const increasePageCount = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    toast.info(`Page ${currentPage + 1}`);
  };

  const decreasePageCount = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      toast.info(`Page ${currentPage - 1}`);
    } else {
      toast.warn("You are already on the first page.");
    }
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedEmployees = useMemo(() => {
    if (!sortConfig) return employees;

    return [...employees].sort((a, b) => {
      const aValue = a[sortConfig.key].toString().toLowerCase();
      const bValue = b[sortConfig.key].toString().toLowerCase();
      if (aValue < bValue) return sortConfig.direction === "ascending" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }, [employees, sortConfig]);

  const filteredEmployees = useMemo(() => {
    return sortedEmployees.filter((employee) => {
      const lowercasedQuery = searchQuery.toLowerCase();
      return (
        employee.id.toString().includes(lowercasedQuery) ||
        employee.first_name.toLowerCase().includes(lowercasedQuery) ||
        employee.last_name.toLowerCase().includes(lowercasedQuery) ||
        employee.email.toLowerCase().includes(lowercasedQuery)
      );
    });
  }, [sortedEmployees, searchQuery]);

  if (loading) return <div>Loading...</div>;
  if (error) {
    toast.error(error);
    return <div>{error}</div>;
  }

  return (
    <div className="w-[80%] border-blue-400 mx-auto rounded-md">
      <div className="p-4 text-3xl text-center bg-blue-300 text-white font-semibold">User List</div>
      <div className="flex justify-around bg-blue-100">
        <div className="my-4">
          <button
            onClick={() => setSortConfig(null)}
            className="bg-blue-400 p-2 text-white rounded-md hover:shadow-md hover:font-bold"
          >
            Clear Sorting
          </button>
        </div>
        <div className="search-box flex justify-center items-center">
          <label className="text-gray-500 mx-2 text-lg">Search</label>
          <input
            type="text"
            className="rounded-md w-[90%] h-[2.4vw] p-2 focus:outline-none focus:border-blue-400"
            placeholder="Enter name/email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <table className="w-[100%] table-auto border-collapse my-4">
        <thead className="bg-blue-300 h-[9vh]">
          <tr>
            <th className="text-2xl text-white">
              ID
              <button onClick={() => handleSort("id")}>
                {sortConfig?.key === "id" && sortConfig.direction === "ascending" ? "▲" : "▼"}
              </button>
            </th>
            <th className="text-2xl text-white">Avatar</th>
            <th className="text-2xl text-white">
              Name
              <button onClick={() => handleSort("first_name")}>
                {sortConfig?.key === "first_name" && sortConfig.direction === "ascending" ? "▲" : "▼"}
              </button>
            </th>
            <th className="text-2xl text-white">Email</th>
            <th className="text-2xl text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((user, index) => (
            <tr
              className={index % 2 === 0 ? "bg-blue-200" : "bg-blue-100"}
              key={user.id}
            >
              <td className="text-center text-gray-800 font-semibold">{user.id}</td>
              <td>
                <img className="mx-auto p-2" src={user.avatar} alt={user.first_name} height="50px" />
              </td>
              <td className="text-center text-gray-800 font-semibold">{`${user.first_name} ${user.last_name}`}</td>
              <td className="text-center text-gray-800 font-semibold">{user.email}</td>
              <td className="text-center text-white font-semibold">
                <button
                  className="bg-blue-400 p-2 text-white rounded-md hover:shadow-md hover:font-bold mx-1"
                  onClick={() => navigate("/createemp", { state: { user } })}
                >
                  Update
                </button>
                <button
                  className="bg-blue-400 p-2 text-white rounded-md hover:shadow-md hover:font-bold mx-1"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-around bg-blue-300 h-[6vh] mb-4 items-center">
        <p className="text-white text-xl font-medium">Total Count: {filteredEmployees.length}</p>
        <p
          className="text-white text-xl font-medium hover:cursor-pointer hover:font-bold"
          onClick={decreasePageCount}
        >
          Page -
        </p>
        <p
          className="text-white text-xl font-medium hover:cursor-pointer hover:font-bold"
          onClick={increasePageCount}
        >
          Page +
        </p>
      </div>
    </div>
  );
}

export default EmployeeList;
