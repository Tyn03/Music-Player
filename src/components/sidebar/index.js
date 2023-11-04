import React,{useState,useEffect} from 'react';
import "./sidebar.css";
import SidebarButton from './sidebarButton';
import {MdSpaceDashboard} from "react-icons/md";
import {FaGripfire} from "react-icons/fa";
import {FaPlay} from "react-icons/fa";
import {MdFavorite} from "react-icons/md";
import {IoLibrary} from "react-icons/io5";
import {FaSignOutAlt} from "react-icons/fa";
import apiClient from "../../spotify";
export default function Index() {
  
  const [Image,setImage] = useState(
        "https://i.pinimg.com/originals/ae/2e/56/ae2e5651b74a00d5d31b8c6453fa3ebb.png"
    );
    

  return (
    <div className='sidebar-container'>
      <img 
        src = {Image}
        className='image'
        alt='image'
      />
      <div>
        <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard/>}/>
        <SidebarButton title="Trending" to="/trending" icon={<FaGripfire/>}/>
        <SidebarButton title="PLayer" to="/player" icon={<FaPlay/>}/>
        <SidebarButton title="Favorites" to="/favorites" icon={<MdFavorite/>}/>
        <SidebarButton title="Library" to="/library" icon={<IoLibrary/>}/>
      </div>
      <SidebarButton title="Sign out" to="" icon={<FaSignOutAlt/>}/>
    </div>
  )
}
