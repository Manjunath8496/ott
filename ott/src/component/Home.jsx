import { useEffect, useState } from "react";
import MoviesList from "./MoviesList";


const Home = () => {
    let [movies,setmovies]=useState(null);
    let [error,setError]=useState(null);
    let [pending,setPending]=useState(true);

    
    useEffect(()=>{

            if(localStorage.getItem("fav")==null)
            {
                localStorage.setItem("fav" , "[]")
            }

            setTimeout(()=>{
            fetch("http://localhost:4000/movies")
           .then(res=>res.json())
           .then(data=>{setmovies(data);
                        setPending(false)})

           .catch(rej=>{setError(rej.message);
                        setPending(false)})
           
    },3000)
},[])

    return ( 
        <div className="home">
            {pending==true ? <h1>Loading...</h1> : <h1>{error}</h1>}
            <h1>manju</h1>
            {movies && <MoviesList movies={movies} title="all movies"/>}
            {movies && <MoviesList movies={movies.filter((m)=>{return m.genre.includes("action")})} title="action movies" />}
            {movies && <MoviesList movies={movies.filter((r)=>{return r.rating>=8.5})} title="top rated movies"/>}
        </div>
     );
}
 
export default Home;