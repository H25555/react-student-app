import axios from "axios";

class StudentService {
    static getStudents(page) {
        return axios.get(`https://js-post-api.herokuapp.com/api/students?_page=${page}`)
    }
    static addStudent(student) {
       return  axios.post("https://js-post-api.herokuapp.com/api/students", student)
    }
}
export default StudentService;