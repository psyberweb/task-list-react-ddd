import React from 'react';
//import './App.css';
import { TaskList } from './ui/components/tasks/TaskList';
import UserList from './ui/components/users/UserList';

function App() {
  const [menuActive, setMenuActive] = React.useState('tasks');
  return (
    <div className="App">
      <header className="App-header">
        <h1>Task List App</h1>
        <menu>
          <ul className='menu'>
            <li>
              <a href="#tasks" onClick={()=>{setMenuActive('tasks')}}>Tasks</a>
            </li>
            <li>
              <a href="#users" onClick={()=>{setMenuActive('users')}}>Users</a>
            </li>
          </ul>
        </menu>
      </header>
      <main>
        {menuActive === 'tasks' && <TaskList />}
        {menuActive === 'users' && <UserList />}
      </main>
      <footer>
        <p>Task List App</p>
      </footer>
    </div>
  );
}

export default App;
