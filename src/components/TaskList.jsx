import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { toggleTask, deleteTask, updateTaskPriority, toggleImportant, editTask } from '../store/slices/todoSlice';
import { BiTrash, BiStar, BiEdit } from 'react-icons/bi';
import { MdOutlinePriorityHigh } from 'react-icons/md';
import { format, isToday } from 'date-fns';

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
  border-left: 4px solid ${props => {
    switch (props.priority) {
      case 'high': return '#fc8181';
      case 'medium': return '#f6e05e';
      case 'low': return '#68d391';
      default: return '#4a5568';
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
  margin-bottom: 0.5rem;

  @media (min-width: 480px) {
    margin-bottom: 0;
  }
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #00b894;
  flex-shrink: 0;
`;

const TaskText = styled.span`
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
  color: ${props => props.completed ? '#b2bec3' : 'white'};
  flex: 1;
  word-break: break-word;
`;

const TaskInput = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid #4a5568;
  color: white;
  font-size: 1rem;
  padding: 0.25rem;
  width: 100%;
  &:focus {
    outline: none;
    border-bottom-color: #00b894;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  flex-wrap: wrap;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.active ? '#f6e05e' : '#b2bec3'};
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: ${props => {
      if (props.delete) return '#fc8181';
      if (props.edit) return '#00b894';
      return '#f6e05e';
    }};
  }
`;

const PriorityIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  background: ${props => {
    switch (props.priority) {
      case 'high': return '#fc818133';
      case 'medium': return '#f6e05e33';
      case 'low': return '#68d39133';
      default: return '#4a556833';
    }
  }};
  color: ${props => {
    switch (props.priority) {
      case 'high': return '#fc8181';
      case 'medium': return '#f6e05e';
      case 'low': return '#68d391';
      default: return '#4a5568';
    }
  }};
`;

const DueDate = styled.span`
  font-size: 0.75rem;
  color: #b2bec3;
  margin-left: 0.5rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem;
  color: #b2bec3;
`;

const TaskList = () => {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const tasks = useSelector(state => state.todos.tasks);
  const filter = useSelector(state => state.todos.filter);
  const dispatch = useDispatch();

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'important':
        return task.important;
      case 'today':
        return task.dueDate && isToday(new Date(task.dueDate));
      default:
        return true;
    }
  });

  if (filteredTasks.length === 0) {
    return (
      <EmptyState>
        <p>No tasks yet. Add your first task above!</p>
      </EmptyState>
    );
  }

  const handlePriorityClick = (taskId, currentPriority) => {
    const priorities = ['low', 'medium', 'high'];
    const currentIndex = priorities.indexOf(currentPriority);
    const nextPriority = priorities[(currentIndex + 1) % priorities.length];
    dispatch(updateTaskPriority({ id: taskId, priority: nextPriority }));
  };

  const startEditing = (task) => {
    setEditingId(task.id);
    setEditText(task.text);
  };

  const handleEditSubmit = (taskId) => {
    if (editText.trim()) {
      dispatch(editTask({ id: taskId, text: editText }));
    }
    setEditingId(null);
    setEditText('');
  };

  return (
    <List>
      {filteredTasks.map(task => (
        <Task key={task.id} priority={task.priority}>
          <TaskContent>
            <Checkbox
              type="checkbox"
              checked={task.completed}
              onChange={() => dispatch(toggleTask(task.id))}
            />
            {editingId === task.id ? (
              <TaskInput
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => handleEditSubmit(task.id)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleEditSubmit(task.id);
                  }
                }}
                autoFocus
              />
            ) : (
              <TaskText completed={task.completed}>
                {task.text}
                {task.dueDate && (
                  <DueDate>
                    Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                  </DueDate>
                )}
              </TaskText>
            )}
          </TaskContent>
          <ActionButtons>
            <IconButton
              onClick={() => dispatch(toggleImportant(task.id))}
              active={task.important}
              title={task.important ? 'Remove from important' : 'Mark as important'}
            >
              <BiStar size={20} />
            </IconButton>
            <IconButton
              edit
              onClick={() => startEditing(task)}
              title="Edit task"
            >
              <BiEdit size={20} />
            </IconButton>
            <PriorityIndicator
              priority={task.priority}
              onClick={() => handlePriorityClick(task.id, task.priority)}
              style={{ cursor: 'pointer' }}
            >
              <MdOutlinePriorityHigh size={14} />
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </PriorityIndicator>
            <IconButton
              delete
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