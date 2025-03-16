import '../App.css';
import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from 'react'
import Task from './task' 


function Archive() {
  const path = "http://localhost:3000/agenda";
  const [tasks, setTasks] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  function getArchived(){ // archived tasks 
    fetch(path + "/archive", {method: "GET", headers: {"Content-Type" : "application/json"}})
    .then(response => response.json())
    .then(data => {setTasks(data); setAllTasks(data)});
  }

  function updateTask(id, description, date){ 
    fetch(path + "/task/" + id, {method: "PATCH", 
                                  headers: {"Content-Type" : "application/json"},
                                  body : JSON.stringify({"description": description, "end_date": date})})
    .then(response => response.json())
    .then(data => getArchived(data));
  }

  function setArchive(id){ 
    fetch(path + "/task/" + id, {method: "PUT", 
                                  headers: {"Content-Type" : "application/json"},
                                  body : JSON.stringify({"action": "archive"})})
    .then(response => response.json())
    .then(data => getArchived(data));
  }

  function deleteTask(id){ 
    fetch(path + "/task/" + id, {method: "DELETE", headers: {"Content-Type" : "application/json"}})
    .then(response => response.json())
    .then(data => getArchived(data));
  }

  useEffect(() => {
    getArchived();
  }, []);

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
        <h2>Arquivadas</h2>
        <div className="left-button-container">
          <button className="button" onClick={() => navigate('/')} >Ativas</button>
        </div>
        
        <div>
          <input className="searchbar" type="text" placeholder="Pesquisar tarefas" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <button className="button" onClick={handleSearch}>Pesquisar</button>
        </div>
        
        <div>
          {tasks.map(task => {return (<Task key={task._id} 
                                          task = {task} 
                                          archive = {setArchive}
                                          del = {deleteTask}
                                          update = {updateTask}
                                          archivedScreen = {true}
                                          />)})}
        </div>
        
      </div>
      
    </div>
  );
}

export default Archive;