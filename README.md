# city-bikes-cli

This is a command-line interface for checking the status of your local
bike-sharing stations.

## Usage
```
$ bikes cities boston
> 
$ BIKE_CITY='boston'
$ bike stations
> lkjsdf
$ bike station seaport
> lskdf
```

commands:
- list cities
- get all stations in a city
- get available bikes/open docks for a station

bike cities
bike stations
bike station 4

bikes             # from specific places

maybe we have some list of aliases

config? 

default: 37
work: 13
school: 43

bikes              # station 37
bikes work         # station 13
bikes stations     # stations in boston


stations
--------
a name, so you know where it is
an id, so you can use it later


a station
---------

bikes seaport
```
we found 2 stations that could match. Which did you mean?
 - "B32007 - Seaport Square - Seaport Blvd. at Boston Wharf"
 - "B32007 - Seaport Square - Seaport 1234 number 1"
 - "B32007 - Seaport Square - Seaport 1234 number 2"
 - "B32007 - Seaport Square - Seaport 1234 number 3"
 - "B32007 - Seaport Square - Seaport 1234 number 4"
```
bikes seaport 1
bikes seaport sq

bikes map seaport sq
# opens up your browser with google maps there. Or citybik.es there.


