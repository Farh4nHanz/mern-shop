# MERN Shop

A simple e-commerce application built with the MERN (MongoDB, Express, React, Node.js) stack. This project demonstrates basic CRUD (Create, Read, Update, Delete) operations, allowing users to view, add, update, and delete products. It also includes a responsive design and user-friendly interfaces.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete products.
- **Responsive Design**: Optimized for mobile and desktop views.
- **Product Management**: Add and update product details like name, price, description, and image.
- **API Integration**: Interaction with the backend through RESTful APIs.
- **Error Handling**: Proper error messages and loading states for better UX.

## Technologies Used

- **Frontend**: React, Chakra UI, and Tailwindcss for styling
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: React Hooks, Redux Toolkit, Axios for API requests

## Installation

Follow these steps to set up and run the project on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/Farh4nHanz/mern-shop.git
```

### 2. Navigate to the Project Directory

```bash
cd mern-shop
```

### 3. Install Backend Dependencies

Install the backend dependencies and start the server:

```bash
npm install
npm run dev
```

### 4. Install Frontend Dependencies

Navigate to the frontend directory and install dependencies, then start the frontend development:

```bash
cd ./frontend/
npm install
npm run dev
```

### 5. Open the application in browser

Open your browser and navigate to `http://localhost:5173` to view the application.

## Configuration

To run the application, ensure you have a .env file with the following variables:

```makefile
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.br1ts1h.mongodb.net/<database_name>
```

If you don't know how to connect MongoDB, you may need to visit this link - [how-to-connect-mongodb](https://dev.to/dalalrohit/how-to-connect-to-mongodb-atlas-using-node-js-k9i)

### Note

If you got some error when running the frontend, it might caused due to the .env file. You can solved it by creating another .env file in your frontend and pass this inside:

```makefile
VITE_API_URL=http://localhost:5000/api/v1
```

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
