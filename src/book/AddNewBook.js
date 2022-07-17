import React, {useContext, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {BaseURLContext} from "../contexts/BaseURLContext";
import axios from "axios";
import {Button, Form} from "react-bootstrap";

const AddNewBook = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const createdDate = new Date().toLocaleDateString('vi-VN');
    const inputRef = useRef();
    const baseUrl = useContext(BaseURLContext);
    const api = axios.create({
        baseURL: baseUrl + '/books',
    })
    const handleCancel = () => {
        // go back to previous page
        navigate(-1);
    }
    const handleSubmit = (event) =>{
        // prevent browser to refresh page
        event.preventDefault();
        console.log(title, description, createdDate);
        const book = {
            name: title,
            description,
            createdDate
        };
        console.log(book);
        api.post("/", book)
            .then(res => {
                console.log('post success', res.data);
                navigate('/books');
            })
            .catch(err => {
                console.log(err.response.data.error);
                console.log(err);
                setError(err.response.data.error);
                inputRef.current.focus();
            })
    }
    return (
        <div>
            <h1 className={'text-center pt-3'}>Add New Book</h1>
            <Form style={{maxWidth: '500px', margin: '0 auto'}}>
                <div className={'border border-secondary rounded p-3'}>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Book Title</Form.Label>
                        {error && <div className={'alert alert-danger'}>{error}</div>}
                        <Form.Control type="text" placeholder="Enter book title"
                                      ref={inputRef}
                                      value={title} onChange={(event) => setTitle(event.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter description"
                                      value={description} onChange={(event) => setDescription(event.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCreatedDate">
                        <Form.Label>Created Date</Form.Label>
                        <Form.Control type="text"
                                      value={createdDate} disabled={true}/>
                    </Form.Group>
                    <Button variant="primary" type="submit"
                            className={'m-2'}
                            onClick={e => handleSubmit(e)}>
                        Submit
                    </Button>
                    <Button variant="secondary" type="button"
                            className={'m-2'}
                            onClick={handleCancel}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </div>

    );
};

export default AddNewBook;