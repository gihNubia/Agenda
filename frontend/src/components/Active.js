//import logo from './logo.svg';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react'
import Task from './task' 

function Active() {
  const path = "http://localhost:3000/agenda";
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [newTaskVisible, setNewTaskVisible] = useState(false); 
  const [newDescription, setNewDescription] = useState('');
  const [newDate, setNewDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  function getTasks(){ // not archived tasks 
    fetch(path + "/tasks", {method: "GET", headers: {"Content-Type" : "application/json"}})
    .then(response => response.json())
    .then(data => {setTasks(data); setAllTasks(data);});
  }

  function createTask(description, date){ 
    fetch(path + "/task", {method: "POST", 
                            headers: {"Content-Type" : "application/json"},
                            body : JSON.stringify({"description": description, "end_date": date})})
    .then(response => response.json())
    .then(data => getTasks(data));
  }

  function updateTask(id, description, date){ 
    fetch(path + "/task/" + id, {method: "PATCH", 
                                  headers: {"Content-Type" : "application/json"},
                                  body : JSON.stringify({"description": description, "end_date": date})})
    .then(response => response.json())
    .then(data => getTasks(data));
  }

  function setArchive(id){ 
    fetch(path + "/task/" + id, {method: "PUT", 
                                  headers: {"Content-Type" : "application/json"},
                                  body : JSON.stringify({"action": "archive"})})
    .then(response => response.json())
    .then(data => getTasks(data));
  }

  function setComplete(id){ 
    fetch(path + "/task/" + id, {method: "PUT", 
                                  headers: {"Content-Type" : "application/json"},
                                  body : JSON.stringify({"action": "complete"})})
    .then(response => response.json())
    .then(data => getTasks(data));
  }
  
  function deleteTask(id){ 
    fetch(path + "/task/" + id, {method: "DELETE", headers: {"Content-Type" : "application/json"}})
    .then(response => response.json())
    .then(data => getTasks(data));
  }

  useEffect(() => {
      getTasks();
  },[]);

  const handleSaveNewTask = () => {
    if (newDescription && newDate) {
      createTask(newDescription, newDate);
      setNewDate('');
      setNewDescription('');
      setNewTaskVisible(false);

    } else {
      alert("Preencha todos os campos.");
    }
  };

  const handleSearch = () => {
    if (window.confirm("Confirmar pesquisa?")) {
      const tasks = allTasks.filter(task => task.description.toLowerCase().includes(searchQuery.toLowerCase()));
      setTasks(tasks);
    }
  };

  return (
    <div className="wrapper">

      <div className="agenda">
        <h1>Agenda</h1>
        
        <div className="left-button-container">
          <button className="button" onClick={() => navigate('/archived')} >Arquivadas</button>
        </div>

        <div>
          <button className="button" onClick={() => setNewTaskVisible(true)}>Nova Tarefa</button>
        
          {newTaskVisible && (
            <div className="row">
              <input className="writable" type="text" placeholder="Descrição" value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
              />
              <input className="writable" type="date" value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
              />
              <button className="button" onClick={handleSaveNewTask}>Salvar</button>
              <button className="button" onClick={() => {setNewTaskVisible(false);setNewDescription('');setNewDate('');
                              }}>Cancelar</button>
            </div>
          )}
        </div>
        
        <div>
          <input className="searchbar" type="text" placeholder="Pesquisar tarefas" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <button className="button" onClick={handleSearch}>Pesquisar</button>
        </div>
        
        <div>
          {tasks.map(task => {return (<Task key={task._id} 
                                          task = {task} 
                                          archive = {setArchive}
                                          complete = {setComplete}
                                          del = {deleteTask}
                                          update = {updateTask}
                                          />)})}
        </div>
        
      </div>
      
    </div>
  );
}

export default Active;
