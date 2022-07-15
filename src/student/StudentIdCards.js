import React, {useContext, useEffect, useState} from 'react';
import {Button, Modal, Table} from "react-bootstrap";
import {BaseURLContext} from "../contexts/BaseURLContext";
import axios from "axios";

const StudentIdCards = () => {
    const [show, setShow] = useState(false);
    const [idCards, setIdCards] = useState([]);
    const [id, setId] = useState(-1);
    const baseUrl = useContext(BaseURLContext);
    const api = axios.create({
        baseURL: baseUrl,
    })
    useEffect(() => {
        api.get("/id-cards")
            .then(res => {
                console.log(res.data);
                setIdCards(res.data);
            })
    }, [])
    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setShow(true);
        setId(id);
    }
    return (
        <div className={'text-center'}>
            <h1 className={'pt-3'}>Manage Student ID Cards</h1>
            <Table striped bordered hover className="align-items-center text-center">
                <thead style={{backgroundColor: "darkgrey"}}>
                <tr>
                    <th>ID</th>
                    <th>Card Number</th>
                    <th>Student Email</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {idCards.map(idCard => (
                    <tr key={idCard.id}>
                        <td>{idCard.id}</td>
                        <td>{idCard.card_number}</td>
                        <td>{idCard.student_email}</td>
                        <td>
                            <Button onClick={(id) => handleShow(idCard.id)}>View Detail</Button>
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
                    {
                        idCards.filter(idCard => idCard.id === id).map(idCard => (
                            <div key={idCard.id}>
                                Student id: {idCard.id}
                                <br/>
                                Card Number: {idCard.card_number}
                                <br/>
                                Student name: {idCard.student_name}
                                <br/>
                                Student email: {idCard.student_email}
                                <br/>
                                Student country: {idCard.student_country}
                                <br/>
                            </div>
                        ))
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default StudentIdCards;