import { useEffect, useState, }from 'react';
import axios from 'axios';

const useAnimeMangaSearch = (pageNum, searchType, profile) => { 
    const [loading, setLoading] = useState(true);
    const [type, setType] = useState(searchType);
    const [hasMore, setHasMore] = useState(false);
    const [error, setError] = useState(false);
    const [animeMangas, setAnimeMangas] = useState([]);

    
        
    useEffect(()=>{
        if (!profile){
            setType(prev=>{
                if (prev != searchType){
                    setAnimeMangas([]);
                }
                return searchType
            })
            setLoading(true);
            setError(false);
            let cancel;
            axios({
                method: 'GET',
                url:`https://api.jikan.moe/v3/top/${searchType}/${parseInt(pageNum)}`,
                cancelToken: new axios.CancelToken(c=> cancel=c),
            }).then(res=> {
                setAnimeMangas(prev=>[...prev, ...res.data.top]);
                setHasMore(res.data.top.length > 0);
                setLoading(false);
                // console.log(res.data);
            }).catch(e=> {
                if (axios.isCancel(e)) return;
                setError(true);
            })
            return ()=> cancel();
        }
    }, [pageNum,searchType])
    

    return {
        loading, error, animeMangas, hasMore
    }; 
}


export default useAnimeMangaSearch;