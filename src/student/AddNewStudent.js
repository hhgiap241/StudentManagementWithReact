import React from 'react';
import {Button, Form} from "react-bootstrap";

const AddNewStudent = () => {
    return (
        <div>
            <h1 className={'text-center pt-3'}>Add New Student</h1>
            <Form>
                <div className={'border border-secondary rounded p-3'}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out"/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className={'m-2'}>
                        Submit
                    </Button>
                    <Button variant="secondary" type="button" className={'m-2'}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </div>

    );
};

export default AddNewStudent;