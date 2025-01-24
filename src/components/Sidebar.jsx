const SidebarContainer = styled.div`
  background: linear-gradient(135deg, #1e3a8a, #2d3436);
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

  &:hover {
    color: #00b894;
  }
`;

const SidebarContent = styled.div`
  display: ${props => (props.isOpen || window.innerWidth >= 768 ? 'block' : 'none')};
  transition: all 0.3s ease-in-out;

  @media (min-width: 768px) {
    display: block;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;

  span {
    font-size: 1.1rem;
    font-weight: 500;
  }
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #00b894;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
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
  transition: background-color 0.3s, box-shadow 0.3s;
  background: ${props => (props.active ? '#34495e' : 'transparent')};

  &:hover {
    background: #34495e;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  span {
    font-size: 1rem;
    font-weight: 500;
  }

  svg {
    color: ${props => (props.active ? '#00b894' : 'white')};
  }
`;

const LogoutButton = styled(MenuItem)`
  margin-top: auto;
  color: #fc8181;

  &:hover {
    background: #e74c3c;
    color: white;
  }
`;

const TaskStatsContainer = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  text-align: center;
  color: #b8c1c8;
  font-size: 0.9rem;

  h3 {
    margin: 0;
    color: white;
    font-size: 1.2rem;
  }
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

        <TaskStatsContainer>
          <h3>Task Stats</h3>
          <p>Completed: 5</p>
          <p>Pending: 3</p>
        </TaskStatsContainer>

        <LogoutButton onClick={handleLogout}>
          <BiLogOut size={20} />
          <span>Logout</span>
        </LogoutButton>
      </SidebarContent>
    </SidebarContainer>
  );
};

export default Sidebar;
