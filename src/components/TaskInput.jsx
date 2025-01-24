import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/slices/todoSlice';
import { BiCalendar } from 'react-icons/bi';
import { MdOutlinePriorityHigh } from 'react-icons/md';
import { WeatherWidget } from './WeatherWidget';

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

const WeatherInfo = styled.div`
  color: white;
  font-size: 0.9rem;
  margin-bottom: 1rem;
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

const PriorityButton = styled.button`
  background: ${(props) => {
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
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
`;

const AddButton = styled.button`
  background: #00b894;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #00a884;
  }
`;

const TaskInput = () => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await  WeatherWidget();
        setWeather(data);
      } catch (err) {
        setError('Unable to fetch weather data. Please try again later.');
      }
    };
    fetchWeather();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(
        addTask({
          text,
          priority,
          dueDate: dueDate || null,
        })
      );
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

  return (
    <InputContainer>
      {weather && (
        <WeatherInfo>
          <strong>Current Weather:</strong> {weather.description}, {weather.temp}°C
        </WeatherInfo>
      )}
      {error && <WeatherInfo style={{ color: '#fc8181' }}>{error}</WeatherInfo>}
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task"
        />
        <ButtonGroup>
          <PriorityButton
            type="button"
            $priority={priority}
            onClick={togglePriority}
          >
            <MdOutlinePriorityHigh size={16} />
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </PriorityButton>
          <AddButton type="submit">Add Task</AddButton>
        </ButtonGroup>
      </Form>
    </InputContainer>
  );
};

export default TaskInput;
