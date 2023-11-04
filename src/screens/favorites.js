import React,{useEffect} from 'react';
import "../Styles/favorites.css";
import {Banner} from "./Banner";
import { FaUsers } from 'react-icons/fa';
import {AudioList} from './AudioList';

function Favorites() {

  useEffect(() => {
    const allLi = document
    .querySelector(".menuList")
    .querySelectorAll("li");
    function changeMenuActive(){
        allLi.forEach((n) =>n.classList.remove("active"));
        this.classList.add("active");
    }
    allLi.forEach(n => n.addEventListener('click',changeMenuActive))
    },[]);
    
  return (
    <div className="MainContainer">
      <Banner/>

      <div className="menuList">
        
      </div>
      <AudioList/>
      
    </div>
  )
}

export  default Favorites;
