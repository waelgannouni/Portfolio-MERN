import React, { useEffect, useState } from "react";
import Sidebar from "./SearchSidebar";
import axios from "axios";
import {Link, useNavigate } from "react-router-dom";

function Home() {
const navigate = useNavigate();
const [users, setUsers] = useState([""]);
const [search, setSearch] = useState("");
const [searchResults, setSearchResults] = useState([]);

useEffect(() => {
    getUsers();
}, []);

const getUsers = async () => {
    const response = await axios.get("http://localhost:3060/users/");
    setUsers(response.data);
};


const handleSearch = async (e) => {
    e.preventDefault();
    if (search === "") {
    setSearchResults([]);
    } else {
        setSearchResults(users.filter((user) => user.fullname.toLowerCase().includes(search.toLowerCase())));
    }
    };

return (
    <>
    <main>
    

              <div className="main-content">
              <form onSubmit={handleSearch} className="search">
                  <Link to="/profile">Profile{}</Link>
                  <input
                  placeholder="Enter the username"
                  className="search"
                  value={search}
                  onChange={(e) => {
                      setSearch(e.target.value);
                  }}
                  />
                  <button className="search-btn" type="submit">Search</button>
              </form>

              </div>
        <div>

      {searchResults.length > 0 ? (
          searchResults.map((user,index) =>(
              !user ?
              <h1 className="messages">No results found</h1>
              :
              
              <Sidebar user={user} key={index}/>
              
              ))
              )
              : search === "" ?
              (
                  <h1 className="messages">Please enter a name to search</h1>
                  ) :null}
            </div>

    </main>
    </>
  );
  
}

export default Home;