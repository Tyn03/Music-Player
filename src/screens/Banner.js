import React from 'react'
import anime from '../img/anime.jpg';
import Check from '../img/check.png';
import "../Styles/favorites.css";
import {FaEllipsisH,FaHeadphones,FaCheck} from 'react-icons/fa';
function Banner() {
  return (
    <div className="Banner">
      <img src = {anime} alt="" className="BannerImg"/>

      <div className="content">
        <div className = "breadCrump">
          <p>
            Home <span>/Popular Artist</span>
          </p>
          <i> <FaEllipsisH/></i>
             
        </div>
        <div className="artist">
          <div className="left">
            <div className="name">
              <h2> A-Ha</h2>
              <img src = {Check} alt=""/>
            </div>

            <p>
              <i><FaHeadphones size={30}/></i> 
            </p>
          </div>
          <div className="right">
            <a href="#">play</a>
            <a href="#">
              <i><FaCheck/></i> <p>Following</p> 
            </a>
          </div>  
        </div>
      </div>
      <div className="bottomLayer"></div>
    </div>
  )
}

export  {Banner};
