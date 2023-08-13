import React from 'react'
import './AddListButton.scss'

import Badge from './../Badge/Badge'
import List from './../List/List'

export default function AddListButton({addSvg, name, closeSvg, colors, addList}) {
    let [isVisible,setVisible]=React.useState(false);
    let [activeBadge,setActiveBadge] = React.useState(colors[0].id);
    let [inputValue,setInputValue] = React.useState('')
    let [isLoading, setLoading]= React.useState(false)

   let closeHandler =()=>{
    setInputValue('');
    setActiveBadge(colors[0].id)
    setVisible(false);
   }
   const clickHandler =()=>{
    if(inputValue ){
      setLoading(true);
      const color = colors.find(color=>color.id == activeBadge);
      addList(inputValue, activeBadge, color );
     setTimeout(()=>{setLoading(false);closeHandler()},3000);
       
    } else {
      alert('введи название списка');
    }
  }
  return (
<div className='add_list'>
<List items={[
     {
        icon: addSvg,
        name : name
      }
]}

clickAddBtn={()=> setVisible(true)}
/>




{/* а можно логическое выражение */}

{isVisible && (<div className="add-list__popup">

        <img onClick={closeHandler} className="add-list__popup-close-btn" src={closeSvg} alt=''/>

          <input value ={inputValue} onChange={(e)=>setInputValue(e.target.value)}className="field" type="text" placeholder="Название списка" />
          <div className="add-list__popup-colors">
            {colors.map((color)=>

           ( <Badge onClickBadge={()=>setActiveBadge(color.id)} key={color.id} color={color.name} classActive={color.id== activeBadge && 'active'}/>)

            )}
            
            
            
          </div>
          <button onClick={ clickHandler} className="button">
            {isLoading? 'добавление...':'добавить'}
            {/* Добавить */}
            </button>
        
</div>)
}
 
</div>


  )
}




