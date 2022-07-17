import React, {useContext, useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {BaseURLContext} from "../contexts/BaseURLContext";
import axios from "axios";
import {Button, Form} from "react-bootstrap";

const AddNewCourse = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const inputRef = useRef();
    const baseUrl = useContext(BaseURLContext);
    const api = axios.create({
        baseURL: baseUrl + '/courses',
    })
    const handleCancel = () => {
        // go back to previous page
        navigate(-1);
    }
    const handleSubmit = (event) =>{
        // prevent browser to refresh page
        event.preventDefault();
        console.log(title, description);
        const course = {
            title,
            description
        };
        console.log(course);
        api.post("/", course)
            .then(res => {
                console.log('post success', res.data);
                navigate('/courses');
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
            <h1 className={'text-center pt-3'}>Add New Course</h1>
            <Form style={{maxWidth: '500px', margin: '0 auto'}}>
                <div className={'border border-secondary rounded p-3'}>
                    <Form.Group className="mb-3" controlId="formBasicTitle">
                        <Form.Label>Course Title</Form.Label>
                        {error && <div className={'alert alert-danger'}>{error}</div>}
                        <Form.Control type="text" placeholder="Enter title"
                                      ref={inputRef}
                                      value={title} onChange={(event) => setTitle(event.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter description"
                                      value={description} onChange={(event) => setDescription(event.target.value)}/>
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

export default AddNewCourse;