import axios from "axios";
import '../../src/components/constants';
import { url } from "../../src/components/constants";

const getTasks = async () => await axios.get(url);

const addTask = async (text) => await axios.post(url, { text });

const deleteTask = async (id) => await axios.delete(`${url}/${id}`);

const changeCheckbox = async (id, check) => await axios.patch(`${url}/${id}/checkbox`, { isCheck: !check });

const confirmTaskEditing = async (id, text) => await axios.patch(`${url}/${id}/text`, { text: text });

export {
  getTasks,
  addTask,
  deleteTask,
  changeCheckbox,
  confirmTaskEditing
}