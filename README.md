# developerprofilegenerator

This app will generate a PDF image of a profile from github.

## User Stories

```
AS A product manager
I WANT a developer profile generator
SO THAT I can easily prepare reports for stakeholders
```
## How to use

```
node index.js
```

The user will be prompted with a github username input, and then to pick a color for their background.

The PDF will be populated with the following:

* Profile image
* User name
* Links to the following:
  * User location via Google Maps
  * User GitHub profile
  * User blog
* User bio
* Number of public repositories
* Number of followers
* Number of GitHub stars
* Number of users following

## Tech Stack

1. HTML
2. CSS
3. Javascript
4. Node.js File System
5. Inquirer.js
6. axios
7. Puppeteer




