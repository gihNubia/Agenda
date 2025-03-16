import { useState } from "react";

function Task({task, archive, complete, del, update, archivedScreen}){
    const [newDescription, setNewDescription] = useState(task.description);
    const [newDate, setNewDate] = useState(task.end_date);

    const handleDelete = () => {
        if (window.confirm("Confirmar deleção da tarefa?")) {
          del(task._id);
        }
    };

    const handleUpdate = () => {
        if (!newDescription || !newDate) {
            alert("Descrição e data não podem estar vazios!");
            return; 
        }
        
        if (window.confirm("Confirmar Atualização da tarefa?")) {
          update(task._id, newDescription, newDate,);
        }
        else{
            window.location.reload();
        }
    };

    return (
        <div className="row">
            {!task.archived && <input className="checkbox" type="checkbox"  checked = {task.completed} 
                                    onChange={() => complete(task._id)}></input>}
            
            <input className="writable" type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)}/>
            <input className="writable" type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)}/>

            <button className="button" onClick = {handleDelete}>Apagar</button>
            <button className="button" onClick = {handleUpdate}>Atualizar</button>
            {task.completed && (!task.archived) && <button className="button" onClick={() => archive(task._id)}>Arquivar</button>}
            {archivedScreen && <button className="button" onClick={() => archive(task._id)}>Ativar</button>}
            
        </div>
    )
    
}

export default Task;