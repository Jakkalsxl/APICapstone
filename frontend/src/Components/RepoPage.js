import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import { useParams, useLocation } from "react-router-dom";

function RepoPage (){
    // Get username and repoName from route parameters and repoData from location state
    const { username , repoName } = useParams();
    const location = useLocation();
    const { repoData } = location.state

    // States to manage loading and data
    const [isLoading, setIsLoading] = useState(false);
    const [commitData, setCommitData] = useState([]);
    const [latestCommitData, setLatestCommitData] = useState([]);

    //Hook to get commit data
    useEffect(() => {
        //Fetch commit data
        setIsLoading(true);
        fetch(`/${username}/${repoName}/commits`, {
            method: "GET"
        })
        .then((responce) => responce.json())
        .then(data => {
            setCommitData(data); //Reset the commit data
            setIsLoading(false)
        }).catch(error => {
            console.error('Error fetching commit data:', error);
            setIsLoading(false);
        });
    },[username, repoName]);

    //Hook to get latest commit date
    useEffect(() => {
        fetch(`/${username}/${repoName}/latest`, {
            method: "GET"
        })
        .then((responce) => responce.json())
        .then(data => {
            setLatestCommitData(data); //Reset the latest commit data
        }).catch(error => {
            console.error('Error fetching commit data:', error);
        });
    },[])

    //Function to format date
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    }

    if (isLoading) {
        return <p>Loading...</p>;
    }
    if (!repoData || Object.keys(repoData).length === 0) {
        return <p>No repo data available.</p>;
    }

    return(
        <>
            <div className="RepoPageLayout">

                {/* Repo Information */}
                <div id='RepoPageInfo'>
                    <h1 id='RepoPageName'>{repoData.name} </h1>

                    {/* Description */}
                    <span id='RepoPageDescription'>
                        <p className='lable'>Description: </p>
                        <p className='data'>{repoData.description}</p>
                    </span>

                    {/* Owner */}
                    <span id='RepoPageOwner'>
                        <h2 className='lable'>Owner: </h2>
                        <h2 className='data'>{repoData.owner.login} </h2>
                    </span>

                    {/* Subscribers */}
                    <span id='RepoPageSubscribers'>
                        <p className='lable'>Subscribers: </p>
                        <p className='data'>{repoData.watchers_count} </p>
                    </span>

                    {/* Forks */}
                    <span id='RepoPageForks'>
                        <p className='lable'>Forks: </p>
                        <p className='data'>{repoData.forks_count}</p>
                    </span>

                    {/* Latest Commit */}
                    <span id='RepoPageLatestCommit'>
                        <p className='lable'>Latest Commit: </p>
                        <p className='data'>{formatDate(latestCommitData && latestCommitData.commit && latestCommitData.commit.commit && latestCommitData.commit.commit.author && latestCommitData.commit.commit.author.date ? latestCommitData.commit.commit.author.date : 'N/A')} 
                        </p>
                    </span>

                    {/* Creation Date */}
                    <span id='RepoPageCreationDate'>
                        <p className='lable'>Creation Date: </p>
                        <p className='data'>{formatDate(repoData.created_at)} </p>
                    </span>

                    {/* Last Updated Date */}
                    <span id='RepoPageLastUpdated'>
                        <p className='lable'>Last Updated: </p>
                        <p className='data'>{formatDate(repoData.updated_at)} </p>
                    </span>

                    {/* Link to repo page */}
                    <a href={`https://github.com/${username}/${repoName}`} target="_blank" id='RepoPageLink'><h3>GitHub Page</h3></a>
                </div>

                {/* Repo's Cmmits */}
                <div id='RepoPageCommits'>
                    <h1>Latest commits</h1>
                    {commitData.slice(0, 8).map((commit) => (
                        <div className='commit' key={commit.sha}>
                            <div className='topContainerRepoPageCommit'>
                                <a href={`https://github.com/Jakkalsxl/Art-Website/commit/${repoData.sha}`} target='_blank'>
                                    <h1 className="commitAuthor">Author: {commit.author.login} </h1>
                                </a>
                                <p className="commitCreationDate">Creation Date: {formatDate(commit.commit.author.date)} </p>
                            </div>
                            <div className='bottomContainerRepoPageCommit'>
                                <p className="commitMessage">Commit Message: {commit.commit.message} </p>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </>
    );
}

export default RepoPage;
