const express = require("express");

const app = express();

app.use(express.json());

const tasks = [
  { id: 1, title: "Task 1", description: "Task 1 description" },
  { id: 2, title: "Task 2", description: "Task 2 description" },
  { id: 3, title: "Task 3", description: "Task 3 description" },
];

app.get("/", (req, res) => {
  res.send("Welcome to node");
});

app.get("/allTasks", (req, res) => {
  res.json({ tasks });
});

app.post("/addTask", (req, res) => {
  const { id, title, description } = req.body;
  try {
    if (!id || !title || !description) {
      res.json({
        message: "Task is not valid",
      });
    }

    tasks.push({ id, title, description });
    res.json({
      message: "Task added successfully",
      updatedTask: tasks,
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/getTaskById/:id", (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.json({
        message: "id is not valid",
      });
    }
    console.log(id);
    const task = tasks.find((task) => task.id == id);
    res.json({ task });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.patch("/updateTask/:id", (req, res) => {
  const { id } = req.params;
  const { previousTitle, newTitle } = req.body;

  const task = tasks.find((task) => task.id == id);

  console.log("task is available");
  const updatedData = { id, previousTitle, newTitle };
});

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
