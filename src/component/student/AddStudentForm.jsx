import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import StudentService from "../../service/studentService";

const registerSchema = yup.object({
    name: yup.string()
        .required()
        .min(8)
        .max(40),
    mark: yup.number()
        .required()
        .test("valid-mark", "Invalid Mark", (value) => {
            if (value === undefined || value === null) return false;
            const parsedValue = parseFloat(value);
            return !isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 10; // Cho phép mark là 10
        })
        .positive("Mark must be a positive number"),
    age: yup.number()
        .required()
        .min(16)
        .max(40)
        .typeError("Please enter a valid age"),
    gender: yup.string()
        .required()
        .oneOf(["male", "female"]),
    city: yup.string()
        .required()
        .oneOf(["hue", "dn", "hcm", "hn"])
})
const AddStudentForm = (props) => {
    const [success, setSuccess] = useState(false);
    const [student, setStudent] = useState({})
    const [studentDataLoaded, setStudentDataLoaded] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "onChange",
        resolver: yupResolver(registerSchema)
    })
    useEffect(() => {
        async function getStudent() {
            const std = await StudentService.getStudent(props.id)
            setStudentDataLoaded(true)
            setStudent(std.data)
            console.log(student);
        }
        if (props.id != 1) {
            getStudent()
        }
    }, [props.id, props.action])
    console.log(props.id);
    const handleAddStudent = (data) => {
        console.log(data);
        StudentService.addStudent(data).then(() => {
            setSuccess(true)
            reset()
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        })
    }
    const handleEditStudent = (data) => {
        console.log(data);
        StudentService.editStudent(props.id, data).then(() => {
            setSuccess(true)
            reset()
            setTimeout(() => {
                setSuccess(false);
            }, 3000);

        })
    }
    const handleSubmitForm = (data) => {
        console.log(props.action);
        if (props.action == "add") {
            reset()
            console.log("add");
            handleAddStudent(data)
        } else {
            handleEditStudent(data)
        }
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Student Info</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-body">
                    {success && <div className="alert alert-success fw-bold text-center">Success!</div>}
                    <div>
                        <label className="form-label fw-bold">Name:</label>
                        <input type="text" className={`${errors?.name?.message ? 'form-control is-invalid' : 'form-control'}`} {...register("name")} defaultValue={props.action == "edit" ? student.name : ""} />
                    </div>
                    <span className="text-danger">{errors?.name?.message}</span>
                    <div>
                        <label className="form-label fw-bold">Age:</label>
                        <input type="text" className={`${errors?.age?.message ? 'form-control is-invalid' : 'form-control'}`} {...register("age")} defaultValue={props.action == "edit" ? student.age : ""} />
                    </div>
                    <span className="text-danger">{errors?.age?.message}</span>

                    <div>
                        <label className="form-label fw-bold">Mark:</label>
                        <input type="text" className={`${errors?.mark?.message ? 'form-control is-invalid' : 'form-control'}`} {...register("mark")} defaultValue={props.action == "edit" ? student.mark : ""} />
                    </div>
                    <span className="text-danger">{errors?.mark?.message}</span>
                    <div>
                        <label className="form-label fw-bold">Gender:</label>
                        <select className={`${errors?.gender?.message ? 'form-control is-invalid' : 'form-select'}`} {...register("gender")} defaultValue={student.gender}>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                        </select>
                    </div>
                    <span className="text-danger">{errors?.gender?.message}</span>
                    <div>
                        <label className="form-label fw-bold">City:</label>
                        <select className={`${errors?.city?.message ? 'form-control is-invalid' : 'form-select'}`} {...register("city")} defaultValue={student.city}>
                            <option value="hue">Huế</option>
                            <option value="dn">Đà Nẵng</option>
                            <option value="hcm">Hồ Chí Minh</option>
                            <option value="hn">Hà Nội</option>
                        </select>
                    </div>
                    <span className="text-danger">{errors?.city?.message}</span>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    )
}
export default AddStudentForm;