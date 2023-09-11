import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import {AiFillStar} from 'react-icons/ai'
import MoviesList from '../../components/moviesList/MoviesList';

function trimSentence(sentence, maxWords = 30) {
    
    const words = sentence.split(' ');
  
   
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
  
    return sentence;
  }

export default function Home() {
    const [ popularMovies, setPopularMovies ] = useState([])

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=f2beb8396b5fc9d1cb2d0a19d3ed6aeb&language=en-US")
        .then(res => res.json())
        .then(data => setPopularMovies(data.results))
    }, [])

  return (
    <div className='h-fit w-screen'>

        <div>
            <Carousel
            showThumbs={false}
            autoPlay={true}
            transitionTime={3}
            infiniteLoop={true}
            showStatus={false}
            >
                {
                        popularMovies.map(movie => (
                            <Link style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.id}`} >
                                <div className="h-96 md:h-[600px]">
                                    <img alt='movie poster' className=' block w-full m-auto' src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                                </div>
                                <div className=" p-10 md:p-20 w-screen h-3/4 bg-grad1
                                  text-left bottom-0 absolute opacity-100 delay-[0.3s]
                                 transition-opacity">
                                    <div className=" font-extrabold text-3xl md:text-6xl md:my-3 ">{movie ? movie.original_title: ""}</div>
                                    <div className=" flex md:mb-3 text-xl md:text-3xl">
                                        {movie ? movie.release_date : ""}
                                        <span className=" ml-6 md:ml-12 flex">
                                            {movie ? movie.vote_average :""}
                                            <AiFillStar className=' text-3xl md:text-4xl' />{" "}
                                        </span>
                                    </div>
                                    <div className=' md:grid grid-cols-3'>
                                    <div className=" hidden md:flex text-base italic font-normal col-span-2">{movie ? movie.overview : ""}</div>
                                    {/* android devices */}
                                    <div className=" text-xs  italic font-normal md:hidden col-span-2">{movie ? trimSentence(movie.overview) : ""}</div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
            </Carousel>
            <MoviesList/>
        </div>
        </div>
  )
}
