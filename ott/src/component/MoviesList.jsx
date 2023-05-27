import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MoviesList = ({movies , title}) => {

        let[favId, setFavId] = useState([]);
        let[altered, setAltered] = useState(0);

        useEffect(()=>{
            let fav=JSON.parse(localStorage.getItem("fav"));
            setFavId(fav.map((m)=>{return m.id}));
        }, [altered]);

        let add = (movie) =>{
          let fav = JSON.parse(localStorage.getItem("fav"));
          fav.push(movie);
          localStorage.setItem("fav" , JSON.stringify(fav));
          setAltered(altered+1);
        }

        let removeMovie = (id) =>{
          let fav = JSON.parse(localStorage.getItem("fav"));
          fav = fav.filter((m)=>{return m.id!=id})
          localStorage.setItem("fav" , JSON.stringify(fav));
          setAltered(altered+1);
        }

    return ( 
        <div >
        <h1 className='title'>{title}</h1>

         <div className="movies">
             {movies.map((movie,index)=>{
                return (
                      <div key={index} className="movie">

                            {favId.includes(movie.id) ? 
                            <button className='remove-btn' onClick={()=>{removeMovie(movie.id)}}><i className='bx bxs-heart' style={{color:"red" }} ></i></button>
                            :
                            <button className='add-btn' onClick={()=>{add(movie)}}><i className='bx bxs-heart' style={{color:"white" }} ></i></button>}

                            <Link to={`/moviedetails/${movie.id}`}>

                                <img src={movie.poster}/>
                                <h2>{movie.moviename}</h2>
                                <p>{movie.genre}</p>

                            </Link>
                        </div>
                )})} 
                </div>
        </div>);
}
 
export default MoviesList;