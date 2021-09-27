export type actionConstant = string;

export interface task {
  id: number;
  title: string;
  description: string;
}

export interface RootState { 
    tasks: taskState;
}

export interface taskState {
  error: boolean;
  data: any;
}

export interface taskAction {
  type: actionConstant;
  payload: { data: task[]; count: number };
}
