import React, {useContext, useEffect, useState} from 'react';
import {BaseURLContext} from "../contexts/BaseURLContext";
import axios from "axios";
import {Button, Modal, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Books = () => {
    const [books, setBooks] = useState([]);
    const baseUrl = useContext(BaseURLContext);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [id, setId] = useState(-1);
    const [error, setError] = useState('');
    const api = axios.create({
        baseURL: baseUrl + '/books',
    })
    // const navigate = useNavigate();
    useEffect(() => {
        api.get("/")
            .then(res => {
                console.log(res.data);
                setBooks(res.data);
            })
            .catch(err => {
                console.log(err);
                setError(err.response.data.error);
            })
    }, [id]);
    useEffect(() => {
        const timer = setTimeout(() => {
            setSuccess(false);
        }, 5000);
        return () => { // clean up
            clearTimeout(timer);
        }
    }, [success]);
    const handleEditBtn = (id) => {
        navigate(`/books/${id}`);
    }
    const handleShowModal = (bookId) => {
        setShow(true);
        setId(bookId);
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
            setError('Delete book failed!');
            setShow(false);
        }
    }
    return (
        <div className={'text-center'}>
            <h1>Manage Books</h1>
            {success && <div className={'alert alert-success'}>Delete book successfully!</div>}
            {error && <div className={'alert alert-danger'}>{error}</div>}
            <Table striped bordered hover className="align-items-center text-center">
                <thead style={{backgroundColor: "darkgrey"}}>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Created Date</th>
                    <th>Student Email</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {books.map(book => (
                    <tr key={book.id}>
                        <td>{book.id}</td>
                        <td>{book.name}</td>
                        <td>{book.description}</td>
                        <td>{book.createdDate}</td>
                        <td>{book.studentEmail || 'Available'}</td>
                        <td>
                            <Button style={{marginRight: "10px"}} onClick={() => handleEditBtn(book.id)}>Edit</Button>
                            <Button onClick={() => handleShowModal(book.id)}>Delete</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Book Delete Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete book with id: {id}?
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

export default Books;