Triet Tran
cd packages/server
npm install
npm run dev


Application overview: 
A dashboard table of real estate listings where user can search properties by keyword, sort, and edit listing. 
User can click on view units to view all the unit details of each multi-family property.

Upon accessing the site, user will be asked to log in or register account. Once logged in, user will have 24 hour token expiration. 

Here's a sample credential:
testuser4
password123

Note: I ran into many issues with @calpoly/mustang, so I resort to using passport.js to handle jwt and auth

The app is deployed on https://ttran258.unbundled.dev/