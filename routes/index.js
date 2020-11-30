var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const token = process.env.GITHUB_TOKEN;
const rootURL = 'https://api.github.com/';

// router.get('/', function(req, res, next) {
//   const username = req.query.username;
//   // If this is not a "search", just render the index view
//   if (!username) return res.render('index', {userData: null});
//   const options = {
//     header: {
//       Authorization: `token ${token}`
//     }
//   };
//   let userData;
//   // For now, we'll pass the token in a querystring
//   fetch(`${rootURL}users/${username}`, options)
//     .then(res => res.json())
//     .then(user => {
//       userData = user;
//       return fetch(user.repos_url, options);
//     })
//     .then(res => res.json())
//     .then(repos => {
//       console.log(repos[0])
//       userData.repos = repos;
//       res.render('index', { userData });
//     })
// });

router.get('/', async function(req, res, next) {
  const username = req.query.username;
  if (!username) return res.render('index', {userData: null});
  const options = {
    headers: {
      Authorization: `token ${token}`
    }
  };
  // This is a search for a user
  const userData = await fetch(`${rootURL}users/${username}`, options).then(res => res.json());
  const repos = await fetch(userData.repos_url, options).then(res => res.json());
  userData.repos = repos;
  res.render('index', { userData });
});

router.get('/', function(req, res, next) {
  const username = req.query.username;
  console.log(`username: ${username}`);
  res.render('index');
});

module.exports = router;
