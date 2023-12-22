import axios from "axios";

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "/"
      : "https://teriser.codrest.com",
  withCredentials: true,
});

const findProjectById = (id) => client.get(`/projects/${id}`);
const addProject = (request) => client.post("/projects", request);
const editProject = (id, request) => client.patch(`/project/${id}`, request);
const removeProject = (id) => client.delete(`/project/${id}`);

const findAllItems = () => client.get("/store/items");
const findItemById = (id) => client.get(`/store/items/${id}`);

const findAllPointCards = () => client.get("/store/point");

const requestPayment = (request) => client.post("/store/payments", request);

module.exports = {
  findProjectById,
  addProject,
  editProject,
  removeProject,
  findAllItems,
  findItemById,
  findAllPointCards,
  requestPayment,
};
