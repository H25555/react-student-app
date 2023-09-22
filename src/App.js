import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './component/layout/Navbar';
import { Routes, Route } from 'react-router-dom';
import StudentList from './component/student/StudentList';
import SideBar from './component/layout/SideBar';

function App() {
  return (
    <>
      <Navbar />
      <SideBar/>
      <Routes>
        <Route path='/' element={<StudentList/>}/>
      </Routes>
    </>
  );
}
export default App;