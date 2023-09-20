# Project 1 - Weather App
## Table of Contents
- [Project 1 - Weather App](#project-1---weather-app)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
    - [Features:](#features)
  - [Installation \& Setup](#installation--setup)
  - [Requirements](#requirements)
    - [Techical requirements](#techical-requirements)
    - [Functional requirements](#functional-requirements)
  - [Testing](#testing)
  - [Decisions](#decisions)
    - [Design](#design)
    - [Techicalities](#techicalities)
  - [Contributions](#contributions)

## Description
For our first project we decided to make a wether app over locations in norway, utilizing yr's and kartverket's APIs. 

### Features:
- Browsing today's weather data for you location of choice
- Marking locations as favorite for easy access
- A sleak and simple design

## Installation & Setup
To run the app locally follow instructions bellow (*you need to have [Node.js](https://nodejs.org/en/) v20.5+ installed*)

Clone repository:
```
git clone https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-37/prosjekt-1.git
```

Install dependencies:
```
npm install
```

Run the app:
```
npm run preview
```
then click on the link given.

## Requirements
To satisfy the assignment requirements we have:
### Techical requirements
- Used React + Vite and Typescript
- Used a third party API and used TanStack Query to fetch data from it
- Used HTML Web Storage API to store favorites
- Used React Router to navigate between pages
- Used media queries to make the website responsive

### Functional requirements
- User gets shown one resource at a time by accessing the weather page for the chosen location through the search bar or clicking on a favorite then clicking the "Se mer info" bellow or in the sidebar.
- User can filter search results by Fylke by using the dropdown menus in the sidebar.
- User can add to favorites by clicking the heart button on the weather page.
- All pages are responsive and work on mobile devices.
- All pages are structured well and estehtically pleasing.
  
## Testing
To run tests:
```
npm run test
```

We have done some minimal testing of the website (mainly the weather page), this includes:
- Testing that the website renders correctly
- Testing that the website renders data properly

all tests are preformed using mock data.

## Decisions
### Design
We decided to go with a simple design, with a focus on functionality. We wanted to make the app as easy to use as possible, and therefore decided to go with a simple design. But the simple design is none the less visually pleasing.

### Techicalities
- Search filtering is not stored between reloads since we found it more intuitive.
- We only show today's weather data therefore if you are past certain times the earlier weather data will be blanked out as a limitation of the API.
- The home page currently only shows mock data, as we did not have time to implement the API to work as such.
- When it comes to the weather data in the future we decided to not implement this functionality this time arround. But we plan to implement it in the future.
- Testing is very minimal, but we plan on making more tests in the future.


## Contributions
- Mattias:
  - Design of home page
  - Coding and styling of home page
  - Search functionality
  - Filtering functionality

- Simon:
  - Design of weather page
  - Coding and styling of weather page
  - Favorites functionality
  - Api implementations
  - Testing

- Eduard:
  - Set up of vm and apache server
  - Optimization of home page for smaller screens
  - Optimization of weather page for smaller screens
  - Writing of README.md and other documentation
