import React, {useContext, useEffect, useState} from 'react';
import {BaseURLContext} from "../contexts/BaseURLContext";
import axios from "axios";
import {Button, Table} from "react-bootstrap";

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const baseUrl = useContext(BaseURLContext);
    const api = axios.create({
        baseURL: baseUrl + '/courses',
    })
    // const navigate = useNavigate();
    useEffect(() => {
        api.get("/")
            .then(res => {
                console.log(res.data);
                setCourses(res.data);
            })
    }, []);

    return (
        <div className={'text-center'}>
            <h1>Manage Courses</h1>
            <Table striped bordered hover className="align-items-center text-center">
                <thead style={{backgroundColor: "darkgrey"}}>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Attended Student</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {courses.map(course => (
                    <tr key={course.id}>
                        <td>{course.id}</td>
                        <td>{course.title}</td>
                        <td>{course.description}</td>
                        <td>{course?.student?.email || 'Empty'}</td>
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

export default Courses;