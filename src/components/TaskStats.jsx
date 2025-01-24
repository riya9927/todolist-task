import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatsContainer = styled.div`
  padding: 1rem;
  margin-top: 2rem;
`;

const ChartWrapper = styled.div`
  margin-bottom: 2rem;
  background: #34495e;
  padding: 1rem;
  border-radius: 8px;
`;

const TaskStats = () => {
  const tasks = useSelector(state => state.todos.tasks);

  const completionData = {
    labels: ['Completed', 'Remaining'],
    datasets: [{
      data: [
        tasks.filter(task => task.completed).length,
        tasks.filter(task => !task.completed).length
      ],
      backgroundColor: ['#00b894', '#fc8181'],
      borderColor: ['#00a884', '#fc7171'],
      borderWidth: 1,
    }]
  };

  const priorityData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [{
      data: [
        tasks.filter(task => task.priority === 'high').length,
        tasks.filter(task => task.priority === 'medium').length,
        tasks.filter(task => task.priority === 'low').length
      ],
      backgroundColor: ['#fc8181', '#f6e05e', '#68d391'],
      borderColor: ['#fc7171', '#f6d04e', '#68c381'],
      borderWidth: 1,
    }]
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#fff',
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <StatsContainer>
      <ChartWrapper>
        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Task Completion</h3>
        <div style={{ height: '200px' }}>
          <Pie data={completionData} options={options} />
        </div>
      </ChartWrapper>
      <ChartWrapper>
        <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Task Priority</h3>
        <div style={{ height: '200px' }}>
          <Pie data={priorityData} options={options} />
        </div>
      </ChartWrapper>
    </StatsContainer>
  );
};

export default TaskStats;