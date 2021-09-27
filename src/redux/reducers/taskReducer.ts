import {
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  GET_TASK_ERROR,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_ERROR,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  DRAG_TASK_REQUEST,
  DRAG_TASK_SUCCESS,
  DRAG_TASK_ERROR,  
} from "../actions/taskConstants";
import { taskState, taskAction } from '../../models/redux';

const initialState: taskState = {
  error: false,
  data : undefined
};
const taskReducer = (state: taskState = initialState, action: taskAction): taskState => {
  switch (action.type) {
    case GET_TASK_REQUEST:
      return state;
    case GET_TASK_SUCCESS:
      return {
        ...state,
        error: false,
        data: {
          data: action.payload.data,
          count: action.payload.count,        
        }
      };
    case GET_TASK_ERROR:
      return {
        ...state,
        error: true,
        data: "Error, Couldn't load data.",
      };
    case CREATE_TASK_REQUEST:
      return state;
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        error: false,
        data: {
          data: action.payload.data,
          count: action.payload.count,
        }
      };
    case CREATE_TASK_ERROR:
      return {
        ...state,
        error: true,
        data: "Error, Couldn't create new task."
      };
    case UPDATE_TASK_REQUEST:
      return state;
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        error: false,
        data: {
          data: action.payload.data,
          count: action.payload.count,
        }
      };
    case UPDATE_TASK_ERROR:
      return {
        ...state,
        error: true,
        data: "Error, Couldn't update task."
      };
    case DELETE_TASK_REQUEST:
      return state;
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        error: false,
        data: {
          data: action.payload.data,
          count: action.payload.count
        }
      };
    case DELETE_TASK_ERROR:
      return {
        ...state,
        error: true,
        data: "Error, Couldn't delete task"
      };
    case DRAG_TASK_REQUEST:
      return state;
    case DRAG_TASK_SUCCESS:
      return {
        ...state,
        error: false,
        data: {
          data: action.payload.data,
          count: action.payload.count
        }
      }
    case DRAG_TASK_ERROR:
      return {
        ...state,
        error: true,
        data: "Error, Something went wrong"
      }
    default:
      return state;
  }
};
export default taskReducer;
