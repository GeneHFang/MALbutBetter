# MAL Browser WIP project

## By GeneFang and [Myschu](https://github.com/Myschu)

### This project is currently a front-end only ReactJS project that uses [Jikan, the unofficial MyAnimeList API](https://jikan.docs.apiary.io/) to browse a more compact version of [MyAnimeList](https://myanimelist.net/).

### To run:
  0. Ensure you have [node package manager installed](https://nodejs.org/en/download) and that you are able to use `npm` commands in your command line
  1. Either
   *clone the mal-project-frontend folder
   *OR clone the entire repository and navigate to the mal-project-folder
  2. In the mal-project-frontend directory, run `npm install` on the command line
  3. In the same directory, run `npm start` to start the project. 
  4. Your default web browser should open a new tab to the project. 



### Current Status
  As of 12-04-2020
  + Dynamically scaling CSS layout for single Anime/Manga pages as well as User pages
  + Sort, filter, search functionality for User's Anime/Manga list tabs
  + Interesting text added
  
  
  As of 10-14-2020
  + Dynamically scaling tiles based on window resolution/device
  + Individualized user statistics on User pages
  + Error pages when bad/no results
  
  As of 9-10-2020
  + Browse top Manga or Anime in highest overall rank to lowest
  + Search (uses Jikan's search endpoint)
   + Manga or Anime by name
   + User by MyAnimeList username
  + See individual Manga or Anime information per info available from MyAnimeList
  

### Known issues and development notes
  As of 12-04-2020
  
  + Searching for an Anime from the user page's Manga list tab will result in api fetches of the Manga endpoint
  + ~~User list anime/manga only fetches the api page limit of 300 (currently no way to see 301st+)~~
  + ~~Manga pages have no content~~
  + ~~Have no interesting text yet~~
  + ~~There is currently no error handling related to search queries that don't return any results~~
  + ~~User profile page is currently under development and lacks both polish and functionality~~
  + ~~Search queries are currently erased when searching~~
