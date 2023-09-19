import React, { useEffect, useState } from "react";
import StudentService from "../../service/studentService";
import AddStudentForm from './AddStudentForm';


const StudentList = () => {
    const [studentList, setStudentList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState();
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
            
            <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal" ><i className="fa fa-plus" /> Add Student</button>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <AddStudentForm />
                    </div>
                </div>
            </div>

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