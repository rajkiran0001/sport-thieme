
a single page React app communicating with GraphQL API v4 of GitHub

Features
* Displaying the following information regarding a chosen repo (selected via a text input field with user name/repo name. eg. nuwave/lighthouse ) in a tab view

* List of pull requests
* List of open issues
* List of closed issues

* Clicking on an issue will display a detailed view of the issue including:

- A list of corresponding comments related to this issue in chronological order
- A search box for filtering comments (directly in the app, without re-fetching the data)

- The end user has a possibility to input their outh token and a target repo

Installation
* git clone 
* cd sport-thieme
* npm install
* Get your own token from github
 - scopes/permissions you need to check: admin:org, repo, user, notifications
* npm start
* visit http://localhost:3000
