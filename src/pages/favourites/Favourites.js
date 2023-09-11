import React, { useState, useEffect } from 'react'; 
import { db, auth } from '../../components/googleSignin/Config';  
import { collection, query, where, getDocs } from 'firebase/firestore'; 
import Cards from '../../components/cards/Cards';

 
 
const Favourites = () => { 
  const [favoriteMovies, setFavoriteMovies] = useState([]); 
 
  useEffect(() => { 
    const fetchFavoriteMovies = async () => { 
      const userId = auth.currentUser.uid; 
      const favoritesRef = collection(db, 'favourites'); 
      const q = query(favoritesRef, where('userId', '==',userId)); 
   
      const querySnapshot = await getDocs(q); 
   
      const favoriteMoviesData = []; 
      querySnapshot.forEach((doc) => { 
        favoriteMoviesData.push({ id: doc.id, movieDetail: doc.data() }); 
      }); 
   
      setFavoriteMovies(favoriteMoviesData); 
      console.log(favoriteMoviesData); 
    }; 
   
    fetchFavoriteMovies(); 
    
  }, []); 

   
  return ( 
    <div className="p-2 md:p-10 h-screen w-screen">
            <h2 className=" text-xl px-6 mb-5 md:text-3xl md:px-12 md:mb-10">FAVOURITE</h2>
            {favoriteMovies.length === 0 && (
                <h2 className=" text-base px-6 mb-5 md:text-xl md:px-12 md:mb-10">NOTHING HERE!</h2>
            )}
            {favoriteMovies.length > 0 && (
                <div className="flex justify-center flex-wrap">
                {
                    favoriteMovies.map(movie => (
                        <Cards movie={movie.movieDetail.MovieDetail} /> 
                    ))
                }
            </div>
            )}
            
        </div>
  ); 
} 
 
export default Favourites;