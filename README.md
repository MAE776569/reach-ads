# Reach Ads

Reach ads is a simple Ads management API and simple admin panel that shows ads and related tags/categories.

## Before you start

- Make sure to configure server environment variables by creating a `.env` file and adding the required variables.
- **A sample of the env variables can be found in `.env.example`**.
- If no env variables is set, default values from `/config/server.config` will be used.
- Make sure you set the front-end env variables by creating a `.env` file inside `/src folder` and adding the required variables, **as there are no default value for the variables and the application will fail if variables are not set**.
- **A sample of the front-end env variables can be found inside `/src/.env.example`**.

## How to install

Run the commands in the terminal

- `npm run start` _to start the server. by default server will run on port 5000_.

- `npm run panel` _to start the admin panel_

## Authentication

**JWT** authentication is used to allow the users to login and create accounts.

### How authentication works

Each time a user creates an account or log in a new token is created and token is sent to the client and set as cookie for security.

With each request the either the authorization header or the cookie is validated.

If the token is valid the request is handled, and if the token is not valid the user is requested to provide a valid token or login again.

## The Models

The application consists of four models:

### User

| Field    | Description     |
| -------- | --------------- |
| email    | unique email    |
| password | user's password |

### Tag

| Field | Description                                    |
| ----- | ---------------------------------------------- |
| name  | unique name of the tag consits of letters only |

### Category

| Field       | Description                           |
| ----------- | ------------------------------------- |
| title       | category title                        |
| description | optional description for the category |

### Advertisement

| Field       | Description                         |
| ----------- | ----------------------------------- |
| type        | type of the ad one of free, or paid |
| title       | title of the ad                     |
| description | optional description                |
| category    | ad category id                      |
| tags        | array of tag ids                    |
| advertiser  | advertiser id                       |
| startDate   | optional start date of the ad       |
| endDate     | end date of the ad                  |
| image       | optional image url                  |

## The API

All the API endpoints **prefixed with version `/v1` followed by the endpoints mentioned in the below table**.

| Endpoint               | Method     | Body                                                                                                                               | Description                                                                                                                                                                                   |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/auth/login`          | **POST**   | email, password                                                                                                                    | login user and send token                                                                                                                                                                     |
| `/auth/register`       | **POST**   | email, password, confirmPassword                                                                                                   | create a user account and send token                                                                                                                                                          |
| `/auth/admin/login`    | **POST**   | email, password                                                                                                                    | login admin and send token                                                                                                                                                                    |
| `/auth/admin/register` | **POST**   | email, password, confirmPassword                                                                                                   | create an admin account and send token                                                                                                                                                        |
| `/auth/logout`         | **POST**   | no parameters                                                                                                                      | logout user                                                                                                                                                                                   |
| `/user`                | **GET**    | no parameters                                                                                                                      | get the logged in user information                                                                                                                                                            |
| `/user/ads`            | **GET**    | no parameters                                                                                                                      | get logged in user ads or get user ads by setting user id as query string for example: `/user/ads?user=600446395478b70220bf82f7`                                                              |
| `/categories`          | **GET**    | no parameters                                                                                                                      | get all categories                                                                                                                                                                            |
| `/categories`          | **POST**   | title, description - optional                                                                                                      | create a new category                                                                                                                                                                         |
| `/categories/:id`      | **GET**    | no parameters                                                                                                                      | get category by id                                                                                                                                                                            |
| `/categories/:id`      | **PUT**    | title, description - optional                                                                                                      | update category by id                                                                                                                                                                         |
| `/categories/:id`      | **DELETE** | no parameters                                                                                                                      | delete category by id                                                                                                                                                                         |
| `/tags`                | **GET**    | no parameters                                                                                                                      | get all tags - ability to filter tags by name by setting name as query string. for example: `/tags?name=new`                                                                                  |
| `/tags`                | **POST**   | name                                                                                                                               | create a new tag                                                                                                                                                                              |
| `/tags/:id`            | **GET**    | no parameters                                                                                                                      | get tag by id                                                                                                                                                                                 |
| `/tags/:id`            | **PUT**    | name                                                                                                                               | update tag by id                                                                                                                                                                              |
| `/tags/:id`            | **DELETE** | no parameters                                                                                                                      | delete tag by id                                                                                                                                                                              |
| `/advertisers`         | **GET**    | no parameters                                                                                                                      | get all advertisers                                                                                                                                                                           |
| `/ads`                 | **GET**    | no parameters                                                                                                                      | get all ads - ability to filter ads by advertiser, tag, or category by setting advertiser id, tag id, or category id as query string. for example: `/ads?advertiser=600446395478b70220bf82f7` |
| `/ads`                 | **POST**   | type, title, advertiser, category, tags: array of tag ids, endDate, startDate - optional, description - optional, image - optional | create a new ad                                                                                                                                                                               |
| `/ads/:id`             | **GET**    | no parameters                                                                                                                      | get ad by id                                                                                                                                                                                  |
| `/ads/:id`             | **PUT**    | type, title, advertiser, category, tags: array of tag ids, endDate, startDate - optional, description - optional, image - optional | update ad by id                                                                                                                                                                               |
| `/ads/:id`             | **DELETE** | no parameters                                                                                                                      | delete ad by id                                                                                                                                                                               |
| `/upload`              | **POST**   | file                                                                                                                               | upload image using form data                                                                                                                                                                  |

## Email schedule

- Every day at **8 PM** an email is sent to advertiser who have ads that start tomorrow.
- **An ethereal test email is used to emulate sending emails, so no real emails are sent**.
- If you want to use real email, set email env variables: `EMAIL_USER`, `EMAIL_PASSWORD`.
