import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import MoviesList from "./MoviesList";

const SearchPage = () => {

    let {searchword}=useParams();
    let [movies,setmovies]=useState(null);
    let [error,setError]=useState(null);
    let [pending,setPending]=useState(true);

     useEffect(()=>{
        setmovies(null);
        setPending(true)
        setTimeout(()=>{
            fetch("http://localhost:4000/movies")
           .then(res=>res.json())
           .then(data=>{
                let d=data.filter((m)=>{
                    return (m.moviename.toLowerCase().startsWith(searchword.toLowerCase())) ||
                            (m.genre.toLowerCase()===searchword.toLowerCase()) ||
                            (m.languages.includes(searchword))
                })
                setmovies(d);
                setPending(false)})
           .catch(rej=>{
                setError(rej.message);
                setPending(false)})
    },3000)
},[searchword])


return ( 
    <div className="search-cont">

        {pending==true ? <h1>Loading...</h1> : <h1>{error}</h1>}

        {movies && <MoviesList movies={movies} title="Search Result"/>}

        </div>
    );
}
 
export default SearchPage;