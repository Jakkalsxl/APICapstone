import React, { Component } from 'react';
import '../styles/App.css';
import { Link } from "react-router-dom";
import searchIcon from "../free-magnifying-glass-icon-11.jpg";

class SearchPage extends Component {
    state = {
        user: '',
    };

    // Function to handle input change
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // Function to handle form submission
    handleSubmit = (e) => {
        e.preventDefault();
        const { user } = this.state;
        // Send GET request for users with the 'user' parameter in the URL
        fetch(`/${user}`, {
            method: "GET"
        })
        .then(response => response.json()) // Parse the response here
        .then(data => {
            // Handle the data received from the GitHub API
            this.setState({ userData: data})
        })
        .catch((error) => {
            console.error('Error finding user: ', error);
        });
    }

    render() {
        const { user, userData } = this.state;

        // Define icons
        const repoIcon = (<svg className='reposIcon' viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path></svg>)
        const followerIcon = (<svg className='followersIcon' viewBox="0 0 16 16" width="16" height="16" fill="currentColor" ><path d="M2 5.5a3.5 3.5 0 1 1 5.898 2.549 5.508 5.508 0 0 1 3.034 4.084.75.75 0 1 1-1.482.235 4 4 0 0 0-7.9 0 .75.75 0 0 1-1.482-.236A5.507 5.507 0 0 1 3.102 8.05 3.493 3.493 0 0 1 2 5.5ZM11 4a3.001 3.001 0 0 1 2.22 5.018 5.01 5.01 0 0 1 2.56 3.012.749.749 0 0 1-.885.954.752.752 0 0 1-.549-.514 3.507 3.507 0 0 0-2.522-2.372.75.75 0 0 1-.574-.73v-.352a.75.75 0 0 1 .416-.672A1.5 1.5 0 0 0 11 5.5.75.75 0 0 1 11 4Zm-5.5-.5a2 2 0 1 0-.001 3.999A2 2 0 0 0 5.5 3.5Z"></path></svg>)
        return (
            <>
                <form id='searchBar' onSubmit={this.handleSubmit}>
                    <div className='search-container'>
                        <input
                            type="text"
                            id="user"
                            name="user"
                            placeholder='Username'
                            value={user}
                            onChange={this.handleChange}
                        />
                        <button type='submit' className='search-button'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="2 2 40 40" >
                            <path className='green-magnifying-glass' fill="#231F20" d="M20.745,32.62c2.883,0,5.606-1.022,7.773-2.881L39.052,40.3c0.195,0.196,0.452,0.294,0.708,0.294 c0.255,0,0.511-0.097,0.706-0.292c0.391-0.39,0.392-1.023,0.002-1.414L29.925,28.319c3.947-4.714,3.717-11.773-0.705-16.205 c-2.264-2.27-5.274-3.52-8.476-3.52s-6.212,1.25-8.476,3.52c-4.671,4.683-4.671,12.304,0,16.987 C14.533,31.37,17.543,32.62,20.745,32.62z M13.685,13.526c1.886-1.891,4.393-2.932,7.06-2.932s5.174,1.041,7.06,2.932 c3.895,3.905,3.895,10.258,0,14.163c-1.886,1.891-4.393,2.932-7.06,2.932s-5.174-1.041-7.06-2.932 C9.791,23.784,9.791,17.431,13.685,13.526z"/> 
                        </svg>
                        </button>

                    </div>
                </form>
                {userData &&(
                    <Link className='link btn' to={`/user/${userData.login} `} state={{ userData }}>
                        <div className="container">
                            <div className="label username">{userData.login}</div>
                            <div className="label name">{userData.name}</div>
                            <div className="label bio">{userData.bio}</div>
                            <div className="label location">{userData.location}</div>
                            <div className="label repos">{repoIcon}{userData.public_repos}</div>
                            <div className="label followers">{followerIcon}{userData.followers}</div>
                            <div className="image"><img src={userData.avatar_url} width="70" height="70" alt={userData.login}/></div>
                        </div>
                    </Link>
                )}
            </>
        );
    }
}

export default SearchPage;