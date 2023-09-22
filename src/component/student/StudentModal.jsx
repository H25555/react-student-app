import React,{useState, useEffect} from "react";
import StudentService from "../../service/studentService";

const StudentModal = (props) => {
    const [student, setStudent] = useState({});
    useEffect(() => {
        async function getStudent() {
            const std = await StudentService.getStudent(props.id)
            setStudent(std.data)
        }
        if(props.id != 1){
            getStudent();
        }
    },[props.id])
    return (
        <div className="modal fade" id="studentInfoModal" tabindex="-1" aria-labelledby="studentInfoModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Student Info</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div>
                           {student.name && <h3>{student.name} - {student.gender}</h3>}
                           <h5 >Age: {student.age}</h5>
                            <h5>Mark: {student.mark}</h5>
                            <h5>City: {student.city}</h5>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default StudentModal;