import React, { useState } from 'react';
import { map, filter, set, get } from 'lodash';
import './Home.scss';

const Home = () => {
  const[todolist, setTodoList] = useState(JSON.parse(localStorage.getItem('todolist')));
  const[filteredList, setFilteredList] = useState(JSON.parse(localStorage.getItem('todolist')));
  const[task, setTask] = useState('');

  const addToList = () => {
    let taskToPush = {
      name: task,
      done: ''
    };
    let empetyArray = get(filteredList, '[0]', false);
    empetyArray ? setFilteredList([...filteredList, taskToPush]) : setFilteredList([taskToPush]);
    empetyArray ? setTodoList([...todolist, taskToPush]) : setTodoList([taskToPush]);
    setTask('');
    localStorage.setItem('todolist', JSON.stringify(filteredList));
  }

  const handleInput = (e) => {
    setTask(e.target.value);
  }

  const search = (e) => {
    let filterQuery = e.target.value;
    filterQuery === 'notdone' ? setFilteredList(filter(todolist, ['done', ''])) : setFilteredList(filter(todolist, e.target.value));
  }

  const toggleTask = (index) => {
    let newList = [...filteredList];
    get(newList, `[${index}].done`, '') ? set(newList, `[${index}].done`, '') : set(newList, `[${index}].done`, true);
    setFilteredList(newList);
    localStorage.setItem('todolist', JSON.stringify(filteredList));
  }

  console.log(filteredList);

  return (
    <div className="home-container">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Lista de Tarefas</h2>
            <br/>
            <div className="center">
              <input type="radio" className="align-radio" value="name" name="search" onChange={(e) =>  search(e)}/> Todos  
              <input type="radio" className="align-radio" value="notdone" name="search" onChange={(e) =>  search(e)}/> A fazer  
              <input type="radio" className="align-radio" value="done" name="search" onChange={(e) =>  search(e)}/> Feito
            </div>
            <div className="d-flex justify-content-center">
              <div className="col-5">
                <input className="task-input" value={task} onChange={(e) => handleInput(e)} onKeyPress={event => event.key === "Enter" ? addToList() : null}/><svg xmlns="http://www.w3.org/2000/svg" width="30" height="50" fill="currentColor" className="bi bi-plus icon" viewBox="0 0 16 16" onClick={() => addToList()}>
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg>
              </div>
            </div>
            {map(filteredList, (values, index) => (
              <div className="d-flex justify-content-center" key={index}>
                <div className="col-6 task-card">
                  <div className="toggle-div">
                    <input 
                      className="toggle"
                      type="checkbox"
                      checked={values.done}
                      onChange={() => toggleTask(index)}
                    />
                  </div>
                  <div className="task-div">
                    <span>{get(values,'name', '')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
