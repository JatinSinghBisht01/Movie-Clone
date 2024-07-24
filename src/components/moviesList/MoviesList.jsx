import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "../cards/Cards";

export default function MoviesList() {
  const [movieList, setMovieList] = useState([]);
  const { type } = useParams();

  useEffect(() => {
    const getData = () => {
      fetch(
        `https://api.themoviedb.org/3/movie/${
          type ? type : "popular"
        }?api_key=f2beb8396b5fc9d1cb2d0a19d3ed6aeb&language=en-US`
      )
        .then((res) => res.json())
        .then((data) => setMovieList(data.results));
    };
    getData();
  }, [type]);

  return (
    <div className="p-2 md:p-10">
      <h2 className=" text-xl px-6 mb-5 md:text-3xl md:px-12 md:mb-10">
        {(type ? type : "POPULAR").toUpperCase()}
      </h2>
      <div className="flex justify-center flex-wrap">
        {movieList.map((movie) => (
          <Cards movie={movie} />
        ))}
      </div>
    </div>
  );
}
