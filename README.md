# city-bikes-cli

This is a command-line interface for checking the status of your local bike-sharing stations.

## Demo

![](http://g.recordit.co/UWg6UCkN4s.gif)

## Installation
```sh
  > npm install -g city-bikes-cli
```
> Don't forget the "-g" to install it globally. (then you can run the `bikes` command anywhere)

## Usage

On your terminal:
```
Usage: bikes                          # Display available bikes/slots for your default station
   or: bikes set-city <service-id>    # Set your default city
   or: bikes <station-id>             # Display available bikes/slots for station by id
   or: bikes get <station-alias>      # Display available bikes/slots for station by custom name
   or: bikes set <station-alias> <station-id> # Set station-alias linked to a specific station-id
-----------------------------------
  <station-alias> can be work, home, mom, coffee or whatever string
```

At first, you will obviously not know the id of a particular station. Run the command this command below to the list of all stations ids and names:
```sh
  > bikes
```

#### Example queries
```
  > bikes set-city hubway
  > bikes set home e1906354f4f8801b14ad121028763909
  > bikes get home
```

Thanks to Ekerda for his [awesome project](http://www.citybik.es/), we are pulling the live data from his version 2 [api](http://api.citybik.es/).

## Team

[![Courajs](https://avatars.githubusercontent.com/u/1588273?s=130)](https://github.com/courajs) | [![Mohamed Hayibor](https://avatars.githubusercontent.com/u/11381259?s=130)](https://github.com/mohamedhayibor)
---|---|
[Courajs](https://github.com/courajs) | [Mohamed Hayibor](https://github.com/mohamedhayibor)

## License
MIT
