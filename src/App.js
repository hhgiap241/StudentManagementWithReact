import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom'
import Home from "./home/Home";
import Students from "./student/Students";
import Error from "./error/Error";
import AddNewStudent from "./student/AddNewStudent";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/students" element={<Students/>}/>
                <Route path={'/students/add'} element={<AddNewStudent/>}/>
                <Route path="*" element={<Error/>}/>
            </Routes>
            <div className={'text-center pt-5'}>
                <Link to={'/'}>Back to Home</Link>
            </div>
        </Router>
    );
}

export default App;
