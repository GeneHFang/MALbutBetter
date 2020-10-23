import React, {Fragment, useState, useEffect} from 'react';

const MangaAnimeDetails = (props) => {

  const [name, setName] = useState("");
  const [airing, setAiring] = useState("");
  const [publishing, setPublishing] = useState("");
  const [score, setScore] = useState("");
  const [airedDate, setAiredDate] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [type, setType] = useState("");
  const [episodeNum, setEpisodeNum] = useState("");
  const [volumeNum, setVolumeNum] = useState("");


  //Prevents memory leak
  useEffect(() => {
      return () => {
        window.removeEventListener('mousemove', () => {})
        window.removeEventListener('mouseout', () => {})
      }
    }, []);

  useEffect(() => {
    console.log(props.obj);
    setName(props.obj.title);
    setScore(props.obj.score);
    if (props.obj.start_date){
      let sDate = new Date(props.obj.start_date);
      let eDate = props.obj.end_date ? new Date(props.obj.end_date) : null; 
      
      const parseDate = (date) => {
        let retYear = (date.getYear()+1900)+"";
        let retMonth = (date.toDateString().split(" ")[1]);
        return `${retMonth} ${retYear}`;
      }

      setAiredDate({string: `${parseDate(sDate)} - ${eDate ? parseDate(eDate) : "Ongoing"}`});
      setPublishedDate({string: `${parseDate(sDate)} - ${eDate ? parseDate(eDate) : "Ongoing"}`});
    }else{
      setPublishedDate(props.obj.published);
      setAiredDate(props.obj.aired);
    }
    setType(props.obj.type);
    setEpisodeNum(props.obj.episodes);
    setVolumeNum(props.obj.volumes);
    setAiring(props.obj.airing);
    setPublishing(props.obj.publishing);
  }, [props.obj])


  const parseDetails = () => {
    if (type ==="TV"){
      return (
          <Fragment>
          Aired {airedDate ? airedDate.string : null} <br/>
          Number of Episodes: {episodeNum}
        </Fragment>
      );
    }
    else if (type === "Movie"){
      return(
        <p>Release Date {airedDate ? airedDate.string : null}</p>
      );
    }
    else { //type Manga
      return(
        <Fragment>
          <p>Published: {publishedDate ? publishedDate.string : null}</p>
          { volumeNum || publishing===false ? <p>Number of Volumes: {volumeNum}</p> : null}
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