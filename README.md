# Restaurant Ordering Web Application (talabat)

This web application allows users to browse restaurants, view menus, and add items to a cart. It also includes user registration, login functionality, and basic authentication/authorization measures to ensure the security of the application.

## Features

- **User Registration and Authentication:** Users can create an account by providing their email and password. They can log in using their credentials with JWT

- **Restaurant Listings:** Users can browse a list of restaurants. Each restaurant is displayed with its name, a brief description, and an image.

- **Menu Viewing:** Users can select a restaurant to view its menu. Menu items are displayed with their names, descriptions, prices, and images.

- **Adding to Cart:** Users can add items from the menu to their cart. They can specify the quantity of each item they wish to order.

- **Cart Management:** Users can view and manage the items in their cart. They can adjust quantities or remove items as needed.

- **Order Placement:** Once the user has selected items in their cart, they can place an order. The application securely processes the order and provides an order confirmation email.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) package manager
- Database system ( MySQL,) for storing user data and restaurant information

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/mohamedelbadawi/talabat.git
   cd talabat
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure the database connection by modifying the `.env` file. Provide your database credentials.

4. Initialize the database by running migrations:

   ```bash
   npx prisma db push
   ```

5. To start the application:

   ```bash
   npm run start
   # or
   yarn start
   ```

The application should now be running and accessible at `http://localhost:3000`.

### Usage

- Here is the Postman documentation
```
https://documenter.getpostman.com/view/23767646/2s9YR6bZwT
```


## Authentication and Authorization

- User authentication is implemented using email and password.
- Authorization measures ensure that only authenticated users can place orders.
- Admin who can only accept restaurant request to be in the app

## Technologies Used

- Node.js
- Express.js
- Typescript
- Prisma (for database access)
- JWT (for authentication)

## Roadmap

Future improvements and features that can be added to this application:

- Implement a payment gateway to secure transactions.


