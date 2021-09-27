import { Grid, Card } from "@mui/material";
import TaskItem from "./TaskItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState, task } from "../models/redux";
import { useEffect } from "react";
import { dragTask, getTasks } from "../redux/actions/taskActions";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function TaskContainer() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);
  const { data, error } = tasks;

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleDragEnd = (resultData: any) => {
    if (!resultData.destination) return;
    dispatch(dragTask(data.data, resultData));
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <Grid
              item
              xs={12}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {error ? (
                <Card variant="outlined">{error}</Card>
              ) : (
                data &&
                data.data.map((taskEl: task, key: number) => (
                  <Draggable
                    key={taskEl.id}
                    draggableId={taskEl.id.toString()}
                    index={key}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TaskItem task={taskEl}></TaskItem>
                      </div>
                    )}
                  </Draggable>
                ))
              )}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}

export default TaskContainer;
