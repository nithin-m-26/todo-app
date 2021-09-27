import { Grid, Card, TextField, CardContent, Button } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, task } from "../models/redux";
import { createTask, getTasks } from "../redux/actions/taskActions";
import { sortByProperty } from "../services/sort";

const emptyFormData: task = {
  id: 0,
  title: "",
  description: "",
};

function TaskEntry() {
  const [formData, setFormData] = useState<task>(emptyFormData);
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);
  const { data } = tasks;

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);
  
  const handleChange = (event: ChangeEvent<any>, fieldName: string) => {
    event.preventDefault();
    const value = event.target.value;
    setFormData((prevState) => ({ ...prevState, [fieldName]: value }));
  };  

  const addTask = () => {
    if (data.data.length !== 0) {
      const sortedData = data.data.sort(sortByProperty("id"));
      const lastId = sortedData[data.count - 1].id;
      const newId = lastId + 1;
      dispatch(createTask({ ...formData, id: newId }));
    } else {
      dispatch(createTask({ ...formData, id: 1 }));
    }
  };

  return (
    <>
      <Grid item md={12}>
        <Card variant="outlined" sx={{ m: 1 }}>
          <CardContent sx={{ textAlign: "right" }}>
            <TextField
              id="title"
              label="Title"
              variant="outlined"
              sx={{ width: "100%", mb: 1.5 }}
              value={formData.title}
              onChange={(e) => handleChange(e, "title")}
            />
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              sx={{ width: "100%", mb: 1.5 }}
              value={formData.description}
              onChange={(e) => handleChange(e, "description")}
            />
            <Button variant="contained" onClick={() => addTask()}>ADD TASK</Button>
          </CardContent>
        </Card>
      </Grid>
    </>
  );
}

export default TaskEntry;
