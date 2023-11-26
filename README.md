# Project 1 - Weather App
## Table of Contents
- [Project 1 - Weather App](#project-1---weather-app)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
    - [Features:](#features)
  - [Installation \& Setup](#installation--setup)
  - [Testing](#testing)
    - [What is tested?](#what-is-tested)
  - [Decisions](#decisions)
    - [Design](#design)
    - [Techicalities](#techicalities)
  - [Other](#other)

## Description
For our first project we decided to make a wether app over locations in norway, utilizing yr's and kartverket's APIs. 

### Features:
- Browsing today's weather data for you location of choice
- Marking locations as favorite for easy access
- Quick overview of the weather your favorite locations
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

Build the app:
```
npm run build
```

Run the app:
```
npm run preview
```
then click on the link given.

## Testing
To run tests:
```
npm run test
```

### What is tested?
- All components 
- All pages
- Usability and looks of the app on smaller screens is tested manually during development.

## Decisions
### Design
We decided to go with a simple design, with a focus on functionality. We wanted to make the app as easy to use as possible, and therefore decided to go with a simple design. But the simple design is none the less visually pleasing.

### Techicalities
- Search filtering is not stored between reloads since we found it more intuitive.
- We only show today's weather data therefore if you are past certain times the earlier weather data will be blanked out as a limitation of the API.

## Other
We have modified the website based on feedback thoughout the project. This is our final version of the website.