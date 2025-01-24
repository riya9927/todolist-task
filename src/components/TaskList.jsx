import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { toggleTask, deleteTask, updateTaskPriority, toggleImportant } from '../store/slices/todoSlice';
import { BiTrash, BiStar, BiEdit } from 'react-icons/bi';
import { MdOutlinePriorityHigh } from 'react-icons/md';

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const Task = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: #2d3436;
  border-radius: 8px;
  color: white;
  border-left: 4px solid ${(props) => {
    switch (props.$priority) {
      case 'high':
        return '#fc8181';
      case 'medium':
        return '#f6e05e';
      case 'low':
        return '#68d391';
      default:
        return '#4a5568';
    }
  }};

  @media (min-width: 480px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const TaskContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #00b894;
  flex-shrink: 0;
`;

const TaskText = styled.span`
  text-decoration: ${(props) => (props.$completed ? 'line-through' : 'none')};
  color: ${(props) => (props.$completed ? '#b2bec3' : 'white')};
  flex: 1;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => (props.$active ? '#f6e05e' : '#b2bec3')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${(props) => {
      if (props.$delete) return '#fc8181';
      if (props.$edit) return '#00b894';
      return '#f6e05e';
    }};
  }
`;

const PriorityIndicator = styled.div`
  padding: 0.25rem 0.5rem;
  background: ${(props) => {
    switch (props.$priority) {
      case 'high':
        return '#fc818133';
      case 'medium':
        return '#f6e05e33';
      case 'low':
        return '#68d39133';
      default:
        return '#4a556833';
    }
  }};
  color: ${(props) => {
    switch (props.$priority) {
      case 'high':
        return '#fc8181';
      case 'medium':
        return '#f6e05e';
      case 'low':
        return '#68d391';
      default:
        return '#4a5568';
    }
  }};
`;

const TaskList = () => {
  const tasks = useSelector((state) => state.todos.tasks);
  const filter = useSelector((state) => state.todos.filter);
  const dispatch = useDispatch();

  // Filter tasks based on the current filter value
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'important') return task.important; // Show only important tasks
    if (filter === 'today') {
      const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
      return task.dueDate === today;
    }
    return true; // Default case: show all tasks
  });

  if (filteredTasks.length === 0) {
    return <div>No tasks found for the selected filter.</div>;
  }

  return (
    <List>
      {filteredTasks.map((task) => (
        <Task key={task.id} $priority={task.priority}>
          <TaskContent>
            <Checkbox
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTask(task.id))}
            />
            <TaskText $completed={task.completed}>{task.text}</TaskText>
          </TaskContent>
          <ActionButtons>
            <IconButton
              onClick={() => dispatch(toggleImportant(task.id))}
              $active={task.important}
              title={task.important ? 'Remove from important' : 'Mark as important'}
            >
              <BiStar size={20} />
            </IconButton>
            <IconButton
              $edit
              onClick={() => console.log('Edit Task')}
              title="Edit task"
            >
              <BiEdit size={20} />
            </IconButton>
            <PriorityIndicator
              $priority={task.priority}
              onClick={() =>
                dispatch(updateTaskPriority({ id: task.id, priority: 'medium' }))
              }
            >
              <MdOutlinePriorityHigh size={14} />
              {task.priority}
            </PriorityIndicator>
            <IconButton
              $delete
              onClick={() => dispatch(deleteTask(task.id))}
              title="Delete task"
            >
              <BiTrash size={20} />
            </IconButton>
          </ActionButtons>
        </Task>
      ))}
    </List>
  );
};

export default TaskList;
