import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import StudentService from "../../service/studentService";

const registerSchema = yup.object({
    name: yup.string()
        .required()
        .min(8)
        .max(40),
    mark: yup.mixed()
        .required()
        .test("valid-mark", "Invalid Mark", (value) => {
            if (value === undefined || value === null) return false;
            const parsedValue = parseFloat(value);
            return !isNaN(parsedValue) && /^\d+(\.\d{1})?$/.test(value);
        }),
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
const AddStudentForm = () => {
    const [success, setSuccess] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: "onChange",
        resolver: yupResolver(registerSchema)
    })
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
    return (
        <div className="container">
            <form onSubmit={handleSubmit(handleAddStudent)}>
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Student Info</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                
                <div className="modal-body">
                {success && <div className="alert alert-success fw-bold text-center">Success!</div>}
                    <div>
                        <label className="form-label fw-bold">Name:</label>
                        <input type="text" className={`${errors?.name?.message ? 'form-control is-invalid' : 'form-control'}`} {...register("name")} />
                    </div>
                    <span className="text-danger">{errors?.name?.message}</span>
                    <div>
                        <label className="form-label fw-bold">Age:</label>
                        <input type="text" className={`${errors?.age?.message ? 'form-control is-invalid' : 'form-control'}`} {...register("age")} />
                    </div>
                    <span className="text-danger">{errors?.age?.message}</span>

                    <div>
                        <label className="form-label fw-bold">Mark:</label>
                        <input type="text" className={`${errors?.mark?.message ? 'form-control is-invalid' : 'form-control'}`} {...register("mark")} />
                    </div>
                    <span className="text-danger">{errors?.mark?.message}</span>
                    <div>
                        <label className="form-label fw-bold">Gender:</label>
                        <select className={`${errors?.gender?.message ? 'form-control is-invalid' : 'form-select'}`} {...register("gender")}>
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                        </select>
                    </div>
                    <span className="text-danger">{errors?.gender?.message}</span>
                    <div>
                        <label className="form-label fw-bold">City:</label>
                        <select className={`${errors?.city?.message ? 'form-control is-invalid' : 'form-select'}`} {...register("city")}>
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