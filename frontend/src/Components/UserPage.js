import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import { Link, useParams, useLocation } from "react-router-dom";

function UserPage(props){
    // Get the username from route parameters and userData from location state
    const { username } = useParams();
    const location = useLocation();

    // States to manage loading and data
    const [userData, setUserData] = useState(location.state?.userData || null); // Store state given from searchPage
    const [repoData, setRepoData] = useState([]); // Repo data
    const [isLoading, setIsLoading] = useState(false);
    
    //Hook to get user data
    useEffect(() => {
        if (!userData){
            //Fetch data if there is none
            setIsLoading(true);
            fetch(`/${username}`, {
                method: "GET"
            })
            .then((responce) => responce.json())
            .then(data => {
                console.log("Fetched user data:", data);
                setUserData(data); //Reset the user data
                setIsLoading(false)
            }).catch(error => {
                console.error('Error fetching user data:', error);
                setIsLoading(false);
            });
        }
    }, [username]);

    //Hook to get repo data
    useEffect(() => {
        //Fetch repo data
        fetch(`/${username}/repos`, {
            method: "GET"
        })
        .then(response => response.json()) // Parse the response here
        .then(data => {
            // Handle the data received from the GitHub API
            setRepoData(data);
        })
        .catch((error) => {
            console.error('Error finding user: ', error);
        });
    },[username]);

    // Function to format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (!userData || Object.keys(userData).length === 0) {
        return <p>No user data available.</p>;
    }
    
    return (
        <>
            <div className="UserPageLayout">
                {/* User Information */}
                <div id='UserPageUserInfo'>
                    <img id='UserPageImage' src={userData.avatar_url} width="400" height="400" alt={userData.logig}/>
                    <a href={`https://github.com/${userData.login}`} target="_blank"><h2 id='UserPageUsername'>{userData.name}</h2></a>
                    <p id='UserPageName'>{userData.login}</p>
                    <p id='UserPageBio'>{userData.bio}</p>
                    <span id='UserPageJoinDate'>
                        <p className='lable'>Joined: </p>
                        <p className='data'>{formatDate(userData.created_at)}</p>
                    </span>
                    <span id='UserPageFollowers'>
                        <p className='lable'>Followers: </p>
                        <p className='data'>{userData.followers}</p>
                    </span>
                </div>


                {/* User's Repositories */}
                <div id='UserPageRepos'>
                    <h1>Latest Repos</h1>
                    {repoData.slice(0, 5).map((repo) => (
                        <Link
                            className='link btn'
                            to={`/repos/${userData.login}/${repo.name}`}
                            state={{ repoData: repo }}
                        >
                            <div className='repo' key={repo.id}>
                                <div className='topContainerUserPageRepo'>
                                    <h1 className="repoName">{repo.name}</h1>
                                    <p className="repoCreationDate">{formatDate(repo.created_at)}</p>
                                </div>
                                <div className='bottomContainerUserPageRepo'>
                                    <p className="repoOwner">Owner: {repo.owner.login}</p>
                                    <p className="repoWatchers">Watchers: {repo.watchers}</p>
                                    <p className="repoForks">Forks: {repo.forks_count}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>


            </div>
        </>
    );
}
export default UserPage;
