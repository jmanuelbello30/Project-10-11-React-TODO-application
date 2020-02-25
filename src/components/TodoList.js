import React, { Component } from 'react'

class MyTodoList extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      counter: 0
    }
  }

  getMyUser() {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/josemanuelb')
      .then(response => {
        if (response.ok === true) {
          this.getallMyTodos()
        } else {
          this.createMyUser()
        }
      })
  }

  createMyUser() {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/josemanuelb', {
      method: "POST",
      body: JSON.stringify([]),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
  }

  getallMyTodos() {
    fetch('https://assets.breatheco.de/apis/fake/todos/user/josemanuelb', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        let counter_todo = 0;

        if (data.length > 1) {
          counter_todo = data.length - 1;
        }

        this.setState({
          todos: data,
          counter: counter_todo
        })
      })
  }

  addTodo = (e) => {

    if (e.key === "Enter" && e.target.value !== '') {
      let newState = Object.assign({}, this.state);
      newState.todos.push({ label: e.target.value, done: false });

      fetch('https://assets.breatheco.de/apis/fake/todos/user/josemanuelb', {
        method: "PUT",
        body: JSON.stringify(newState.todos.map((item => item))),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.getallMyTodos()
        })

      e.target.value = '';
    }
  }

  deleteTodo = (e) => {

    let newState = Object.assign({}, this.state);
    if (newState.todos.length < 2) {
      this.deleteAllTasksInTodo();
    } else {
      newState.todos.splice(e, 1);

      fetch('https://assets.breatheco.de/apis/fake/todos/user/josemanuelb', {
        method: "PUT",
        body: JSON.stringify(newState.todos.map((item => item))),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.getallMyTodos()
        })
    }
  }

  deleteAllTasksInTodo = (e) => {

    let newState = Object.assign({}, this.state);
    newState.todos.splice(0, newState.todos.length)

    fetch('https://assets.breatheco.de/apis/fake/todos/user/josemanuelb', {
      method: "PUT",
      body: JSON.stringify([{ 'label': 'Empty list', 'done': false }]),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.getallMyTodos();
      })
  }

  componentDidMount() {
    this.getMyUser()
  }

  render() {
    return (
      <>
        <ul className="content">
          <input className="formcontrol" type='text' placeholder='Add a new task to the list' onKeyPress={(e) => this.addTodo(e)} />

          {this.state.todos.map((item, i) => {

            if (item.label !== "Empty list") {
              return <li className="list-group-item" key={i}>Pending to do - {item.label}<i className="fas fa-times hoverChange" onClick={(e) => this.deleteTodo(i)} /></li>
            } else {
              return ""
            }
          })
        }

          <div className="list-group-item">{this.state.counter} items left <button type="button" className="btn btn-outline-danger" onClick={(e) => this.deleteAllTasksInTodo(e)}>Delete All Tasks</button>
          </div>

        </ul>
      </>
    );
  }
}

export default MyTodoList;
