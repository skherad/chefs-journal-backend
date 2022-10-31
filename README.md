# chefs-journal-server

This is the backend for my project that's built with express, node.js, and mySQL.<br>
Since my project requires Google OAuth keys, this is a private repo, and the README file is for BrainStation grading purposes.
Once made public .env file will be replaced with a .env.sample file, and README file will be updated accordingly.
# Installation For BackEnd
1. Clone this repository's **local branch**.<br>
```$ git clone https://github.com/skherad/chefs-journal-server/tree/local```<br><br>
2. Run ```$ npm i``` from inside the server directory<br><br>
3. Create a database in mySQL named chefs-journal. Make sure below fields in .env file is updated with your mySQL credentials.
    <br>
    ```
    DB_HOST=127.0.0.1
    DB_USER=ROOT
    DB_PASSWORD=ROOT
    ```
    <br>
4. Create tables in the created mySQL database by running ```$ npx knex migrate:latest``` in terminal while cd'd into server.<br><br>
5. Seed data into the database by running ```$ npm run seed```<br><br>
6. Finally, start server ```$ npm start```<br><br>

--> Now you can move one to front end repo: https://github.com/skherad/chefs-journal-client
