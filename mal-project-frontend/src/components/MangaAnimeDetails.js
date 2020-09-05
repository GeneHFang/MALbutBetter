import React, {Fragment, useState, useEffect} from 'react';

const MangaAnimeDetails = (props) => {

  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("");
  const [episodeNum, setEpisodeNum] = useState("");


  //Prevents memory leak
  useEffect(() => {
      return () => {
        window.removeEventListener('mousemove', () => {})
      }
    }, []);

  useEffect(() => {
    console.log(props.obj);
    setName(props.obj.title);
    setScore(props.obj.score);
    setStartDate(props.obj.start_date);
    setEndDate(props.obj.end_date);
    setType(props.obj.type);
    setEpisodeNum(props.obj.episodes);
  }, [props.obj])


  return(
      <div style={props.style}>
        <h1>{name}</h1>
        Score: {score}<br/>
        { 
          type==="TV" 
              ? <Fragment>
                <p>Air Date {startDate} - {endDate}</p>
                <p>Number of Episodes: {episodeNum}</p>
                </Fragment>
              : <p>Release Date {startDate}</p>
        } 


      </div>
  );
}

export default MangaAnimeDetails;