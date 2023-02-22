import React, { useEffect } from 'react'
import {  Link } from "react-router-dom";
import { logout,getUsers } from "../app/authslice";
import { useDispatch } from "react-redux";


function About() {
    const dispatch = useDispatch();
 
    const fetchdata = ()=>{
      dispatch(getUsers());
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(logout());
    };
  return (
    <div>
        <div>About</div>
        <Link
        to="/"
        className="relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        home
      </Link>
      test
      <Link
        to="/about"
        className="relative flex mt-2 justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        about
      </Link>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Logout
            </button>
          </div>
        </form>

    </div>
  )
}

export default About;