import {
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { DeleteForeverOutlined, EditOutlined } from "@mui/icons-material";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { task } from "../models/redux";
import { deleteTask, updateTask } from "../redux/actions/taskActions";

interface Props {
  task: task;
}

const TaskItem = ({ task }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<task>(task);
  const dispatch = useDispatch();

  const handleChange = (event: ChangeEvent<any>, fieldName: string) => {
    event.preventDefault();
    const value = event.target.value;
    setFormData((prevState) => ({ ...prevState, [fieldName]: value }));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id));
  };

  const handleUpdate = (id: number) => {
    dispatch(updateTask(id, formData));
    setEditMode(false);
  };

  return (
    <div>
      <Card variant="outlined" sx={{ m: 1 }}>
        <Grid container>
          <Grid item xs={9}>
            {!editMode ? (
              <CardContent>
                <Typography
                  sx={{ fontSize: 16 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {task.title}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  {task.description}
                </Typography>
              </CardContent>
            ) : (
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
                <Button
                  variant="outlined"
                  sx={{ mr: 2 }}
                  onClick={() => setEditMode(false)}
                >
                  CANCEL
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleUpdate(task.id)}
                >
                  UPDATE
                </Button>
              </CardContent>
            )}
          </Grid>
          <Grid item xs={3} style={{ marginTop: "30px", textAlign: "center" }}>
            <Grid container>
              <Grid item xs={6}>
                <div onClick={() => setEditMode(true)}>
                  <EditOutlined
                    sx={{ cursor: "pointer", color: "gray" }}
                  ></EditOutlined>
                </div>
              </Grid>
              <Grid item xs={6}>
                <div onClick={() => handleDelete(task.id)}>
                  <DeleteForeverOutlined
                    sx={{ cursor: "pointer", color: "red" }}
                  ></DeleteForeverOutlined>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default TaskItem;
