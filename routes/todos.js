const express = require('express');
const TodoModel = require('../models/todo.model');

const router = express.Router();

// Get all todos
router.get('/', async function (req, res) {
  try {
    const todos = await TodoModel.getTodos();
    return res.json(todos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Get todos by user ID
router.get('/user/:userId', async function (req, res) {
  try {
    const todos = await TodoModel.getTodosByUserId(req.params.userId);
    return res.json(todos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Get todo by ID
router.get('/:id', async function (req, res) {
  try {
    const todo = await TodoModel.getTodoById(req.params.id);
    
    if (todo.length === 0) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    
    return res.json(todo[0]);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Create new todo
router.post('/', async function (req, res) {
  try {
    const { user_id, title, description, due_date } = req.body;
    
    // Basic validation
    if (!user_id || !title || !due_date) {
      return res.status(400).json({ 
        error: 'user_id, title, and due_date are required' 
      });
    }

    const createTodo = await TodoModel.createTodo({
      user_id,
      title,
      description,
      due_date
    });

    return res.status(201).json({
      success: true,
      insertId: createTodo.insertId,
      message: 'Todo created successfully'
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Update todo
router.put("/:id", async function (req, res) {
  try {
    const updateTodo = await TodoModel.updateTodo(req.params.id, req.body);

    return res.json({
      success: updateTodo.affectedRows > 0,
      message: updateTodo.affectedRows > 0 ? 'Todo updated successfully' : 'Todo not found'
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Mark todo as completed
router.patch('/:id/complete', async function (req, res) {
  try {
    const result = await TodoModel.markTodoAsCompleted(req.params.id);

    return res.json({
      success: result.affectedRows > 0,
      message: result.affectedRows > 0 ? 'Todo marked as completed' : 'Todo not found'
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Mark todo as incomplete
router.patch('/:id/incomplete', async function (req, res) {
  try {
    const result = await TodoModel.markTodoAsIncomplete(req.params.id);

    return res.json({
      success: result.affectedRows > 0,
      message: result.affectedRows > 0 ? 'Todo marked as incomplete' : 'Todo not found'
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Delete todo
router.delete('/:id', async function (req, res) {
  try {
    const deleteTodo = await TodoModel.deleteTodo(req.params.id);

    res.json({
      success: deleteTodo.affectedRows > 0,
      message: deleteTodo.affectedRows > 0 ? 'Todo deleted successfully' : 'Todo not found'
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
