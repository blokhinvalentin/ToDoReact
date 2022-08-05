import axios from 'axios';
import { url } from '../../src/components/constants';

export const getTasks = async () => await axios.get(url);

export const addTask = async (text) => await axios.post(url, { text });

export const deleteTask = async (id) => await axios.delete(`${url}/${id}`);

export const changeCheckbox = async (id, check) => await axios.patch(`${url}/${id}/checkbox`, { isCheck: !check });

export const confirmTaskEditing = async (id, text) => await axios.patch(`${url}/${id}`, { text });