const fetch = require("node-fetch")
const EXPRESS = require('express')
const BODYPARSER = require('body-parser')
const APP = EXPRESS()
const HELMET = require('helmet')
const PORT = process.env.PORT || 8080

require('dotenv').config()

APP.use(EXPRESS.static('public')) // Serve static files from the 'public' directory
APP.use(EXPRESS.json()) // Parse incoming JSON requests
APP.use(BODYPARSER.urlencoded({ extended: true })) // Parse incoming form data

// Use Helmet for enhanced security
APP.use(HELMET())

// Function to get the user data
function getUsers(req, res) {
  const username = req.params.user
  const githubApiUrl = `https://api.github.com/users/${username}`
  
  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    }
  }

  fetch(githubApiUrl, config)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(data => {
      res.json(data) // Send the GitHub API response to the client
    })
    .catch(error => {
      console.error('Error searching user:', error)
      res.status(500).json({ error: 'An error occurred while fetching user data' })
    })
}

// Function to get the repos data
function getRepos(req, res){
  const username = req.params.user
  const githubApiUrl = `https://api.github.com/users/${username}/repos`
  
  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    }
  }

  fetch(githubApiUrl, config)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(data => {
      res.json(data) // Send the GitHub API response to the client
    })
    .catch(error => {
      console.error('Error searching repos:', error)
      res.status(500).json({ error: 'An error occurred while fetching repo data' })
    })
}

// Function to get the commits data
function getCommits(req, res){
  const username = req.params.user
  const repoName = req.params.repo
  const githubApiUrl = `https://api.github.com/repos/${username}/${repoName}/commits`
  
  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    }
  }

  fetch(githubApiUrl, config)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(data => {
      res.json(data) // Send the GitHub API response to the client
    })
    .catch(error => {
      console.error('Error searching commits:', error)
      res.status(500).json({ error: 'An error occurred while fetching commit data' })
    })
}

// Function to get the latest commit data
function getLatestCommit(req, res){
  const username = req.params.user
  const repoName = req.params.repo
  const githubApiUrl = `https://api.github.com/repos/${username}/${repoName}/branches/master`
  
  const config = {
    headers: {
      'Authorization': `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
    }
  }
    fetch(githubApiUrl, config)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(data => {
      console.log(data)
      res.json(data) // Send the GitHub API response to the client
    })
    .catch(error => {
      console.error('Error searching commits:', error)
      res.status(500).json({ error: 'An error occurred while fetching commit data' })
    })
}

// Define routes for various API endpoints
APP.get('/:user', getUsers)
APP.get('/:user/repos', getRepos)
APP.get('/:user/:repo/commits', getCommits)
APP.get('/:user/:repo/latest', getLatestCommit)

// Listen for responses on the given port
APP.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`)
})