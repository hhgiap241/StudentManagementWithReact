import React from 'react';

const Home = () => {
    return (
        <div>
            <div>
                <a href={'/students'} className={"h2"}>Manage Students</a>
            </div>
            <div>
                <a href={'/students/id-cards'} className={"h2"}>Manage Students ID Card</a>
            </div>
            <div>
                <a href={'/books'} className={"h2"}>Manage Books</a>
            </div>
            <div>
                <a href={'/courses'} className={"h2"}>Manage Courses</a>
            </div>
        </div>
    );
};

export default Home;