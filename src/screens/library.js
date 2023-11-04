import React from "react";
import apiClient from "../spotify"


 function library(){
  apiClient.get("/users/31eb77a6c52e4301b86c125e9d01df11/playlists").then(function(response){
    console.log(response.data);
  });
  return <div className="screen-container"> L</div>;
}

export default library;