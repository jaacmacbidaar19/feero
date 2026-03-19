import { useState } from 'react'
import './TaskForm.css'

export default function TaskForm({ onSubmit, isLoading }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    onSubmit({
      title: title.trim(),
      description: description.trim() || null,
      priority,
      completed: false,
    })

    setTitle('')
    setDescription('')
    setPriority('medium')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div className="form-row">
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
          rows="2"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          disabled={isLoading}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={isLoading || !title.trim()}
        className="btn-primary"
      >
        {isLoading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  )
}
