import React, {useContext, useEffect, useState} from 'react';
import {BaseURLContext} from "../contexts/BaseURLContext";
import axios from "axios";
import {Button, Table} from "react-bootstrap";

const Books = () => {
    const [books, setBooks] = useState([]);
    const baseUrl = useContext(BaseURLContext);
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
    }, []);

    return (
        <div className={'text-center'}>
            <h1>Manage Books</h1>
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
                        <td>{book.student?.email || 'Available'}</td>
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

export default Books;