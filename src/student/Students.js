import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {BaseURLContext} from "../contexts/BaseURLContext";

// const api = axios.create({
//     baseURL: "http://localhost:8080/api/v1/students",
// })
const Students = () => {
    const [students, setStudents] = useState([]);
    const baseUrl = useContext(BaseURLContext);
    const api = axios.create({
        baseURL: baseUrl,
    })
    // const navigate = useNavigate();
    useEffect(() => {
        api.get("/")
            .then(res => {
                console.log(res.data);
                setStudents(res.data);
            })
    }, []);

    return (
        <div className={'text-center'}>
            <h1>Manage Students</h1>
            <Table striped bordered hover className="align-items-center text-center">
                <thead style={{backgroundColor: "darkgrey"}}>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>City</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {students.map(student => (
                    <tr key={student.id}>
                        <td>{student.id}</td>
                        <td>{student.email}</td>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.city}</td>
                        <td>
                            <Button style={{marginRight: "10px"}}>Edit</Button>
                            <Button>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Students;