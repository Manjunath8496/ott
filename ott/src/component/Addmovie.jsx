import { useRef } from "react";
import { useNavigate } from "react-router-dom"

const Addmovie = () => {

    let navigate = useNavigate();
    let moviename = useRef();
    let hero = useRef();
    let heroine = useRef();
    let director = useRef();
    let genre = useRef();
    let poster = useRef();
    let trailer = useRef();
    let release = useRef();
    let rating = useRef();
    let synopsis = useRef();

    function handleAddmovie(e){
        e.preventDefault();

        // create new movie object
        let newmovie = {
            moviename: moviename.current.value,
            hero: hero.current.value,
            heroine: heroine.current.value,
            director: director.current.value,
            languages: [],
            genre: genre.current.value,
            poster: poster.current.value,
            trailer: trailer.current.value,
            release: release.current.value,
            rating: rating.current.value,
            synopsis: synopsis.current.value
        }
        
        let options = document.getElementsByName("lang");

       for (let i = 0; i < options.length; i++) {
        if(options[i].checked==true)
            {
                newmovie.languages.push(options[i].value)
            }
       }

       // send the movie obj to the database
       fetch(" http://localhost:4000/movies" , {
                                                method:"POST",
                                                headers:{"Content-Type" : "application/json"},
                                                body:JSON.stringify(newmovie)
                                                })
    .then(()=>{
        alert("New movie added to database");
        navigate("/");
    })
}

    return ( 
        <div className="add-movie">
            <h1>Add New Movie</h1>
            
            <form onSubmit={handleAddmovie}>
                <input type="text" placeholder="Movie Name" ref={moviename}/>
                <input type="text" placeholder="Hero" ref={hero}/>
                <input type="text" placeholder="Heroine" ref={heroine}/>
                <input type="text" placeholder="director" ref={director}/>
                <fieldset>
                    <legend>Select Languages</legend>
                    <input type="checkbox" name="lang" value={"Kannada"} id="ka"/><label htmlFor="ka">Kannada</label>
                    <input type="checkbox" name="lang" value={"Hindi"} id="hi"/><label htmlFor="hi">Hindi</label>
                    <input type="checkbox" name="lang" value={"Tamil"} id="tm"/><label htmlFor="tm">Tamil</label>
                    <input type="checkbox" name="lang" value={"Telugu"} id="tl"/><label htmlFor="tl">Telugu</label>
                    <input type="checkbox" name="lang" value={"Malayalam"} id="ml"/><label htmlFor="ml">Malayalam</label>
                </fieldset>
                <input type="text" placeholder="Genre" ref={genre}/>
                <input type="url" placeholder="Poster url" ref={poster}/>
                <input type="url" placeholder="Trailer url" ref={trailer}/>
                <input type="number" placeholder="Release date" min={1950} max={2024} ref={release}/>
                <input type="number" placeholder="Rating" min={1} max={10} step={0.1} ref={rating}/>
                <textarea ref={synopsis}></textarea>
                <input type="submit" value={"Add Movie"}/>
            </form>
        </div>

     );
}

export default Addmovie;