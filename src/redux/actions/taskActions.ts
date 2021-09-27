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
} from "./taskConstants";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { task } from "../../models/redux";

//Get Tasks list Action
export const getTasks =
  () =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    dispatch({ type: GET_TASK_REQUEST });
    return new Promise<void>((resolve) => {
      try {
        const data: task[] = JSON.parse(
          localStorage.getItem("todo-app-data") || "[]"
        );
        return dispatch({
          type: GET_TASK_SUCCESS,
          payload: { data: data, count: data.length },
        });
      } catch (error) {
        dispatch({ type: GET_TASK_ERROR });
      }
    });
  };

//Create Task Action
export const createTask =
  (taskData: task) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: CREATE_TASK_REQUEST });
    try {
      const newData = taskData as task;
      const data: task[] = JSON.parse(
        localStorage.getItem("todo-app-data") || "[]"
      );
      data.push({ ...newData });
      localStorage.removeItem("todo-app-data");
      localStorage.setItem("todo-app-data", JSON.stringify(data));
      dispatch({
        type: CREATE_TASK_SUCCESS,
        payload: {
          data: data,
          count: data.length,
        },
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: CREATE_TASK_ERROR });
    }
  };
//Update Task Action
export const updateTask =
  (taskId: number, userData: task) =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: UPDATE_TASK_REQUEST });
    try {
      const data: task[] = JSON.parse(
        localStorage.getItem("todo-app-data") || "[]"
      );
      const selectedDataIndex = data.findIndex(
        (item: task) => item.id === taskId
      );
      const updatedData: task = {
        ...data[selectedDataIndex],
        title: userData.title,
        description: userData.description,
      };
      data[selectedDataIndex] = updatedData;
      localStorage.removeItem("todo-app-data");
      localStorage.setItem("todo-app-data", JSON.stringify(data));
      dispatch({
        type: UPDATE_TASK_SUCCESS,
        payload: {
          data: data,
          count: data.length,
        },
      });
    } catch (error) {
      dispatch({ type: UPDATE_TASK_ERROR });
    }
  };
//Delete Task Action
export const deleteTask =
  (userId: number) => async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: DELETE_TASK_REQUEST });
    try {
      const data: task[] = JSON.parse(
        localStorage.getItem("todo-app-data") || "[]"
      );
      const filteredData: task[] = data.filter(
        (item: task) => item.id !== userId
      );
      if (!localStorage.getItem("todo-app-data")) {
        localStorage.setItem("todo-app-data", JSON.stringify(filteredData));
      } else {
        localStorage.removeItem("todo-app-data");
        localStorage.setItem("todo-app-data", JSON.stringify(filteredData));
      }
      dispatch({
        type: DELETE_TASK_SUCCESS,
        payload: {
          data: filteredData,
          count: filteredData.length,
        },
      });
    } catch {
      dispatch({ type: DELETE_TASK_ERROR });
    }
  };

//Drag Action
export const dragTask =
  (taskData: any, dragEventData: any) =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: DRAG_TASK_REQUEST });

    try {
      const items = Array.from(taskData);
      const [reorderedItem] = items.splice(dragEventData.source.index, 1);
      items.splice(dragEventData.destination.index, 0, reorderedItem);

      return dispatch({
        type: DRAG_TASK_SUCCESS,
        payload: { data: items, count: items.length },
      });
    } catch (error) {
      dispatch({ type: DRAG_TASK_ERROR });
    }
  };
