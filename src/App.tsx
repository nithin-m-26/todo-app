import { Grid, Container, Card, Typography } from "@mui/material";
import TaskContainer from "./components/TaskContainer";
import TaskEntry from "./components/TaskEntry";

function App() {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <Card variant="outlined">
          <Grid container>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Typography
                sx={{ fontSize: 25, mt: 2 }}
                color="text.primary"
                gutterBottom
              >
                TO DO APP
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <TaskEntry></TaskEntry>
          </Grid>
          <Grid container>
            <TaskContainer></TaskContainer>
          </Grid>
        </Card>
      </Container>
    </div>
  );
}

export default App;
