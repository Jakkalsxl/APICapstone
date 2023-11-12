import React, { Component } from 'react';
import { Routes, Route  } from "react-router-dom";
import SearchPage from './Components/SearchPage';
import UserPage from './Components/UserPage';
import RepoPage from './Components/RepoPage';
import './styles/App.css';

class App extends Component{
  render (){
    return (
      <>
      {/* Define routes for different pages */}
        <Routes>
          <Route exact path="/" element={<SearchPage />}/>
          <Route path="/user/:username" element={<UserPage />} />
          <Route path="/repos/:username/:repoName" element={<RepoPage />} />
        </Routes>
      </>
    );
  }
}

export default App;
