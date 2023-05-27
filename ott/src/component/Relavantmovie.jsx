import { useState, useEffect } from "react";
import MoviesList from "./MoviesList";

const Relavantmovie = ({title}) => {

    let [movies,setmovies]=useState(null);

    useEffect(()=>{
        fetch("http://localhost:4000/movies/")
       .then(res=>res.json())
       .then(data=>{setmovies(data)})
    },[])

    return ( 
        <div className="relevant-movies">

        {movies && 
        <MoviesList 
        movies={movies.filter((m)=>{ return m.genre.includes(title)})} 
        title="Relevant Movies"/>}
        
        </div>);
}
 
export default Relavantmovie;