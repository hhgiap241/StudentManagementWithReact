import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {BaseURLContext} from "../contexts/BaseURLContext";
import axios from "axios";
import {Button, Form} from "react-bootstrap";

const EditStudent = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [country, setCountry] = useState('');
    const [books, setBooks] = useState([]);
    const [courses, setCourses] = useState([]);
    const [availableBooks, setAvailableBooks] = useState([]);
    const [availableCourses, setAvailableCourses] = useState([]);
    // const [checkedCourses, setCheckedCourses] = useState([]);
    const [error, setError] = useState('');
    const inputRef = useRef();
    const baseUrl = useContext(BaseURLContext);
    const studentApi = axios.create({
        baseURL: baseUrl + '/students',
    });
    const bookApi = axios.create({
        baseURL: baseUrl + '/books',
    });
    const courseApi = axios.create({
        baseURL: baseUrl + '/courses',
    });
    useEffect(() => {
        studentApi.get(`/${id}`)
            .then(res => {
                console.log('student data: ', res.data);
                setEmail(res.data.email);
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
                setCountry(res.data.country);
                setBooks(res.data.books);
                setCourses(res.data.courses);
            })
            .catch(err => {
                console.log(err);
                setError(err.response.data.error);
            })
        bookApi.get('/available')
            .then(res => {
                console.log('book data: ', res.data);
                setAvailableBooks(res.data);
            })
            .catch(err => {
                console.log(err);
                setError(err.response.data.error);
            })
        courseApi.get(`/available/${id}`)
            .then(res => {
                console.log('course data: ', res.data);
                setAvailableCourses(res.data);
                // const tempCourses = res.data.map(course => course.id);
                // const maxCourseId = tempCourses.length > 0 ? Math.max(...tempCourses) : 0;
                // const temp = new Array(maxCourseId + 1).fill(false)
                // setCheckedCourses(temp);
                // console.log('temp array: ', temp);
            })
            .catch(err => {
                console.log(err);
                setError(err.response.data.error);
            })
    }, []);
    const handleOnRemoveBookBorrowed = (removedBook) => {
        setBooks(prev => {
            return prev.filter(book => book.id !== removedBook.id);
        });
        setAvailableBooks(prev => {
            return [...prev, removedBook];
        });
    }

    const handleOnBorrowBook = (borrowBook) => {
        setAvailableBooks(prev => {
            return prev.filter(book => book.id !== borrowBook.id);
        });
        setBooks(prev => {
            return [...prev, borrowBook];
        })
    }
    const handleOnRemoveCourseAttendance = (removedCourse) => {
        setCourses(prev => {
            return prev.filter(course => course.id !== removedCourse.id);
        });
        setAvailableCourses(prev => {
            return [...prev, removedCourse];
        });
        // setCheckedCourses(prev => {
        //     return prev.map((checked, index) => {
        //         return index === courseId ? false : checked;
        //     })
        // });
        // console.log('selected courses: ', checkedCourses);
    }
    const handleOnAttendCourse = (attendedCourse) => {
        // const updatedCheckedCourses = checkedCourses.map((item, index) => {
        //     return index === courseId ? !item : item;
        // });
        // console.log('selected courses after change: ', updatedCheckedCourses);
        // setCheckedCourses(updatedCheckedCourses);
        // // move to attended courses
        // setCourses(prev => {
        //     return [...prev, availableCourses[position]]
        // })
        setAvailableCourses(prev => {
            return prev.filter(course => course.id !== attendedCourse.id)
        });
        setCourses(prev => {
            return [...prev, attendedCourse]
        })
    }
    const handleSubmit = async (event) => {
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
        // update student
        try {
            let response = await studentApi.put(`/${id}`, student);
            console.log('update student success: ', response.data);
            // navigate('/students');
        } catch (err) {
            console.log(err);
            setError(err.response.data.error);
            inputRef.current.focus();
        }
        // update books
        const studentBookRequest = {
            books: books,
            studentId: id
        }
        console.log('books to borrow: ', studentBookRequest);
        try{
            const response = await bookApi.put('/borrow', studentBookRequest);
            console.log('borrow books success: ', response.data);
        }catch(err){
            console.log(err);
            setError(err.response.data.error);
            inputRef.current.focus();
        }
        // update course
        const studentCoursesRequest = {
            courses: courses,
            studentId: id
        }
        console.log('student courses request: ', studentCoursesRequest);
        try {
            const response = await courseApi.put('/', studentCoursesRequest);
            console.log('update courses success: ', response.data);
            navigate('/students');
        } catch (err) {
            console.log(err);
            setError(err.response.data.error);
            inputRef.current.focus();
        }
    }
    const handleCancel = () => {
        // go back to previous page
        navigate(-1);
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
                                      value={email} disabled={true}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicFirstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name"
                                      value={firstName} onChange={(event) => setFirstName(event.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicLastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" ref={inputRef}
                                      value={lastName} onChange={event => setLastName(event.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" placeholder="Enter city"
                                      value={country} onChange={event => setCountry(event.target.value)}/>
                    </Form.Group>
                    <h5>Courses Attended: </h5>
                    {
                        courses.length > 0 ? (
                            courses.map(course => {
                                return (
                                    <Form.Check
                                        type={'checkbox'}
                                        key={course.id}
                                        id={course.id}
                                        label={`${course.title} (ID: ${course.id})`}
                                        checked={courses.includes(course)}
                                        onChange={() => handleOnRemoveCourseAttendance(course)}
                                    />
                                )
                            })
                        ) : (<li>No course</li>)
                    }
                    <h5>Borrowed Books: </h5>
                    {
                        books.length > 0 ? (
                            books.map(book => {
                                return (
                                    <Form.Check
                                        type={'checkbox'}
                                        key={book.id}
                                        id={book.id}
                                        label={`${book.name} (ID: ${book.id})`}
                                        checked={books.includes(book)}
                                        onChange={() => handleOnRemoveBookBorrowed(book)}
                                    />
                                )
                            })
                        ) : (<li>No book</li>)
                    }
                    <h5>Available Courses: </h5>
                    {
                        availableCourses.length > 0 ? (
                            availableCourses.map((course) => {
                                return (
                                    <Form.Check
                                        type={'checkbox'}
                                        id={course.id}
                                        key={course.id}
                                        label={`${course.title} (ID: ${course.id})`}
                                        checked={!availableCourses.includes(course)}
                                        onChange={() => handleOnAttendCourse(course)}
                                    />
                                )
                            })
                        ) : (<li>No course</li>)
                    }
                    <h5>Available Books: </h5>
                    {
                        availableBooks.length > 0 ? (
                            availableBooks.map(book => {
                                return (
                                    <Form.Check
                                        type={'checkbox'}
                                        key={book.id}
                                        id={book.id}
                                        label={`${book.name} (ID: ${book.id})`}
                                        checked={!availableBooks.includes(book)}
                                        onChange={() => handleOnBorrowBook(book)}
                                    />
                                )
                            })
                        ) : (<li>No book</li>)
                    }
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

export default EditStudent;