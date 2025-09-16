const express = require('express');
const router = express.Router();
const {
    getTask, 
    getTasks, 
    updateTask, 
    createTask, 
    deleteTask
} = require("../controllers/tasks");

router.get("/", getTasks);

// create a new task
router.post("/", createTask);


// Get a single task
router.get("/:id", getTask);

// Update a single task

router.patch("/:id", updateTask);

//  delete a task
router.delete("/:id", deleteTask);

module.exports = router;