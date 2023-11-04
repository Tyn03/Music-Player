// this file is holding everything that our website will have 

import React, { useState,useEffect } from "react";
import{ BrowserRouter as Router, Routes,Route} from "react-router-dom";
import Anhnen from '../../img/anh-dep-ve-am-nhac-04688.jpg';


import Library from '../library';
import Favorites from '../favorites';
import Feed from "../feed";
import Player from "../player";
import Sidebar from "../../components/sidebar";
import Login from "../auth/login";

import "./home.css";
import { setClientToken } from "../../spotify";

 function Home(){
    

    const [token,setToken] = useState("");

    useEffect(()=>{
        const token = window.localStorage.getItem("token");
        const hash = window.location.hash;   // give the current location
        window.location.hash="";
        if(!token && hash){
            const _token = hash.split("&")[0].split("=")[1];
            window.localStorage.setItem("token",_token);
            setToken(_token);
            setClientToken(_token);
        }else{
            setToken(token);
            setClientToken(token);
        }
        
    },[]);
  return !token ? (
    <Login/> 
    )  :(
    
    <Router>
    <div className="main-body" >
        
        
    <Sidebar/>
    <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/player" element={<Player/>}/>
        <Route path="/favorites" element={<Favorites/>}/>
        
    </Routes> 
    </div>
    
    </Router>);
}

export default Home;

// setting screen
