# GymApp
This GymApp is using React for the frontend and Node.js with Express for the backend. The app uses PostgreSQL as 
the database and Prisma as the ODM. The app uses bcrypt for password hashing. Tailwind CSS 
is used for responsive design.

## Installation
1. Clone the repository
2. Run `npm install` in the /backend directory
3. Run `npm install` in the /frontend directory
4. Create .ENV file in the /backend directory and fill out these variables so they match with your PG Database:
   
`
PG_USER = ' '
PG_HOST = ' '
PG_DATABASE= ' '
PG_PASSWORD= ' '
PG_PORT = ' '
`

5. Run `npm run dev` in the /backend directory to initialize the backend and API.
6. Run `npm start` in the /frontend directory


## Usage
The app will be running on http://localhost:3000. To simulate the communication between users, open the app in two different browsers, use two different devices or use the incognito mode in your browser.

## Features
- Creating/Deleting workout plans
- Exercise filtering by parameters ( primary muscle,secondary muscle,equipment,...) or by name
- Adding exercises into your own workout plans
- Changing your exercise parameters
- Creating posts with images and text
- Adding friends and making workout plans visible only to them
- Liking posts and notifications
- Editable profile picture,name,bio... in settings
- User search bar
- Dashboard page with showcase of your progress through graphs.
- Daily calorie tracker
- Weight tracker
- Responsive design

## License
[MIT](https://choosealicense.com/licenses/mit/)
