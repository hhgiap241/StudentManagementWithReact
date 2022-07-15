import React from 'react';
import {Link} from "react-router-dom";
import {BaseURLProvider} from '../contexts/BaseURLContext';

// const BaseURLContext = React.createContext('http://localhost:8080/api/v1/students');

const Home = () => {
    return (
        <div className={'text-center'}>
            <BaseURLProvider>
                <div>
                    <Link to={'/students'} className={"h2 text-decoration-none"}>Manage Students</Link>
                </div>
                <div>
                    <Link to={'/students/id-cards'} className={"h2 text-decoration-none"}>Manage Students ID Card</Link>
                </div>
            </BaseURLProvider>
            <div>
                <Link to={'/books'} className={"h2 text-decoration-none"}>Manage Books</Link>
            </div>
            <div>
                <Link to={'/courses'} className={"h2 text-decoration-none"}>Manage Courses</Link>
            </div>
        </div>
    );
};

export default Home;