import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import {FaExternalLinkAlt} from 'react-icons/fa'
import {TbPlaylistAdd} from 'react-icons/tb'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import {BsFillPlayBtnFill} from 'react-icons/bs'
// import {MdPlaylistAddCheck} from 'react-icons/md'

import {auth, provider, db} from '../../components/googleSignin/Config'
import { collection, addDoc } from "firebase/firestore"

import { Circle } from 'rc-progress';
import { notifyAddedWatchlist, notifymarkedFav, notifymovieplaying } from "../../App"


export default function Movie(){
    const [currentMovieDetail, setMovie] = useState()
    const { id } = useParams()
    const rating = currentMovieDetail? currentMovieDetail.vote_average : 0

    const handlePlay = ()=>{
        notifymovieplaying();
    }

    const handleWatchlistadd = async(e)=>{
        e.preventDefault()
        const userId = auth.currentUser.uid;
        console.log(userId)
        console.log("user_id:", userId);
        await addDoc(collection(db, "watchlist"), {
            MovieDetail: currentMovieDetail,
            userId: userId,

        });
       
        notifyAddedWatchlist();
    }
    
    const handleFav = async(e)=>{
        e.preventDefault()
        const userId = auth.currentUser.uid;
        console.log("user_id:", userId);
        await addDoc(collection(db, "favourites"), {
            MovieDetail: currentMovieDetail,
            userId: userId,

        });
        
        notifymarkedFav();
    }

    

    

    useEffect(() => {
        getData()
        window.scrollTo(0,0)
    }, [])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=f2beb8396b5fc9d1cb2d0a19d3ed6aeb&language=en-US`)
        .then(res => res.json())
        .then(data => setMovie(data))
    }

    return (
        <div className="w-full h-fit relative flex flex-col items-center">
            <div className="w-[80%]">
                <img alt="movie-banner" className="w-[100%]  h-[500px] object-cover  " src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
            </div>
            <div className=" items-center w-[75%] flex relative bottom-[225px] bg-grad1 ">
                <div className=" hidden md:flex mr-[35px]">
                    <div className="movie__posterBox">
                        <img alt="movie poster" className=" w-3/4 border rounded-xl shadow-[0_22px_40px_6px_rgba(0,0,0,0.86)] border-none " 
                        src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
                    </div>
                </div>
                <div className="flex flex-col h-[225px] md:h-[450px] justify-between text-lg md:text-xl font-normal md:translate-x-[-20%]">
                    <div className=" drop-shadow-lg mb-3">
                        <div className="font-bold text-3xl md:text-5xl">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating flex">
                        
                        <div className="w-[20px]  md:w-[30px] m-2">
                            <Circle
                             percent={(rating/10)*100}
                              strokeWidth={8}
                               strokeColor="#D3D3D3" /> 

                            </div>

                            {currentMovieDetail ? currentMovieDetail.vote_average + "/10": ""}
                             {/* <AiFillStar className='text-lg' /> */}
                            <span className="ml-6">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie-genres my-3 md:my-5">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                ? 
                                currentMovieDetail.genres.map(genre => (
                                    <><span className="p-2 mr-4 border-2 border-solid border-white rounded-full" id={genre.id}>{genre.name}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                        <div className="text-white text-3xl flex gap-8 px-4 mt-8">
                            <button onClick={handlePlay} className="hover:scale-150 transition ease-in-out duration-700">
                            <BsFillPlayBtnFill  className="text-yellow-500"/>
                            </button>
                            <button onClick={handleWatchlistadd} className="hover:scale-150 transition ease-in-out duration-700"><TbPlaylistAdd /></button>
                            <button onClick={handleFav} className="hover:scale-150 transition ease-in-out duration-700"><AiOutlineHeart /></button>
                        </div>
                    </div>
                    <div className="my-3 md:my-5">
                        <div className=" text-2xl md:text-2xl font-bold mb-2">Synopsis</div>
                        <div className="ml-auto text-sm md:text-base italic font-normal">{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                    
                    
                </div>
            </div>
            <div className="relative md:bottom-[120px] md:flex justify-between w-[75%] first-letter my-10 md:my-0">
                <div className="text-2xl md:text-4xl">Useful Links</div>
                {
                    currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} target="_blank" style={{textDecoration: "none"}}><p>
                        <span className="flex justify-center items-center my-4 md:my-0  py-2 px-6 text-black font-bold bg-orange-600 rounded-full hover:scale-110 transition ease-in-out duration-700">Homepage
                         <FaExternalLinkAlt className="mx-2 md:mx-4"/>
                         </span></p></a>
                }
                {
                    currentMovieDetail && currentMovieDetail.imdb_id && 
                    <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{textDecoration: "none"}}><p>
                        <span className="flex justify-center items-center py-2 px-6 text-black font-bold bg-yellow-500 rounded-full hover:scale-110 transition ease-in-out duration-700">IMDb
                    <FaExternalLinkAlt className="mx-2 md:mx-4"/></span></p></a>
                }
            </div>
            <div className="text-2xl md:text-4xl mt-4">Production companies</div>
            <div className="flex justify-center items-end mb-6 w-[85%]">
                {
                    currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
                        <>
                            {
                                company.logo_path 
                                && 
                                <span className="flex flex-col items-center justify-center">
                                    <img alt="movie prod company" className=" w-[100px] md:w-[200px] m-[2rem]" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span className="text-sm text-center md:text-lg">{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>
        </div>
    )
}
