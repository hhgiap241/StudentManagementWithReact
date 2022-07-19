import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {BaseURLContext} from "../contexts/BaseURLContext";
import axios from "axios";
import {Button, Form} from "react-bootstrap";

const EditBook = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [createdDate, setCreatedDate] = useState('');
    // const [checkedCourses, setCheckedCourses] = useState([]);
    const [error, setError] = useState('');
    const inputRef = useRef();
    const baseUrl = useContext(BaseURLContext);
    const bookApi = axios.create({
        baseURL: baseUrl + '/books',
    });
    useEffect(() => {
        bookApi.get(`/${id}`)
            .then(res => {
                console.log('book data: ', res.data);
                setTitle(res.data.name);
                setDescription(res.data.description);
                setCreatedDate(res.data.createdDate);
            })
            .catch(err => {
                console.log(err);
                setError(err.response.data.error);
            })
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updateBook = {
            name: title,
            description: description,
        };
        try {
            const response = await bookApi.put(`/${id}`, updateBook);
            console.log('update book success: ', response.data);
            navigate('/books');
        } catch (err) {
            console.log(err);
            setError(err.response.data.error);
        }
    }
    const handleCancel = () => {
        // go back to previous page
        navigate(-1);
    }


    return (
        <div>
            <h1 className={'text-center pt-3'}>Update Book</h1>
            <Form style={{maxWidth: '500px', margin: '0 auto'}}>
                <div className={'border border-secondary rounded p-3'}>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Title</Form.Label>
                        {error && <div className={'alert alert-danger'}>{error}</div>}
                        <Form.Control type="text" placeholder="Enter book title"
                                      value={title} onChange={(event) => setTitle(event.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter description"
                                      value={description} onChange={(event) => setDescription(event.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCreatedDate">
                        <Form.Label>Created Date</Form.Label>
                        <Form.Control type="text" placeholder="Enter createdDate" ref={inputRef}
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

export default EditBook;