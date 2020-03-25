import React from 'react';

class ToDoList extends React.Component{
    componentDidMount(){
        const list = document.querySelector(".li");
        const form = document.querySelector(".todo_input");
        const input = form.querySelector("input");
            
        const listName = "toDoList";
        let todoList = [];
            
        loadList();
        form.addEventListener("submit", handleSubmit);

        function handleRemove(e){
            const btn=e.target;
            const li=btn.parentNode;
            list.removeChild(li);
            const removedList = todoList.filter(function(todo){
                return todo.id!==parseInt(li.id);
            });
            todoList=removedList;
            saveList();
        }
            
        function addList(value){
            const li = document.createElement("li");
            const delBtn = document.createElement("button");
            delBtn.innerText ="remove";
            const span = document.createElement("span");
            const id = todoList.length + 1;
            span.innerText = value;
            li.appendChild(span);
            li.appendChild(delBtn);
            li.id=id;
            list.appendChild(li);
            const todoObject = {
                value: value,
                id: id
            }
            todoList.push(todoObject);

            delBtn.addEventListener("click", handleRemove);
        }

        
        function saveList(){
            localStorage.setItem(listName, JSON.stringify(todoList));
        }
        
        function loadList(){
            let toDo = localStorage.getItem(listName);
            if(toDo!==null){
                const paresToObject = JSON.parse(toDo);
                for(let todo in paresToObject){
                    console.log(todo);
                    addList(todo.value);
                }
                // console.log(Array.isArray(paresToObject));
                // console.log(paresToObject);
                // paresToObject.foreach(todo => addList(todo.value));
            }
        }
        
        function handleSubmit(e){
            e.preventDefault();
            let value = input.value;
            input.value="";
            addList(value);
            saveList();
        }
    }
    render(){
        return (
        <div>
            <form className="todo_input">
                <input type="text" placeholder="what should you do??"></input>
            </form>
            <ul className="li">
            </ul>
        </div>);
    }
}


export default ToDoList;

