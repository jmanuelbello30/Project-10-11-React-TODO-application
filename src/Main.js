import React from 'react';
import MyTodoList from './components/TodoList';

function Main() {

  return (
    <div>
      <nav className=" navbar navbar-light">
        <span className="unique-title">My To-do List     <i className="fas fa-clipboard-list"></i></span>
      </nav>
      <div className="container">
        <div className="separate" >
          <MyTodoList/>
        </div>
      </div>
    </div>
  );
}

export default Main;