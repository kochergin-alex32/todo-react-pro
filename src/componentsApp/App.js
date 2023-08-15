import './App.scss';
import React from 'react';
import listSvg from '../assets/img/list.svg';
import addSvg from '../assets/img/add.svg';
import closeSvg from '../assets/img/close.svg'
import DB from '../assets/db.json'
import axios from 'axios';
import List from './List/List';

import AddListButton from './AddListButton/AddListButton'
import Tasks from './Tasks/Tasks';
import{Route,Link,Routes,useNavigate,useLocation}from 'react-router-dom'



function App() {
  let[lists,setLists] = React.useState(null);
  let [colors, setColors]= React.useState(null);
  let [active, setActive]= React.useState(null);
  let navigate = useNavigate();
  let location = useLocation()
  console.log(location.pathname);

  React.useEffect(()=>{
  const uri = location.pathname.split('lists/')[1] || location.pathname;
  if (uri == '/'){
    setActive(null);
  }else{
    setActive(uri);
  }
   axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({data})=>{setLists(data);
  }).catch(()=>{
    alert('ошибка выполнения операции :( попробуйте позже')
  });
axios.get('http://localhost:3001/colors').then(({data})=>{setColors(data);
}).catch(()=>{
  alert('ошибка выполнения операции :( попробуйте позже')
})
 
  },[active, location.pathname]);
   
  let deleteHandler=(id)=>{
    const newList = [...lists].map(list=>{
      if(list.id != id){
        return list;
      }
    })
    
    axios.delete('http://localhost:3001/lists/'+id).then(()=>setActive(null)).catch(()=>{
      alert('ошибка выполнения операции :( попробуйте позже')
    });
  }
let addListHandler = (name,colorId,color) =>{
  
  axios.post('http://localhost:3001/lists',{name,colorId}).catch(()=>{
    alert('ошибка выполнения операции :( попробуйте позже')
  })
  
}

const listRenameHandler = (id,name)=>{
  axios.patch('http://localhost:3001/lists/'+id,{name}).catch(()=>{
    alert('ошибка выполнения операции :( попробуйте позже')
  });
   
}

const addTaskHandler=(id,name)=>{
  axios.post('http://localhost:3001/tasks',{listId:id,text:name,completed:false}).catch(()=>{
    alert('ошибка выполнения операции :( попробуйте позже')
  });
}

const editTaskHandler=(id,text)=>{
  axios.patch('http://localhost:3001/tasks/'+ id,{text:text}).catch(()=>{
    alert('ошибка выполнения операции :( попробуйте позже')
  });
}

const deleteTaskHandler = (id)=>{
  axios.delete('http://localhost:3001/tasks/'+id).catch(()=>{
    alert('ошибка выполнения операции :( попробуйте позже')
  });
}

const completeTaskHandler=(id,completed)=>{
  axios.patch('http://localhost:3001/tasks/'+ id,{completed:completed}).catch(()=>{
    alert('ошибка выполнения операции :( попробуйте позже')
  });
}

const selectTasks = ()=>{
  if(lists && active){
   
   return( <Tasks  onCompleteTask={completeTaskHandler} onDeleteTask={deleteTaskHandler} onEditTask={editTaskHandler} onAddTask={addTaskHandler} onListRename={listRenameHandler} list={lists[lists.findIndex((item)=>item.id==active)]}/>)
   
  } else if (lists && active == null){
   return lists.map((list,ind)=>(
   <Tasks onCompleteTask={completeTaskHandler} onDeleteTask={deleteTaskHandler} onEditTask={editTaskHandler} onAddTask={addTaskHandler} onListRename={(id,name)=>listRenameHandler(id,name)} key={ind} list={list}/>))
    
  } else {
    return false
  }
 
}

  return (
    <div className="todo">
      <div className="todo__sidebar">
      <List  active={active == null && 'default'} onItemActive={(id)=>
      navigate('/')} items={[
        {
          icon:listSvg,
          name : 'все списки',
         
        }
      ]}/>
      {lists && (lists.length>0) &&
      // (<List active={active} onItemActive={(id)=>{navigate(`lists/${id}`);setActive(id)}} items={lists}
      // isRemovable={true}
     
      // onDelete={(id)=>deleteHandler(id)}
      // />)


      (<List active={active} onItemActive={(id)=>navigate(`lists/${id}`)} items={lists}
      isRemovable={true}
     
      onDelete={(id)=>deleteHandler(id)}
      />)

      }
      {
        colors &&
      (<AddListButton addList={(name,colorId,color) => addListHandler(name,colorId,color)} colors={colors} closeSvg = {closeSvg} addSvg={addSvg} name="добавить список"/>)
      }
      </div>

    <div className='todo_tasks'>
      {selectTasks()}
     
         
    </div>
    </div>
  );
}



export default App;
