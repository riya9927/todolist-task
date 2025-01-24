import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { BiListUl, BiCalendar, BiStar, BiUser, BiLogOut, BiMenu } from 'react-icons/bi';
import { logout } from '../store/slices/authSlice';
import { setFilter } from '../store/slices/todoSlice';
import TaskStats from './TaskStats';

const SidebarContainer = styled.div`
  background: #2d3436;
  width: 100%;
  min-height: auto;
  padding: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media (min-width: 768px) {
    width: 300px;
    height: 100vh;
    padding: 2rem;
  }
`;

const MobileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
`;

const SidebarContent = styled.div`
  display: ${props => props.isOpen || window.innerWidth >= 768 ? 'block' : 'none'};
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #00b894;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
`;

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;
  background: ${props => props.active ? '#34495e' : 'transparent'};

  &:hover {
    background: #34495e;
  }
`;

const LogoutButton = styled(MenuItem)`
  margin-top: auto;
  color: #fc8181;
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(state => state.auth.user);
  const currentFilter = useSelector(state => state.todos.filter);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
    setIsOpen(false);
  };

  return (
    <SidebarContainer>
      <MobileHeader>
        <UserSection>
          <Avatar>
            <BiUser size={24} />
          </Avatar>
          <span>Hey, {user?.name || 'User'}</span>
        </UserSection>
        <MenuButton onClick={() => setIsOpen(!isOpen)}>
          <BiMenu />
        </MenuButton>
      </MobileHeader>

      <SidebarContent isOpen={isOpen}>
        <MenuList>
          <MenuItem 
            active={currentFilter === 'all'}
            onClick={() => handleFilterChange('all')}
          >
            <BiListUl size={20} />
            <span>All tasks</span>
          </MenuItem>
          <MenuItem 
            active={currentFilter === 'today'}
            onClick={() => handleFilterChange('today')}
          >
            <BiCalendar size={20} />
            <span>Today</span>
          </MenuItem>
          <MenuItem 
            active={currentFilter === 'important'}
            onClick={() => handleFilterChange('important')}
          >
            <BiStar size={20} />
            <span>Important</span>
          </MenuItem>
        </MenuList>

        <TaskStats />

        <LogoutButton onClick={handleLogout}>
          <BiLogOut size={20} />
          <span>Logout</span>
        </LogoutButton>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;