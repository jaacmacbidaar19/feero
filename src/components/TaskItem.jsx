import { useState } from 'react'
import './TaskItem.css'

const priorityLabels = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
}

const priorityColors = {
  low: '#10b981',
  medium: '#f59e0b',
  high: '#ef4444',
}

export default function TaskItem({ task, onToggle, onDelete, isLoading }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onDelete(task.id)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id, !task.completed)}
          disabled={isLoading}
        />
      </div>
      <div className="task-content">
        <h3 className="task-title">{task.title}</h3>
        {task.description && <p className="task-description">{task.description}</p>}
      </div>
      <div className="task-meta">
        <span
          className="priority-badge"
          style={{ '--priority-color': priorityColors[task.priority] }}
        >
          {priorityLabels[task.priority]}
        </span>
      </div>
      <button
        className="btn-delete"
        onClick={handleDelete}
        disabled={isDeleting || isLoading}
        aria-label="Delete task"
      >
        ×
      </button>
    </div>
  )
}
