import { useEffect, useState } from "react";
import MoviesList from "./MoviesList";

const Favorites = () => {

    let [fav, setfav] = useState(null);

    useEffect(()=>{
        setfav(JSON.parse(localStorage.getItem("fav")))
    },[])


    return ( 
        <div>
            {fav && <MoviesList movies={fav} title="Favorite movies"/>}
        </div>
     );
}
 
export default Favorites;