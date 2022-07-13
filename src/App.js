// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import Home from "./home/Home";
import StudentList from "./student/StudentList";
import Error from "./error/Error";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/students" element={<StudentList/>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>
        </Router>
    );
}

export default App;
