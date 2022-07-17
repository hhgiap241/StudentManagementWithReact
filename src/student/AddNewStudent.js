import React, {useContext, useRef, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import {BaseURLContext} from "../contexts/BaseURLContext";
import axios from "axios";

const AddNewStudent = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const inputRef = useRef();
    const baseUrl = useContext(BaseURLContext);
    const api = axios.create({
        baseURL: baseUrl + '/students',
    })
    const handleCancel = () => {
        // go back to previous page
        navigate(-1);
    }
    const handleSubmit = (event) =>{
        // prevent browser to refresh page
        event.preventDefault();
        console.log(email, firstName, lastName, country);
        const student = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            country: country
        };
        console.log(student);
        api.post("/", student)
            .then(res => {
                console.log('post success', res.data);
                navigate('/students');
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
            <h1 className={'text-center pt-3'}>Add New Student</h1>
            <Form style={{maxWidth: '500px', margin: '0 auto'}}>
                <div className={'border border-secondary rounded p-3'}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        {error && <div className={'alert alert-danger'}>{error}</div>}
                        <Form.Control type="email" placeholder="Enter email"
                                      ref={inputRef}
                                      value={email} onChange={(event) => setEmail(event.target.value)}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name"
                                      value={firstName} onChange={(event) => setFirstName(event.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name"
                                      value={lastName} onChange={event => setLastName(event.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="Enter city"
                                      value={country} onChange={event => setCountry(event.target.value)}/>
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

export default AddNewStudent;