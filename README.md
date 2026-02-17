# Products API

A RESTful API built with Express.js, TypeScript, and MongoDB for managing products, categories, and users with authentication.

## Features

- ✅ **Product Management** - Full CRUD operations for products
- ✅ **Category Management** - Product categorization with MongoDB references
- ✅ **User Authentication** - JWT-based authentication with refresh tokens
- ✅ **User Management** - User CRUD operations
- ✅ **Input Validation** - Express-validator for request validation
- ✅ **Error Handling** - Centralized error handling middleware
- ✅ **Security** - Helmet, CORS, rate limiting
- ✅ **TypeScript** - Full type safety
- ✅ **MongoDB** - NoSQL database with Mongoose ODM

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Validation**: Express-validator
- **Security**: Helmet, CORS, bcrypt, express-rate-limit
- **Dev Tools**: Nodemon, ts-node

## Project Structure

```
Products-api/
├── config/
│   ├── db.ts                 # MongoDB connection
│   └── env.ts                # Environment variables
├── controllers/
│   ├── auth.controller.ts    # Authentication logic
│   ├── categories.controller.ts
│   ├── products.controller.ts
│   └── users.controller.ts
├── middlewares/
│   ├── auth.middleware.ts    # JWT authentication
│   ├── error.middleware.ts   # Error handling
│   └── validator.middleware.ts
├── models/
│   ├── category.model.ts     # Category schema
│   ├── product.model.ts      # Product schema (with category ref)
│   └── user.model.ts         # User schema
├── routes/
│   ├── auth.route.ts
│   ├── categories.route.ts
│   ├── products.route.ts
│   ├── users.route.ts
│   └── index.ts              # Route aggregator
├── services/
│   ├── auth.service.ts       # Authentication business logic
│   ├── categories.service.ts
│   ├── jwt.service.ts        # JWT token management
│   ├── products.service.ts
│   └── users.service.ts
├── types/
│   ├── auth.type.ts
│   ├── categories.type.ts
│   ├── crud.type.ts
│   ├── Express.type.ts       # Express type extensions
│   ├── product.type.ts
│   └── user.type.ts
├── utils/
│   ├── customError.ts        # Custom error class
│   └── httpStatusText.ts     # HTTP status constants
├── validation/
│   ├── auth.validator.ts
│   ├── category.validator.ts
│   ├── product.validator.ts
│   └── user.validator.ts
├── app.ts                    # Express app configuration
├── server.ts                 # Server entry point
└── tsconfig.json             # TypeScript configuration
```

## Setup

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/7atoom/express-ts-products-api.git
cd Products-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/products-api
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRES_IN=7d
```

4. Run the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
npm start
```

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register a new user | ❌ |
| POST | `/auth/login` | Login user | ❌ |
| POST | `/auth/refresh-tokens` | Refresh access token | ❌ |

### Category Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/categories` | Get all categories | ❌ |
| GET | `/categories/:id` | Get category by ID | ❌ |
| POST | `/categories` | Create new category | ✅ |
| PATCH | `/categories/:id` | Update category | ✅ |
| DELETE | `/categories/:id` | Delete category | ✅ |

### Product Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/products` | Get all products (with populated categories) | ❌ |
| GET | `/products/:id` | Get product by ID (with populated category) | ❌ |
| POST | `/products` | Create new product | ✅ |
| PATCH | `/products/:id` | Partial update product | ✅ |
| PUT | `/products/:id` | Full update product | ✅ |
| DELETE | `/products/:id` | Delete product | ✅ |

### User Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | Get all users | ✅ |
| GET | `/users/:id` | Get user by ID | ✅ |
| POST | `/users` | Create new user | ✅ |
| PATCH | `/users/:id` | Update user | ✅ |
| DELETE | `/users/:id` | Delete user | ✅ |

## API Usage Examples

### 1. Register a User

```bash
POST /api/auth/register
Content-Type: application/json

{
  "Fname": "John",
  "Lname": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

### 2. Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "user": { ... },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### 3. Create a Category

```bash
POST /api/categories
Content-Type: application/json
Authorization: Bearer <your_access_token>

{
  "name": "Electronics"
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "category": {
      "_id": "65f8a1b2c3d4e5f6a7b8c9d0",
      "name": "Electronics",
      "createdAt": "2026-02-17T10:00:00.000Z",
      "updatedAt": "2026-02-17T10:00:00.000Z"
    }
  }
}
```

### 4. Create a Product (with Category Reference)

```bash
POST /api/products
Content-Type: application/json
Authorization: Bearer <your_access_token>

