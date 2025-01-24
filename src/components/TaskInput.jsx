import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addTask } from '../store/slices/todoSlice';
import { BiBell, BiCalendar } from 'react-icons/bi';
import { MdOutlinePriorityHigh } from 'react-icons/md';

const InputContainer = styled.div`
  background: #2d3436;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  background: transparent;
  border: none;
  color: white;
  font-size: 1rem;
  padding: 0.5rem;
  width: 100%;
  &::placeholder {
    color: #b2bec3;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 480px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const IconGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  color: #b2bec3;
  flex-wrap: wrap;
  align-items: center;

  @media (min-width: 480px) {
    gap: 1rem;
  }
`;

const PriorityButton = styled.button`
  background: ${props => {
    switch (props.priority) {
      case 'high': return '#fc8181';
      case 'medium': return '#f6e05e';
      case 'low': return '#68d391';
      default: return '#4a5568';
    }
  }};
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  flex-shrink: 0;
`;

const DateInput = styled.input`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  width: 0;
  padding: 0;
  opacity: 0;
  position: absolute;

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    filter: invert(1);
  }
`;

const DateButton = styled.button`
  background: none;
  border: none;
  color: #b2bec3;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  padding: 0.5rem;
  border-radius: 4px;

  &:hover {
    background: #34495e;
  }
`;

const AddButton = styled.button`
  background: #00b894;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;

  @media (min-width: 480px) {
    width: auto;
  }

  &:hover {
    background: #00a884;
  }
`;

const TaskInput = () => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTask({ 
        text, 
        priority,
        dueDate: dueDate || null
      }));
      setText('');
      setPriority('medium');
      setDueDate('');
    }
  };

  const togglePriority = () => {
    const priorities = ['low', 'medium', 'high'];
    const currentIndex = priorities.indexOf(priority);
    const nextIndex = (currentIndex + 1) % priorities.length;
    setPriority(priorities[nextIndex]);
  };

  const getPriorityLabel = () => {
    return priority.charAt(0).toUpperCase() + priority.slice(1);
  };

  return (
    <InputContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <ButtonGroup>
          <IconGroup>
            <PriorityButton
              type="button"
              priority={priority}
              onClick={togglePriority}
            >
              <MdOutlinePriorityHigh size={16} />
              {getPriorityLabel()}
            </PriorityButton>
            <DateButton>
              <BiCalendar size={20} />
              <DateInput
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </DateButton>
          </IconGroup>
          <AddButton type="submit">ADD TASK</AddButton>
        </ButtonGroup>
      </Form>
    </InputContainer>
  );
};

export default TaskInput;