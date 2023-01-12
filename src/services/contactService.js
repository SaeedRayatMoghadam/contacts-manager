import axios from "axios";

const SERVER_URL = "http://localhost:9000";


export const getAllContacts = async () => {
    let url = `${SERVER_URL}/contacts`;
    return axios.get(url);
}

export const getContact = async (id) => {
    let url = `${SERVER_URL}/contacts/${id}`;
    return axios.get(url);
}

export const getAllGroups = async () => {
    let url = `${SERVER_URL}/groups`;
    return axios.get(url);
}

export const getGroup = async (id) => {
    let url = `${SERVER_URL}/groups/${id}`;
    return axios.get(url);
}

export const createContact = async (contact) => {
    let url = `${SERVER_URL}/contacts`;
    return axios.post(url,contact);
}

export const updateContact = async (contact, id) => {
    let url = `${SERVER_URL}/contacts/${id}`;
    return axios.put(url, contact);
}

export const deleteContact = async (id) => {
    let url = `${SERVER_URL}/contacts/${id}`;
    return axios.delete(url);
}