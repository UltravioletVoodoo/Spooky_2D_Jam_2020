# Spooky_2D_Jam_2020
Our entry for the Spooky 2D Jam of 2020


## Local Setup
To get a local version of the game set up, first run
```
git clone https://github.com/UltravioletVoodoo/Spooky_2D_Jam_2020.git
```
Then enter the repository with
```
cd Spooky_2D_Jam_2020
```
Install the dependencies
```
npm install
```
Finally, start up the game
```
npm run start
```
After a moment, it should inform you that your local version is running on localhost:8000

## Developing
Once you have your local version set up and running, any changes will cause a hot-reload and you should be able to see your changes instantly without the need to refresh

## Building for Production
A production build is the static version of the site, which is stored in the `/dist` directory. To create a production build run
```
npm run build
```
The contents of the `/dist` folder will be replaced and be ready to be served on any static hosting site.
