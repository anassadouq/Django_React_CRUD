import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Create() {
    const navigate = useNavigate();
    
    const [employee, setEmployee] = useState('');
    const [department, setDepartment] = useState('');

    const createEmployee = async (e) => {
        e.preventDefault();
        const employeeData = {
            employee: employee,
            department: department
        };

        console.log(employeeData);
        await axios.post('http://127.0.0.1:8000/add/', employeeData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(({ data }) => {
            console.log(data);
            navigate('/');
        }).catch(error => {
            if (error.response && error.response.status === 422) {
                console.log(error.response.data.errors);
            } else if (error.response) {
                console.log(error.response.data.message);
            } else {
                console.log('An unknown error occurred.');
            }
        });
    };

    return (
        <center>
            <form onSubmit={createEmployee} className="container my-3">
                <table>
                    <tr>
                        <td>Employee</td>
                        <td>: <input type="text" name="employee" onChange={(e) => setEmployee(e.target.value)} className="my-4"/></td>
                    </tr>
                    <tr>
                        <td>Department</td>
                        <td>: <input type="text" name="department" onChange={(e) => setDepartment(e.target.value)} className="my-4"/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button type="submit" className="form-control btn btn-warning btn-block">Submit</button>
                        </td>
                    </tr>
                </table>
            </form>
        </center>
    );
}