# Instructions
Please follow the instruction below to build/run this code

## 1. to build
- npm install
- npm install -g parcel-bundler
- npm install -g openfin-cli
- cd public
- parcel launcher.html blotter.html chart.html tiles.html 
- Once its built CTRL+C as we dont want to use Parcel web host
- If this worked you should see whole bunch of files in the `public\dist` folder

## 2. To run
- navigate to root folder with server.js in it
- **npm run express-server** then navigate to http://localhost:1234 OR **node server** then navigate to http://localhost:1234


## 3. Why branch
- `master` contains my own layout code that will do crude persist/restore based on local storage, but will work on displays that have any display scaling (even 132 QHD laptops)
- `using-layouts-api` contains OpenFin layour API code for working with 100% scaling displays

