## Table of Contents
* [API Documentation](#api-documentation)
* [Users](#users)
* [Clients](#clients)
* [Tours](#tours)
* [Booked Tours](#booked-tours)

<!-- api-documentation -->
# API Documentation 

To make any request, please give the API key as a parameter. The correct syntax is `api_key=yourKey`. If another parameter is requested, you still need to include the key.

<!-- users -->
# Users

- Create new user
  - Relative path: /users
  - Method: POST
  - Body:
  ```
  {
    name: string,
    email: string,
    username: string,
    password: string,
    password_confirmation: string,
  }
  ```
  - Response: User information.

- Destroy user
  - Relative path: /users/:id
  - Method: DELETE
  - Body:
  ```
  {
    password: string,
  }
  ```
  - Response: `{ Message: User delete || Sorry, the password is incorrect }`.

- Update user
  - Relative path: /users/:id
  - Method: PUT
  - Body:
  ```
  {
    user_password: string(old password),
    name: string,
    email: string,
    username: string,
    password: string,
    password_confirmation: string,
  }
  ```
  - Response: User info or message telling that the password is wrong.

<!-- clients -->
# Clients

- Retrieve all clients
  - Relative path: /clients
  - Method: GET
  - Response: Clients information.

- Retrieve specific client
  - Relative path: /clients/:id
  - Method: GET
  - Response: Client information.

- Create new client
  - Relative path: /clients
  - Method: POST
  - Body:
  ```
  {
    company_name: string,
    company_logo: string,
    email: string,
    password: string,
    password_confirmation: string,
  }
  ```
  - Response: Client information.

- Destroy client
  - Relative path: /clients/:id
  - Method: DELETE
  - Body:
  ```
  {
    password: string,
  }
  ```
  - Response: `{ Message: Client delete || Sorry, the password is incorrect }`.

- Update client
  - Relative path: /users/:id
  - Method: PUT
  - Body:
  ```
  {
    client_password: string,
    company_name: string,
    company_logo: string,
    email: string,
    password: string,
    password_confirmation: string,
  }
  ```
  - Response: Client info or message telling that the password is wrong.

<!-- tours -->
# Tours

- Retrieve all Tour by city or client
  - Relative path: /tours
  - Method: GET
  - Params:
  ```
  {
    city: string,
    client: client id,
  }
  ```
  \* It is required to have one of the two. If you provide both of them, only the city parameter will be taken into consideration.
  - Response: Tours information.

- Retrieve specific tour
  - Relative path: /tours/:id
  - Method: GET
  - Response: Tour information.

- Create new tour
  - Relative path: /tours
  - Method: POST
  - Body:
  ```
  {
    country: string,
    city: string,
    description: text,
    max_capacity: integer,
    cost: decimal,
    hour: integer,
    duration: integer,
    client_id: integer,
  }
  ```
  - Response: Tour information.

- Destroy tour
  - Relative path: /tour/:id
  - Method: DELETE
  - Body:
  ```
  {
    password: client password,
  }
  ```
  - Response: `{ Message: Tour delete || Sorry, the password is incorrect }`.

- Update tour
  - Relative path: /tours/:id
  - Method: PUT
  - Body:
  ```
  {
    password: client password,
    country: string,
    city: string,
    description: text,
    max_capacity: integer,
    cost: decimal,
    hour: integer,
    duration: integer,
    client_id: integer,
  }
  ```
  - Response: Client info or message telling that the password is wrong.

<!-- booked-tours -->
# Booked Tours

- Retrieve all Booked Tours by Tour or user
  - Relative path: /tours
  - Method: GET
  - Params:
  ```
  {
    user: user id,
    tour: tour id,
  }
  ```
  \* It is required to have one of the two. If you provide both of them, only the city parameter will be taken into consideration.
  - Response: Booked Tour information by user or by Tour.

- Create a booked tour
  - Relative path: /tours
  - Method: POST
  - Body:
  ```
  {
    day: date,
    quantity: number of tickets
    user_id: user id,
    tour_id: tour id,
  }
  ```
  - Response: Booked Tour information.