import React, { useEffect, useState } from "react";
import StudentService from "../../service/studentService";
import AddStudentForm from './AddStudentForm';
import { confirmAlert } from "react-confirm-alert";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import swal from "sweetalert";
import StudentModal from "./StudentModal";



const StudentList = () => {
    const [studentList, setStudentList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
    const [action, setAction] = useState("add");
    const [idStd, setIdStd] = useState("1")
    const onPageChange = (pageChange) => {
        if (pageChange < 1 || pageChange > totalPage || pageChange === currentPage) {
            return;
        }
        setCurrentPage(pageChange);
    };
    const onPageStart = () => {
        setCurrentPage(1);
    };
    const onPageEnd = () => {
        if (currentPage !== totalPage) {
            setCurrentPage(totalPage);
        }
    };
    const renderPagination = () => {
        const pagination = [];
        pagination.push(
            <li
                onClick={() => onPageStart()}
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
            >
                <a
                    className="page-link"
                    href="#"
                    tabIndex="-1"
                    aria-disabled={currentPage === 1}
                >
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
        );
        pagination.push(
            <li
                onClick={() => onPageChange(currentPage - 1)}
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                key="prev"
            >
                <a
                    className="page-link"
                    href="#"
                    tabIndex="-1"
                    aria-disabled={currentPage === 1}
                >
                    <span aria-hidden="true">&lt;</span>
                </a>
            </li>
        );
        const startPage = Math.max(1, currentPage - 1);
        const endPage = Math.min(totalPage, currentPage + 1);
        if (startPage > 1) {
            pagination.push(
                <li className="page-item" key="startDots">
                    <a className="page-link" href="#" tabIndex="-1">
                        ...
                    </a>
                </li>
            );
        }
        for (let i = startPage; i <= endPage; i++) {
            pagination.push(
                <li
                    className={`page-item ${currentPage === i ? "active" : ""}`}
                    onClick={() => onPageChange(i)}
                    key={i}
                >
                    <a className="page-link" href="#">
                        {i}
                    </a>
                </li>
            );
        }
        if (endPage < totalPage) {
            pagination.push(
                <li className="page-item" key="endDots">
                    <a className="page-link" href="#" tabIndex="-1">
                        ...
                    </a>
                </li>
            );
        }
        pagination.push(
            <li
                onClick={() => onPageChange(currentPage + 1)}
                className={`page-item ${currentPage === totalPage ? "disabled" : ""
                    }`}
                key="next"
            >
                <a
                    className="page-link"
                    href="#"
                    tabIndex="-1"
                    aria-disabled={currentPage === totalPage}
                >
                    <span aria-hidden="true">&gt;</span>
                </a>
            </li>
        );
        pagination.push(
            <li
                onClick={() => onPageEnd()}
                className={`page-item ${currentPage === totalPage ? "disabled" : ""
                    }`}
            >
                <a
                    className="page-link"
                    href="#"
                    tabIndex="-1"
                    aria-disabled={currentPage === totalPage}
                >
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        );
        return pagination;
    };
    const handleDelete = (stdID) => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this info!",
            type: "danger",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            closeOnCancel: false
        }).then(isConfirm => {
            if (isConfirm) {
                StudentService.deleteStudent(stdID)
                swal("Deleted!", "Your file has been deleted.", "success");
                setStudentList(studentList.filter((std) => std.id !== stdID))
            } else {
                swal("Cancelled", "Your file is safe :)", "error");
            }
        });


    }
    useEffect(() => {
        try {
            async function getStudents() {
                let res = await StudentService.getStudents(currentPage);
                console.log(res.data);
                setStudentList(res.data.data);
                setTotalPage(Math.ceil(Number(res.data.pagination._totalRows) / Number(res.data.pagination._limit)))
            }
            getStudents();
        } catch (error) {

        }
    }, [currentPage])
    return (
        <>
            <ToastContainer />
            <div className="container d-flex justify-content-center">
                <button className="btn btn-primary me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Side Bar</button>


                <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setAction("add")} ><i className="fa fa-plus" /> Add Student</button>
            </div>

            <AddStudentForm action={action} id={idStd} />
            <StudentModal id={idStd} />

            <div className="container">
                <h3 className="d-flex justify-content-center">
                    Student List
                </h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>City</th>
                            <th>Mark</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            studentList.length && studentList.map((std, index) => (
                                <tr key={index}>
                                    <td>{std.id}</td>
                                    <td>{std.name}</td>
                                    <td>{std.age}</td>
                                    <td>{std.gender}</td>
                                    <td>{std.city}</td>
                                    <td>{std.mark}</td>
                                    <td>
                                        <button className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { setAction("edit"); setIdStd(std.id) }}><i className="fa-solid fa-pencil" /></button>
                                        <button className="btn btn-danger me-2" onClick={() => handleDelete(std.id)}><i className="fa-solid fa-trash" /></button>
                                        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#studentInfoModal" onClick={() => {setIdStd(std.id)}}>
                                            <i className="fa fa-circle-info"/>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <ul className="pagination justify-content-center">{renderPagination()}</ul>

            </div>
        </>
    )
}

export default StudentList;