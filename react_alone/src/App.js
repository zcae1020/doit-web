import React from 'react';
import './App.css';
import ToDoList from './toDoList';

class App extends React.Component{
  componentDidMount(){
    const name = document.querySelector(".name");
    const nameInput = name.querySelector("input");
    const greeting = document.querySelector(".greeting");

    name.addEventListener("submit", greet);

    function greet(e){
      e.preventDefault();
      const value = nameInput.value;
      hello(value);
    }

    function hello(value){
      name.style.display ="none";
      greeting.style.display="block"
      greeting.innerHTML="hello "+value;

    }
  }
  render(){
    return (
      <div>
        <form className="name">
          <input type="text" placeholder="what is your name?"></input>
        </form>
        <span className="greeting"></span>
        <br></br>
        <ToDoList />
      </div>
    );
  }
}

export default App;
