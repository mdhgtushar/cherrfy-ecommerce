# Cherrfy Ecommerce API

Welcome to the Cherrfy Ecommerce API documentation. This API powers the backend for the Cherrfy ecommerce platform.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Cherrfy Ecommerce API provides endpoints to manage products, orders, users, and more for the Cherrfy platform.

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-org/cherrfy-ecommerce.git
    ```
2. **Install dependencies:**
    ```bash
    cd api
    npm install
    ```
3. **Configure environment variables:**  
    Copy `.env.example` to `.env` and update as needed.

4. **Run the API:**
    ```bash
    npm start
    ```

## Authentication

Most endpoints require authentication via JWT tokens.  
Include the token in the `Authorization` header:

```
Authorization: Bearer <your_token>
```

## Endpoints

| Method | Endpoint           | Description                |
|--------|--------------------|----------------------------|
| GET    | `/products`        | List all products          |
| POST   | `/products`        | Create a new product       |
| GET    | `/orders`          | List all orders            |
| POST   | `/orders`          | Create a new order         |
| GET    | `/users`           | List all users             |
| POST   | `/auth/login`      | User login                 |

> _See the [API Reference](docs/api.md) for full details._

## Error Handling

All errors are returned in JSON format:

```json
{
  "error": "Error message here"
}
```

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

## License

This project is licensed under the MIT License.