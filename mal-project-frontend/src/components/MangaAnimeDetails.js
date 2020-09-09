import React, {Fragment, useState, useEffect} from 'react';

const MangaAnimeDetails = (props) => {

  const [name, setName] = useState("");
  const [score, setScore] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("");
  const [episodeNum, setEpisodeNum] = useState("");
  const [volumeNum, setVolumeNum] = useState("");


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
    setVolumeNum(props.obj.volumes);
  }, [props.obj])


  const parseDetails = () => {
    if (type ==="TV"){
      let dateRange =  `${startDate} - ${endDate ? endDate : "Currently Airing"}`;
      return (
          <Fragment>
          <p>Air Date {dateRange}</p>
          <p>Number of Episodes: {episodeNum}</p>
        </Fragment>
      );
    }
    else if (type === "Movie"){
      return(
        <p>Release Date {startDate}</p>
      );
    }
    else { //type Manga
      let dateRange =  `${startDate} - ${endDate ? endDate : "Ongoing"}`;
      return(
        <Fragment>
          <p>Published: {dateRange}</p>
          {endDate ? <p>Number of Volumes: {volumeNum}</p> : null}
        </Fragment>
      );
    }
  }

  return(
      <div style={props.style}>
        <h1>{name}</h1>
        Score: {score}<br/>
        { 
          parseDetails()
        } 


      </div>
  );
}

export default MangaAnimeDetails;