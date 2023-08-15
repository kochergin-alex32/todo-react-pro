import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './componentsApp/App'
import {BrowserRouter as Router} from 'react-router-dom'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Router>   
    <App />
  </Router>


  
);
// function Main(){
//   return <h1>main</h1>
// }
// function About(){
//   return <h1>about</h1>
// }
// function Contacts(){
//   return <h1>contacts</h1>
// }

