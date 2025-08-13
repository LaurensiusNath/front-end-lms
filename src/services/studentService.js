import { apiInstanceAuth } from "../utils/axios";

export const getStudents = async () =>
  apiInstanceAuth.get("/students").then((res) => res.data);

export const getStudentDetail = async (id) =>
  apiInstanceAuth.get(`/students/${id}`).then((res) => res.data);

export const createStudent = async (data) =>
  await apiInstanceAuth
    .post("/students", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);

export const updateStudent = async (data, id) =>
  await apiInstanceAuth
    .put(`/students/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => res.data);

export const deleteStudent = async (id) =>
  await apiInstanceAuth.delete(`/students/${id}`).then((res) => res.data);

export const getCoursesByStudentId = async () =>
  apiInstanceAuth.get("/students/courses").then((res) => res.data);
