
import React from 'react'
import './Tasks.scss'
import Task from './../Task/Task'
import AddTask from '../AddTask/AddTask'
import editSvg from './../../assets/img/edit.svg'
import checkSvg from './../../assets/img/check.svg'
import axios from 'axios'

export default function Tasks({list, onListRename, onAddTask, onEditTask, onDeleteTask,onCompleteTask
}) {
 
  if(list.length==0){
    return (
      <div className="tasks__items">
    <h2>задачи отсутствуют</h2>
    </div>
    )
  } else {
    const listRenameHandler = (id)=>{
       const name = prompt('введите название списка');
       if(name!=''){
        onListRename(id,name);
       } else{
        alert('введено пустое значение')
       }
      
    }

    // const deleteTaskHandler = (id)=>{
    //   axios.delete('http://localhost:3001/tasks/'+id).catch(()=>{
    //     alert('ошибка выполнения операции :( попробуйте позже')
    //   });
    // }

    return (
      <div className="tasks">
          <h2 style= {{color:list.color?.hex}} className="tasks__title">
            {list.name}
            <img onClick={() => listRenameHandler(list.id) } src = {editSvg} alt=""/> 
          </h2>
  
          <div className="tasks__items">
                 {list.tasks.length>0 && list.tasks.map((task,ind)=>
                (<Task onCompleteTask={(id,completed)=>onCompleteTask(id,completed)} onDeleteTask={()=>onDeleteTask(task.id)} onEditTask={(id,text)=>onEditTask(id,text)} key={task.id} task={task}/>)
                
              )}
               {/* {list.length>0 &&
                (<Task task={task}/>)}
   */}
                 <AddTask onAddTask={(name)=> onAddTask(list.id,name) }/>
            
          </div>
   </div>
  
  
  
  
    )
  }
 
}


