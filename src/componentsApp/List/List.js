import React from 'react'
import './List.scss';
import itemRemove from './../../assets/img/remove.svg';
import Badge from './../Badge/Badge';

export default function List ({items,active,isRemovable, onDelete, clickAddBtn = null, onItemActive=null}) {
    
  let activeListHandler = (id=null)=>{
    if(clickAddBtn==null){
      onItemActive(id);
    }
  }

  return (
    <ul className="list" onClick={ clickAddBtn }>

      {
        items.map((item,ind)=>(
          // <li key={ind} className={item.active ? 'active':''}>
          //  <li  onClick={()=>alert(1)} key={ind}> 
            <li onClick={()=>onItemActive && activeListHandler(item.id)}  key={ind} className={active && (active==item.id || active=='default') ? 'active':''}> 
          <i>
            {item.icon?
            (<img src = {item.icon}/ >)
            :
            (<Badge color = {item.color.name}/>)
           

            }
         
          
          </i>
          <span>
            {item.name}
            {/* &nbsp; */}
            {item.tasks&&item.tasks.length>0&&` (${item.tasks.length})`}
            </span>

          {isRemovable ?
            (<img onClick={()=>{
               if(window.confirm('вы действительно хотите удалить')){
              onDelete(item.id)
           } }}className='list__remove-icon' src={itemRemove} alt="" />)
            :
            ''
          }
         
         
        </li>
        )
        )
      }
 </ul>
  )
}


