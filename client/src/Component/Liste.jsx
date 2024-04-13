import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Liste() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      // Handle error if needed
    }
  };

  const deleteEmployee = async (id) => {
    console.log("Deleting employee with id:", id);

    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');

    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:8000/${id}/`);
        fetchEmployees(); // Refresh the employee list after deletion
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  return (
    <div className="container">
      <Link to='/create'>
        <button className="btn btn-warning my-3">Create Employee</button>
      </Link>
      <table width="100%" className="text-center">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.employee}</td>
              <td>{employee.department}</td>
              <td>
                <Link to={`/update/${employee.id}`} className="btn btn-secondary">
                  Update
                </Link>
                <button onClick={() => deleteEmployee(employee.id)} className="btn btn-danger mx-1">Delete</button>
              </td>       
            </tr>
          ))}
        </tbody>
      </table>  
    </div> 
  )
}