import React, {useContext, useEffect, useState} from 'react';
import {Button, Table} from "react-bootstrap";
import {BaseURLContext} from "../contexts/BaseURLContext";
import axios from "axios";

const StudentIdCards = () => {
    const baseUrl = useContext(BaseURLContext);
    const api = axios.create({
        baseURL: baseUrl,
    })
    const [idCards, setIdCards] = useState([]);
    useEffect(() => {
        api.get("/id-cards")
            .then(res => {
                console.log(res.data);
                setIdCards(res.data);
            })
    }, [])
    return (
        <div className={'text-center'}>
            <h1 className={'pt-3'}>Manage Student ID Cards</h1>
            <Table striped bordered hover className="align-items-center text-center">
                <thead style={{backgroundColor: "darkgrey"}}>
                <tr>
                    <th>ID</th>
                    <th>Card Number</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {idCards.map(idCard => (
                    <tr key={idCard.id}>
                        <td>{idCard.id}</td>
                        <td>{idCard.card_number}</td>
                        <td>
                            <Button>View Detail</Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default StudentIdCards;