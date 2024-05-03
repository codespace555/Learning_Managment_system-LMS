import { api } from "../axios/axios";


class course {
    getCourse =  async() => {
        try {
            const resp = await api({
                url: "course/getallCourse",
                method: "get",
                headers: {
                    "content-type": "application/json",
                },
            });
            if (resp) {
                return resp?.data;
            } else {
                return resp?.data;
            }
        } catch (error) {
            throw error.response?.data.errors;
        }
    };
    }

const courses = new course()
export default courses