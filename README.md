# movie raiting and review application apis
using nodejs, express, mongodb

setup on local system
prerequisite: 
 - Nodejs 10 or greater
 - Mongodb 4 or greater (available on port 27017)

steps: 
- change directory to api root
- run `npm i` for (node package installation)
- run `npm run import:devData` for (inserting the dev data into movie and reviewandrating colletions.)
- run `npm start` for (start the api's server)
note: to delete the test data from the database run `npm run delete:devData`


Additional testing guide:
 - I have added the two movies in dev data and 35 reviews and comments. 
 - movie id `6002a519fc13ae2b35000000` has 35 depenedent reviews and ratings.
 (can be healpfull for testing the pagination feature testing.)
 -  
 - movie id `6002a519fc13ae2b35000001` does't have any review and ratining.
 (can be healpful for creating a new api review and rating testing.)


