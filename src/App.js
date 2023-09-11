import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import MoviesList from "./components/moviesList/MoviesList";
import Movie from "./pages/moviedetails/movie";


// api key = f2beb8396b5fc9d1cb2d0a19d3ed6aeb
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Results from "./pages/searchresults/Results";
import Favourites from "./pages/favourites/Favourites";
import Watchlater from "./pages/watchlater/Watchlater";

  export const notifyLogin = () => {
    toast.success('You are logged in', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  
  };
  export const notifyLogout = () => {
    toast.info('You are logged out', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  
  };

  export const notifymovieplaying = ()=>{
    toast.success('Playing Movie', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }

  export const notifyAddedWatchlist = ()=>{
    toast.success('Movie added to watchlist', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }
  export const notifyalreadyexists = ()=>{
    toast.info('Movie already exists', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }
  export const notifyRemovedWatchlist = ()=>{
    toast.info('Movie removed from watchlist', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }

  export const notifymarkedFav = ()=>{
    toast.success('Movie marked Favourite', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }
  export const notifyunmarkedFav = ()=>{
    toast.info('Movie unmarked from Favourites', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }

  export const notifyError = () => {
    toast.error('There might be some error, try after sometime or contact admin', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  };

  export const notifyLoginnotFound = () => {
    toast.error('Login to add movies to watchlist or favourites', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  
  };

function App() {
  return (
    <div className=" bg-black w-screen h-fit text-white font-sans text-lg font-semibold">
      <Router>
        <Header/>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="movie/:id" element={<Movie/>}/>
          <Route path="movies/:type" element={<MoviesList/>}/>
          <Route path="search/:query" element={<Results/>}/>
          <Route path="/watchlist" element={<Watchlater/>}/>
          <Route path="/favourites" element={<Favourites/>}/>
          <Route path="/*" element={<h1>Error Page</h1>}/>
        </Routes>
      </Router>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        />
      
    </div>
  );
}

export default App;
