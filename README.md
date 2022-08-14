# weatherApp

##Introduction

This weather application can be used for any city in the world showing current and weekly forecasted weather using the openWeather API. 
It also uses the Unsplash API to display a random background image of the searched city by the user.

##How it Works

Via the input search bar the user can type any city in the world and by pressing the submit button, the application will then search and
fetch the data and display it across the application set through the DOM elements. If the city is spelt incorrectly or the city does not
exist, an error will be thrown at the user.

##What is displayed

Throughout the application the user will recieve data such as:
    - Date and time
    - The specified city/country that was inputted
    - Description of the current weather
    - Wind and humidity
    - Current Temperature in degrees celcius
    - Current weather icon
    - A displayed weekly forecast for the next consecutive five days with the day, icon and temperature
    - A random image set to the background of the searched city
    
##Tech Stack

The tech stack used throughout this application is:
    - HTML
    - CSS
    - Vanilla Javascript
    
With Vanilla JS the parralled async/await functions were used to fetch the data from the OpenWeather and Unspash API. Accompanied by 
destructuring to get the necessary data from the JSON response and assign it to the DOM Elements for display to the user.
