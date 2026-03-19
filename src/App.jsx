import { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { tasksService } from './services/supabase'
import './App.css'

export default function App() {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await tasksService.getTasks()
      setTasks(data)
    } catch (err) {
      setError('Failed to load tasks')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTask = async (task) => {
    try {
      setIsLoading(true)
      const newTask = await tasksService.createTask(task)
      setTasks([newTask, ...tasks])
    } catch (err) {
      setError('Failed to add task')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleTask = async (id, completed) => {
    try {
      await tasksService.updateTask(id, { completed })
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, completed } : task
        )
      )
    } catch (err) {
      setError('Failed to update task')
      console.error(err)
    }
  }

  const handleDeleteTask = async (id) => {
    try {
      await tasksService.deleteTask(id)
      setTasks(tasks.filter((task) => task.id !== id))
    } catch (err) {
      setError('Failed to delete task')
      console.error(err)
    }
  }

  const stats = {
    total: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  }

  return (
    <div className="app">
      <div className="app-container">
        <header className="app-header">
          <div>
            <h1>Tasks</h1>
            <p className="header-subtitle">
              {stats.active} active · {stats.completed} completed
            </p>
          </div>
        </header>

        {error && <div className="error-message">{error}</div>}

        <TaskForm onSubmit={handleAddTask} isLoading={isLoading} />

        {isLoading && tasks.length === 0 ? (
          <div className="loading">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={tasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  )
}