{
  "name": "Laptop Pro 15",
  "productCode": "LP15-2026",
  "category": "65f8a1b2c3d4e5f6a7b8c9d0",
  "supplier": "Dell",
  "description": "High-performance laptop with 16GB RAM and 512GB SSD",
  "quantity": 25,
  "minStock": 5,
  "price": 1299.99,
  "location": "Aisle 1",
  "status": "inStock",
  "imageUrl": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
}
```

**Response (with auto-populated category):**
```json
{
  "status": "success",
  "data": {
    "_id": "65f8a1b2c3d4e5f6a7b8c9d1",
    "name": "Laptop Pro 15",
    "productCode": "LP15-2026",
    "category": {
      "_id": "65f8a1b2c3d4e5f6a7b8c9d0",
      "name": "Electronics"
    },
    "supplier": "Dell",
    "description": "High-performance laptop with 16GB RAM and 512GB SSD",
    "quantity": 25,
    "minStock": 5,
    "price": 1299.99,
    "location": "Aisle 1",
    "status": "inStock",
    "imageUrl": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    "createdAt": "2026-02-17T10:05:00.000Z",
    "updatedAt": "2026-02-17T10:05:00.000Z"
  }
}
```

### 5. Get All Products

```bash
GET /api/products
```

Categories are automatically populated in the response.

## Product-Category Relationship

Products use MongoDB references to link to categories:

- **Product Model**: Stores category as `ObjectId` reference
- **Auto-Population**: Category data is automatically populated in GET requests
- **Validation**: Category existence is validated before creating/updating products
- **Type Safety**: TypeScript ensures correct types: `category: Types.ObjectId | ICategory`

## Data Models

### Product Schema
```typescript
{
  name: string,
  productCode: string,          // Unique
  category: ObjectId,            // Reference to Category
  supplier: string,
  description: string,
  quantity: number,
  minStock: number,
  price: number,
  location: string,
  status: 'inStock' | 'lowStock' | 'outOfStock',
  imageUrl?: string,
  lastRestocked?: Date,
  lastOrdered?: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Category Schema
```typescript
{
  name: string,                  // Unique
  createdAt: Date,
  updatedAt: Date
}
```

### User Schema
```typescript
{
  Fname: string,
  Lname: string,
  email: string,                 // Unique
  password: string,              // Hashed with bcrypt
  token?: string,
  createdAt: Date,
  updatedAt: Date
}
```

## Authentication

This API uses JWT (JSON Web Tokens) for authentication:

1. **Register** or **Login** to receive an access token
2. Include the token in the `Authorization` header:
   ```
   Authorization: Bearer <your_access_token>
   ```
3. Use the refresh token to get a new access token when it expires

## CORS Configuration

For Angular or other frontend frameworks:

```typescript
app.use(cors({
  origin: 'http://localhost:4200',  // Your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## Error Handling

The API uses centralized error handling with custom error classes:

```json
{
  "success": false,
  "message": "Error message here",
  "statusCode": 400
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized
- `404` - Not Found
- `409` - Conflict (duplicate entry)
- `500` - Internal Server Error

## Security Features

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Prevents abuse (100 requests per 15 minutes)
- **Password Hashing**: Bcrypt with salt rounds
- **JWT**: Secure token-based authentication
- **Input Validation**: Express-validator on all routes

## Testing

Use the provided test files:
- `auth-api-tests.http` - Authentication endpoints
- `categories-products-api-tests.http` - Categories and products

Or use Postman/Thunder Client with the examples above.

## Development

```bash
npm run dev          # Start development server with nodemon
npm run build        # Compile TypeScript to JavaScript
npm start            # Run production build
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `MONGO_URI` | MongoDB connection string | mongodb://localhost:27017/products-api |
| `NODE_ENV` | Environment (development/production) | development |
| `JWT_SECRET` | Secret for access tokens | - |
| `JWT_EXPIRES_IN` | Access token expiry | 1h |
| `REFRESH_TOKEN_SECRET` | Secret for refresh tokens | - |
| `REFRESH_TOKEN_EXPIRES_IN` | Refresh token expiry | 7d |

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

## Author

[7atoom](https://github.com/7atoom)
