# MySQL Book Library API


This repository contains the integration test suite for Book Library API challenge using Sequelize & Express in Node JS. 
It creates an Express API using Sequelize that allows users to create accounts, list books, organizes them according to author & genre. CRUD operations can be performed on all these tables.


Unit testing has been carried out using Mocha/Chai & SuperTest.

* You will need [Postman](https://www.postman.com/downloads/) to manipulate the database.
* [MySQL Workbench](https://dev.mysql.com/downloads/workbench/) to see the live & test databases.
* You will need [Docker](https://docs.docker.com/get-docker/) installed and running.

I would also recommend installing the Docker extension in VS Code. It is a life saver for running, restarting & deleting containers & images. To install the extension, open the Extensions view (Ctrl+Shift+X), search for docker to filter results and select Docker extension authored by Microsoft.

![Screenshot](https://code.visualstudio.com/assets/docs/containers/overview/installation-extension-search.png)

* Before starting, please ensure everything is upto date by doing: 

`sudo apt-get update`

`sudo apt-get install code`

You will need updated VS Code to run all suites. 


## To Start:

Clone the repo into your project folder using:

`git clone git@github.com:SanMasood/book-library-api.git your-project-folder-name`

`cd your-project-folder-name`

Install the dependencies:

`npm install`

After installing the dependencies, use the .env.example to create 2 other files on the route of your project. Name these  `.env` & `.env.test`

* The `.env` file should have the details of your production database, so replace DB_PASSWORD and DB_NAME with some more appropriate values. For example: DB_PASSWORD=mypassword DB_NAME=book_library

* The `.env.test` file should have the details of your test database, so replace DB_PASSWORD and DB_NAME with some more appropriate values. For example: DB_PASSWORD=mypassword DB_NAME=book_library_test

## Running the Project:

After having installed Docker, enter the following command:

```docker run -d -p 3306:3306 --name book_library -e MYSQL_ROOT_PASSWORD=mypassword mysql```

**Please note that MYSQL_ROOT_PASSWORD should be the same as entered in the .env files.**

In your terminal, run the following command to start a local instance of the project: 

`npm start`
You should see `Now serving your Express app at http://localhost:3000` after this command.

Now, you are ready to perform CRUD operations through Postman on your test database.
Open Postman, and select the local server running on port 3000.

## Accessing Endpoints:

There are certain endpoints you can access for *Reader, Book, Author & Genre* records. 


### GET ALL RECORDS  :

GET `http://localhost:3000/readers` : to get all Reader records.

GET `http://localhost:3000/books` : to get all Book records.

GET `http://localhost:3000/authors` : to get all Author records.

GET `http://localhost:3000/genres` : to get all Genre records.

You will need to select **GET** from the dropdown list.


### CREATE A RECORD :

POST `http://localhost:3000/readers` : to create a new Reader record.

POST `http://localhost:3000/books` : to create a new Book record.

POST `http://localhost:3000/authors` : to create a new Author record.

POST `http://localhost:3000/genres` : to create a new Genre record.


You will need to select **POST** from the drop down list. Please note that in order to create a new record, you will obviously have to 'send' something to the API. 
For this, you will need to select the BODY tab underneath, select RAW and type in the following:

```
{

"name" : "Test Reader",

"email" : "testemail@email.com",

"password" : "testpass456"

}
```
**Please refer to Book, Genre & Author models to send the appropriate fields into each table.**


### GET RECORDS BY ID :

GET `http://localhost:3000/readers/<id>` : to get a particular Reader record.

GET `http://localhost:3000/books/<id>` : to get a particular Book record.

GET `http://localhost:3000/authors<id>` : to get a particular Author record.

GET `http://localhost:3000/genres/<id>` : to get a particular Genre record.

You will need to select **GET** from the dropdown list.
You will also need to know the ID beforehand in order to access a particular record. 

**Enter the id excluding the <> signs, that is just for the purpose of this documentation.**


### UPDATE RECORDS BY ID :

PATCH `http://localhost:3000/readers/<id>` : to update a particular Reader record.

PATCH `http://localhost:3000/books/<id>` : to update a particular Book record.

PATCH `http://localhost:3000/authors<id>` : to update a particular Author record.

PATCH `http://localhost:3000/genres/<id>` : to update a particular Genre record.

You will need to select **PATCH** from the dropdown list.
You will also need to know the ID beforehand in order to access a particular record.
You can then send such a request in the body tab as shown below. This is what will be updated in that particular record whose id you have entered.

In this example, the name of a reader whose `id` has been sent for a **PATCH** request is being updated.


```
{

"name" : "TestReader NewName",

}
```


### DELETE RECORDS BY ID :

DELETE `http://localhost:3000/readers/<id>` : to delete a particular Reader record.

DELETE `http://localhost:3000/books/<id>` : to delete a particular Book record.

DELETE `http://localhost:3000/authors<id>` : to delete a particular Author record.

DELETE `http://localhost:3000/genres/<id>` : to delete a particular Genre record.


You will need to select **DELETE** from the dropdown list.
You will also need to know the ID beforehand in order to delete a particular record.


>Please note that most fields have a validation check on them. In case of Reader, if any field is missing, you can expect an error message, as all fields are required. Similar rules applies to Book, Author & Genre. 

Likewise, once a reader is registered with an email, the same email cannot be used to register another reader. Password should always be more than 8 characters.

## CREDITS:
Copyrights [Manchester Codes](https://github.com/MCRcodes).

Thank you [Justin](https://github.com/jdsandahl) for tips on busting sequelize database deadlocks!
