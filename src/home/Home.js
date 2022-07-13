import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <nav>
            <div>
                <Link to={'/students'} className={"h2"}>Manage Students</Link>
            </div>
            <div>
                <Link to={'/students/id-cards'} className={"h2"}>Manage Students ID Card</Link>
            </div>
            <div>
                <Link to={'/books'} className={"h2"}>Manage Books</Link>
            </div>
            <div>
                <Link to={'/courses'} className={"h2"}>Manage Courses</Link>
            </div>
        </nav>
    );
};

export default Home;