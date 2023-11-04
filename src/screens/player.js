import React,{useState,useEffect,useRef} from 'react'
import {Songs} from "./Songs";
import { MusicPlayer } from './MusicPlayer';
import "../Styles/player.css";
import {
  FaRegHeart,
  FaHeart,
  FaForward,
  FaStepForward,
  FaStepBackward,
  FaBackward,
  FaPlay,
  FaPause,
  FaShareAlt,
  FaHeadphones,
  FaRegClock
} from "react-icons/fa";
import { BsDownload } from "react-icons/bs";



function Player() {
    const [song,setSong] = useState(Songs[0].song);
    const [img,setImage] = useState(song[0].imgSrc);
    const [songIndex, setSongIndex] = useState(0);
    

    

    useEffect(() => {
        const songs = document
        .querySelectorAll(".songs");
        function changeMenuActive(){
            songs.forEach((n) =>n.classList.remove("active"));
            this.classList.add("active");
        }
        songs.forEach(n => n.addEventListener('click',changeMenuActive))
    },[]);

    const changeFavourite = (id) =>{
        Songs.forEach(song => {
            if(song.id == id){
                song.favourite = !song.favourite;
            }
        });
    }

    const setMainSong = (songSrc,imgSrc) =>{
        setSong(songSrc);
        setImage(imgSrc);
    }




   
  const [isLove, setLove] = useState(false);
  const [isPlaying, setPlay] = useState(false);
 
  const [currentSong, setcurrentSongIndex] = useState(Songs[songIndex]);
  
  
  console.log("",+songIndex);

  useEffect(() => {
    // Khi song hoặc SongIndex thay đổi, cập nhật giá trị của Nsong
    setSong(Songs[songIndex].song);
  }, [song, songIndex])

  useEffect(() => {
    // Khi song hoặc SongIndex thay đổi, cập nhật giá trị của Nsong
    setImage(Songs[songIndex].imgSrc);
  }, [song, songIndex])
  
  
  //   duration state
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrenttime] = useState(0);

  const audioPlayer = useRef(); //   reference to our audio component
  const progressBar = useRef(); //   reference to our prgressbar
  const animationRef = useRef(); //  reference to our animation

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);

    // set max prop with out seconds in input[range]
    progressBar.current.max = seconds;
  }, [audioPlayer?.current?.loadedmetada, audioPlayer?.current?.readyState]);

 

  
   
   
  

  const changePlayPause = () => {
    const prevValue = isPlaying;
    setPlay(!prevValue);

    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const move5s = () =>{
    if(audioPlayer.current.currentTime < duration){
      audioPlayer.current.currentTime +=5;
      changeCurrentTime();
    }
  }

  const back5s = () =>{
    if(audioPlayer.current.currentTime > 0){
      audioPlayer.current.currentTime -=5;
      changeCurrentTime();
    }
  }

  const playPreviousSong = () => {
    var tmp=songIndex;
    if (songIndex === 0) {
      tmp = Songs.length - 1;
      setSongIndex(tmp);
      setcurrentSongIndex(Songs[tmp]);
    } else {
      tmp = songIndex - 1;
      setSongIndex(tmp);
      setcurrentSongIndex(Songs[tmp]);
    }
  
    // Tắt bài hát hiện tại
    audioPlayer.current.pause();
    audioPlayer.current.currentTime = 0;
  
    // Đặt bài hát mới và chạy
    setSong(Songs[tmp].song);
    setImage(Songs[tmp].imgSrc);
    //audioPlayer.current.play();
    setPlay(true);
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const playNextsSong = () => {
    var tmp=songIndex;
    if (songIndex === Songs.length-1) {
      tmp = 0;
      setSongIndex(tmp);
      setcurrentSongIndex(Songs[tmp]);
    } else {
      tmp = songIndex + 1;
      setSongIndex(tmp);
      setcurrentSongIndex(Songs[tmp]);
      console.log(""+songIndex)
      
    }
  
    // Tắt bài hát hiện tại
    audioPlayer.current.pause();
    audioPlayer.current.currentTime = 0;
  
    // Đặt bài hát mới và chạy
    setSong(Songs[tmp].song);
    setImage(Songs[tmp].imgSrc);
    //audioPlayer.current.play();
    setPlay(true);
    animationRef.current = requestAnimationFrame(whilePlaying);
    console.log(""+tmp)
    
  };

  
  
  
  
  
  
  

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime;
    changeCurrentTime();
    // need to run more than once
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const calculateTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sec % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnMin} : ${returnSec}`;
  };

  const changeProgress = () => {
    audioPlayer.current.currentTime = progressBar.current.value;

    // progressBar.current.style.setProperty(
    //   "--played-width",
    //   `${(progressBar.current.value / duration) * 100}%`
    // );

    // setCurrenttime(progressBar.current.value);

    changeCurrentTime();
  };

  const changeCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--played-width",
      `${(progressBar.current.value / duration) * 100}%`
    );

    setCurrenttime(progressBar.current.value);
  };

  const changeSongLove = () => {
    setLove(!isLove);
  };

    

  return (
    <div className="player">
        <h2 className="title">
            The List <span>{`${Songs.length} songs`}</span>
        </h2>

        <div className="songsContainer">
            {
                Songs && Songs.map((song,index)=>(
                    <div className="songs" key={song.id}
                        onClick = {() => {setMainSong(song?.song,song?.imgSrc);
                            setSongIndex(index); // Cập nhật index của bài hát
                        }}
                    >
                        <div className="count">{`#${index + 1}`}</div>
                        <div className="song">
                            <div className="imgBox">
                                <img src={song?.imgSrc} alt=""/>
                            </div>
                                <div className="section">
                            <p className="songName">
                                {song?.songName}<span className="spanArtist">{song?.artist}</span>
                            </p>
    
                            
                        </div>
                    </div>
                </div>
                ))
            }
           
        
        
        
        </div>

        <div className="musicPlayer">
      <div className="songImage">
        <img src={img} alt="" />
      </div>
      <div className="songAttributes" key={song.id}>
        <audio src={song} preload="metadata" ref={audioPlayer} />

        <div className="top">
          <div className="left">
            <div className="loved" onClick={changeSongLove}>
              {isLove ? (
                <i>
                  <FaRegHeart />
                </i>
              ) : (
                <i>
                  <FaHeart />
                </i>
              )}
            </div>
            <i className="download">
              <BsDownload />
            </i>
          </div>

          <div className="middle">
            <div className="back" >
            

              <div className="back previous song"  onClick={playPreviousSong}>
              <i>
                <FaStepBackward /> 
              </i>
              </div>

              <div className="back 5s"  onClick={back5s}>
              <i>
                <FaBackward />
              </i>
              </div>
              
             
            </div>
            <div className="playPause" onClick={changePlayPause}>
              {isPlaying ? (
                <i>
                  <FaPause />
                </i>
              ) : (
                <i>
                  <FaPlay />
                </i>
              )}
            </div>
            <div className="forward"  >
              <div className="move 5s" onClick={move5s}>
              <i>
                <FaForward />
              </i>
              </div>
              <div className="play next song" onClick={playNextsSong}>
              <i>
                <FaStepForward />
              </i>
              </div>
              
            </div>
          </div>

          <div className="right">
            <i>
              <FaShareAlt />
            </i>
          </div>
        </div>

        <div className="bottom">
          <div className="currentTime">{calculateTime(currentTime)}</div>
          <input
            type="range"
            className="progressBar"
            ref={progressBar}
            defaultValue="0"
            onChange={changeProgress}
           
          />
          <div className="duration">
            {duration && !isNaN(duration) && calculateTime(duration)
              ? duration && !isNaN(duration) && calculateTime(duration)
              : "00:00"}
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Player;
