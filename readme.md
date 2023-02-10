# LA Street API
This NodeJS application is designed to be the backend for the LA Street Application
https://github.com/elainelin313/LAstreet

# How to Run
`npm init`: Installs the packages
`npm start`: Starts the server


# Endpoints
- `/` - Heartbeat, checks if server is running. 
- `/filterFeatures` - Returns a list of features that can be filtered
- `/feature` - gets a feature
    parameter: id - the ID of an object
- `/findFeatures` - returns a list of features given list of filters
