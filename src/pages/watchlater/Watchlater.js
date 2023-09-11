import React, { useState, useEffect } from 'react'; 
import { db, auth } from '../../components/googleSignin/Config';  
import { collection, query, where, getDocs } from 'firebase/firestore'; 
import Cards from '../../components/cards/Cards';

 
 
const Watchlater = () => { 
  const [watchMovies, setWatchMovies] = useState([]); 
  const loggedInTrue = sessionStorage.getItem("email")
  
  useEffect(() => { 
    const fetchWatchMovies = async () => { 
      const userId = auth.currentUser.uid; 
      const watchRef = collection(db, 'watchlist'); 
      const q = query(watchRef, where('userId', '==',userId)); 
   
      const querySnapshot = await getDocs(q); 
   
      const watchMoviesData = []; 
      querySnapshot.forEach((doc) => { 
        watchMoviesData.push({ id: doc.id, movieDetail: doc.data() }); 
      }); 
   
      setWatchMovies(watchMoviesData); 
      console.log(watchMoviesData); 
    }; 
   
    fetchWatchMovies(); 
  }, []); 

   
  return ( 
    <div className="p-2 md:p-10 h-screen w-screen">
            <h2 className=" text-xl px-6 mb-5 md:text-3xl md:px-12 md:mb-10">WATCH LATER</h2>
            {watchMovies.length === 0 && (
                <h2 className=" text-base px-6 mb-5 md:text-xl md:px-12 md:mb-10">NOTHING HERE!</h2>
            )}
            {watchMovies.length>0 && (
                <div className="flex justify-center flex-wrap">
                {
                    watchMovies.map(movie => (
                        <Cards movie={movie.movieDetail.MovieDetail} /> 
                    ))
                }
            </div>
            )}
        </div>
  ); 
} 
 
export default Watchlater;