import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function SearchForm() {
//   const [searchTerm, setSearchTerm] = useState({
//     search: '',
//   });
const [ search, setSearch ] = useState(''); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    // const { name, value } = e.target;
    // setSearchTerm({ ...searchTerm, [name]: value });
    const inputValue = e.target.value; 
    setSearch(inputValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${search}`);
  };

  return (
    <>
      <div
        className='rounded-full bg-white hidden md:flex w-fit p-2 px-4'
        
      >
        <div className='flex justify-center'>
          <input
            type='text'
            onChange={handleChange}
            value={search} 
            className='italic focus:outline-none text-black'
            placeholder='Search Movies...'
          />
          <button type='submit' className='' onClick={handleSubmit}>
            <FaSearch
              size={20}
              className='text-yellow-300 hover:scale-150 transition ease-in-out duration-700'
            />
          </button>
        </div>
      </div>
    </>
  );
}
