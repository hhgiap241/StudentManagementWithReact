import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {Button, Modal, Table} from "react-bootstrap";
import {BaseURLContext} from "../contexts/BaseURLContext";
import {useNavigate} from "react-router-dom";

const Students = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [id, setId] = useState(-1);
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const baseUrl = useContext(BaseURLContext);
    const api = axios.create({
        baseURL: baseUrl + '/students',
    })
    // const navigate = useNavigate();
    useEffect(() => {
        api.get("/")
            .then(res => {
                console.log(res.data);
                setStudents(res.data);
            })
    }, [id]); // only run this effect when id changes
    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccess(false);
        }, 5000);
        return () => { // clean up
            clearTimeout(timer);
        }
    }, [success]);
    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
        }, 5000);
        return () => { // clean up
            clearTimeout(timer);
        }
    }, [error]);
    const handleShowModal = (studentId) => {
        setShow(true);
        setId(studentId);
    }

    const handleClose = () => {
        setShow(false);
    }
    const handleSubmit = async () => {
        try {
            await api.delete(`/${id}`);
            setId(-1); // set id to -1 to let me know that this student is deleted
            setSuccess(true);
            setShow(false);
        } catch (e) {
            console.log(e);
            setError('Delete student failed!');
            setShow(false);
        }
    }
    const handleEditBtn = (id) =>{
        navigate(`/students/${id}`);
    }
    return (
        <div className={'text-center'}>
            <h1>Manage Students</h1>
            {success && <div className={'alert alert-success'}>Delete student successfully!</div>}
            {error && <div className={'alert alert-danger'}>{error}</div>}
            <Table striped bordered hover className="align-items-center text-center">
                <thead style={{backgroundColor: "darkgrey"}}>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Country</th>
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
                        <td>{student.country}</td>
                        <td>
                            <Button style={{marginRight: "10px"}} onClick={() => handleEditBtn(student.id)}>Edit</Button>
                            <Button onClick={() => handleShowModal(student.id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Student Id Card Information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete student with id: {id}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleSubmit}>
                        Yes
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Students;