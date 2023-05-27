import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Relavantmovie from "./Relavantmovie";

const Moviedeatails = () => {

    let {id} = useParams();
    let navigate = useNavigate();
    let [movie,setmovie]=useState(null);
    let [error,setError]=useState(null);
    let [pending,setPending]=useState(true);

    let [displayEditBox , setdisplayEditBox]=useState(false);

    useEffect(()=>{

        setmovie(null);
        setPending(true);

        setTimeout(()=>{
        fetch("http://localhost:4000/movies/"+id)
       .then(res=>res.json())
       .then(data=>{setmovie(data);
                    setPending(false)})

       .catch(rej=>{setError(rej.message);
                    setPending(false)})
    },3000)
    },[id])

    let deleteMovie = () => {
        fetch("http://localhost:4000/movies/"+id , {method : "DELETE"})
        .then(()=>{ navigate("/")})
    }

    return ( 
        <div>
            <div className="home">
            {pending==true ? <h1>Loading...</h1> : <h1>{error}</h1>}

            {movie && <>
                    <div className="movie-details">
                        <img src={movie.poster} alt="poster" />
                        <div className="movie-details-text">
                        <h1>Movie: {movie.moviename} <span>IMDB  {movie.rating}</span></h1>
                        <h3>Actor: {movie.hero}, {movie.heroine}</h3>
                        <p>Director: {movie.director}</p>
                        <p>Languages: {movie.languages.join(" , ")}</p>
                        <p>Genre: {movie.genre}</p>
                        <h3>Story Line :</h3>
                        <p>{movie.synopsis}</p>
                        </div>
                    </div>
                    <iframe src={movie.trailer} height={200} width={300}></iframe>

                    <button onClick={deleteMovie}>Delete</button>
                    
                    <Link to={`/edit/${movie.id}`}><button>Update</button></Link>

                    {movie && <Relavantmovie title={movie.genre}/>}
                     </>
                    }
        </div>
        </div>
     );
}
 
export default Moviedeatails;