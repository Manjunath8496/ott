import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

    let [searchword, setSearchword] = useState("");
    let [movienames, setMovienames] = useState([]);
    let [menu,setMenu] = useState(false);

    useEffect(()=>{
        
            
        
        fetch("http://localhost:4000/movies/")
        .then(res=>res.json())
        .then(data=>{
                    let names = data.map((m)=>{return {moviename : m.moviename , id : m.id} })
                    let filterednames = names.filter((movie)=>{return movie.moviename.toLowerCase().startsWith(searchword.toLowerCase())})
                    setMovienames(filterednames);
            })
    
        },[searchword])
    


    return ( 
        <nav>
            <div id="logo">
                <Link to="/">Movies 🕷 </Link>
            </div>
            <div id="search-bar">
                <input type="search" placeholder="Search for movies" value={searchword} onChange={(e)=>{setSearchword(e.target.value)}}/>
                <Link to={`/search/${searchword}`}>
                    <button>search</button>
                </Link>
            </div>
            <div id="add-movie">
                <Link to="/fav">Favorite movies</Link>
            </div>
            <div id="add-movie">
                <Link to="/add">Add Movie</Link>
            </div>

            <div id="hamberger">
                
            <span onClick={()=>{setMenu(!menu)}}> {menu==false ? <i className='bx bx-menu' ></i> : <i className='bx bx-menu-alt-right' ></i>} </span>
             
            {menu && <div id="menu">
                            <div id="menu-add-movie">
                                <Link to="/fav">Favorite movies</Link>
                            </div>
                            <div id="menu-add-movie">
                                <Link to="/add">Add Movie</Link>
                            </div>
                </div>}
            </div>

            {searchword!="" && <div className="suggestion-box">
                                        <ul>
                                            {movienames!="" ? movienames.map((movie)=>{return (<Link to={`/moviedetails/${movie.id}`}><li onClick={()=>{setSearchword("")}}>{movie.moviename}</li></Link>)}) : <li>No Result</li> }
                                        </ul>
            </div> }
        </nav>
     );
}
 
export default Navbar;