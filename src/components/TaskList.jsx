import TaskItem from './TaskItem'
import './TaskList.css'

export default function TaskList({ tasks, onToggle, onDelete, isLoading }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>No tasks yet. Add one to get started!</p>
      </div>
    )
  }

  const activeTasks = tasks.filter((t) => !t.completed)
  const completedTasks = tasks.filter((t) => t.completed)

  return (
    <div className="task-list">
      {activeTasks.length > 0 && (
        <section className="task-section">
          <h2 className="section-title">Active Tasks</h2>
          <div className="tasks">
            {activeTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                isLoading={isLoading}
              />
            ))}
          </div>
        </section>
      )}

      {completedTasks.length > 0 && (
        <section className="task-section">
          <h2 className="section-title">Completed</h2>
          <div className="tasks">
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onDelete}
                isLoading={isLoading}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
