# Products API

A simple REST API built with Express.js and TypeScript for managing products with MongoDB.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```
PORT=3000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

3. Run the project:
```bash
npm run dev    # Development mode
npm run build  # Build for production
npm start      # Run production build
```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create a new product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product
