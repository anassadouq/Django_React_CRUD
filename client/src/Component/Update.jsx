import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [employee, setEmployee] = useState('');
    const [department, setDepartment] = useState('');

    
    const updateEmployee = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://127.0.0.1:8000/update/${id}/`, { employee, department });
            console.log(response.data.message);
            navigate('/');
        } catch (error) {
            if (error.response.status === 422) {
                console.log(error.response.data.errors);
            } else {
                console.log(error.response.data.message);
            }
        }
    }

    return (
        <center>
            <div className="container my-3">
                <form onSubmit={updateEmployee}>
                    <table>
                        <tr>
                            <td><b>Employee</b></td>
                            <td>: <input type="text" name="employee" value={employee} onChange={(e) => setEmployee(e.target.value)} className="my-4"/></td>
                        </tr>
                        <tr>
                            <td><b>Department</b></td>
                            <td>: <input type="text" name="department" value={department} onChange={(e) => setDepartment(e.target.value)} className="my-4"/></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><button className="form-control btn btn-secondary btn-block">Update</button></td>
                        </tr>
                    </table>
                </form>
            </div>
        </center>
    )
}