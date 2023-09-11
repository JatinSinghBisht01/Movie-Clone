import React, {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import {auth, provider} from '../googleSignin/Config'
import {signInWithPopup} from 'firebase/auth'
import { notifyLogin, notifyLogout } from '../../App'
import SearchForm from '../searchbox/SearchForm'

// const MenuItems = () =>{
//   return (
//     <>
//     <div className=' text-center w-fit h-fit absolute left-10 bg-white '>
//         <li>
//         <Link className='transition duration-700 ease-in-out hover:text-yellow-300 hover:scale-110' to="/watchlist" style={{textDecoration: "none"}}><span>Watchlist</span></Link>
//         </li>
//         <li>
//         <Link className='transition duration-700 ease-in-out hover:text-yellow-300 hover:scale-110' to="/favourites" style={{textDecoration: "none"}}><span>Favourites</span></Link>
//         </li>
//     </div>
//     </>
//   ) 
// }

export default function Navbar() {
  const [value, setValue] = useState('')

  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  const handleClick = () =>{
    signInWithPopup(auth, provider).then((data)=>{
      setValue(data.user.email)
      localStorage.setItem("email", data.user.email)
      notifyLogin()

    })
  }

  const logout = ()=>{
    localStorage.clear();
    window.location.reload()
    notifyLogout()
  }

  useEffect(()=>{
    setValue(localStorage.getItem('email'))
    
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        
        setMenuVisible(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [])

  
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };
  

  return (
    <div className=' flex justify-between'>
      
        <div className='flex gap-6'>
            <Link to="/" className=''>
                  <img alt='logo' className=' cursor-pointer w-20' 
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png'/> 
                 
                </Link>
                
                <div className='hidden text-xl items-center md:flex gap-4'>
                <Link className='transition duration-700 ease-in-out hover:text-yellow-300 hover:scale-110' to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
                <Link className='transition duration-700 ease-in-out hover:text-yellow-300 hover:scale-110' to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
                <Link className='transition duration-700 ease-in-out hover:text-yellow-300 hover:scale-110' to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
               

                </div>
              <SearchForm/>
                
        </div>
      
       
        <div className='flex'>
          
            {!value && (<button onClick={handleClick} className=' p-2 rounded-md border border-yellow-300 transition duration-700 ease-in-out hover:text-yellow-300 hover:scale-110'>Sign In</button>)}
            {value && (
            <div className='w-fit h-fit border-2 border-yellow-300 rounded-full hover:scale-110  transition ease-in-out duration-500  hover:text-yellow-200'>
            <button onClick={toggleMenu} className='rounded-full w-10 h-10 text-center font-bold text-2xl '>
              {value[0].toUpperCase()}
      
             </button>
      
            </div>)
            }
            
            
            
        </div>
        {menuVisible && (
        <div className="absolute mt-2 w-fit right-[1%] z-10 top-[10%] bg-white border border-yellow-300 rounded-md shadow-lg">
          <ul>
            <li>
              <Link
                to={"/watchlist"}
                className="block px-4 py-2 text-gray-800 hover:bg-slate-100 transition ease-in-out duration-500"
              >
                Watchlist
              </Link>
            </li>
            <li>
              <Link
                to={"/favourites"}
                className="block px-4 py-2 text-gray-800 hover:bg-slate-100 transition ease-in-out duration-500"
              >
                Favourites
              </Link>
            </li>
            <hr className='h-[10%] w-[75%] rounded-lg translate-x-[17%] bg-slate-700 '/>
            <li>
              <Link onClick={logout}
                to={""}
                className="block px-4 py-2 text-gray-800 hover:bg-slate-100 transition ease-in-out duration-500"
              >
                Sign out
              </Link>
            </li>
          </ul>
        </div>
      )}
     </div>
  )
}
