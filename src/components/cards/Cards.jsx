import React, { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'

export default function Cards({movie}) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, []) 

  return (
    <>
    {
        isLoading
        ?
        <div className=" inline-block transition animate-pulse
        duration-300 transform relative rounded-lg overflow-hidden m-1 cursor-pointer min-w-[100px] h-[150px] md:min-w-[200px] md:h-[300px] z-0 border border-solid border-gray-500 border-b-2
        hover:scale-[1.2] hover:z-40">
            <SkeletonTheme color="#202020" highlightColor="#444">
                <Skeleton height={300} duration={2} />
            </SkeletonTheme>
        </div>
        :
        <Link to={`/movie/${movie.id}`} style={{textDecoration:"none", color:"white"}}>
            <div className="inline-block transition
        duration-300 transform relative rounded-lg overflow-hidden m-1 cursor-pointer min-w-[100px] h-[150px] md:min-w-[200px] md:h-[300px] z-0 border border-solid border-gray-500 border-b-2
        hover:scale-[1.2] hover:z-40">
                <img alt='card img' className="h-[150px] md:h-[300px]" src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} />
                <div
                 className=" absolute p-3 bottom-0 h-full flex flex-col w-full justify-self-end bg-grad1 opacity-0 transition-opacity hover:opacity-100 duration-[0.2s]">
                    <div className='p-1 bottom-0 absolute'>
                    <div className=" font-bold">{movie?movie.original_title:""}</div>
                    <div className=" text-sm">
                        {movie?movie.release_date:""}
                        <span className=" float-right flex text-sm">{movie?movie.vote_average.toFixed(1): 10}<AiFillStar className='text-lg' /></span>
                    </div>
                    <div className=" text-xs italic font-normal mb-1">{movie ? movie.overview.slice(0,118)+"..." : ""}</div>
                    </div>
                </div>
            </div>
        </Link>
    }
    </>
    
  )
}

