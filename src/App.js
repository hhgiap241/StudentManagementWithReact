import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom'
import Home from "./home/Home";
import Students from "./student/Students";
import Error from "./error/Error";
import AddNewStudent from "./student/AddNewStudent";
import StudentIdCards from "./student/StudentIdCards";
import NavigationBar from "./home/NavigationBar";
import Books from "./book/Books";
import AddNewBook from "./book/AddNewBook";
import Courses from "./course/Courses";
import AddNewCourse from "./course/AddNewCourse";
import EditStudent from "./student/EditStudent";


function App() {
    return (
        <Router>
            <NavigationBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/students" element={<Students/>}/>
                <Route path={'/students/add'} element={<AddNewStudent/>}/>
                <Route path={'/students/:id'} element={<EditStudent/>}/>
                <Route path={'/students/id-cards'} element={<StudentIdCards/>}/>
                <Route path={'/books'} element={<Books/>}/>
                <Route path={'/books/add'} element={<AddNewBook/>}/>
                <Route path={'/courses'} element={<Courses/>}/>
                <Route path={'/courses/add'} element={<AddNewCourse/>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </Router>
    );
}

export default App;
