import Addmovie from "./component/Addmovie";
import Favorites from "./component/Favorites";
import Home from "./component/Home";
import Moviedeatails from "./component/Moviedeatails";
import Navbar from "./component/Navbar";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SearchPage from "./component/SearchPage";
import Editmovie from "./component/Editmovie";

function App()
{
  return (
    <BrowserRouter>
    <div className="app">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/add" element={<Addmovie/>}></Route>
        <Route path="/moviedetails/:id" element={<Moviedeatails/>}></Route>
        <Route path="/fav" element={<Favorites/>} />
        <Route path="/search/:searchword" element={<SearchPage/>}></Route>
         <Route path="/edit/:id" element={<Editmovie/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;