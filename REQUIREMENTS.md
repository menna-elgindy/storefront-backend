## API Endpoints

#### Products
- Index route: '/products' [GET]
- Show route: '/products/:id' [GET]
- Create route [token required]: '/products' [POST]

#### Users
- Index route [token required]: '/users' [GET]
- Show route [token required]: '/users/:id' [GET]
- Create route: '/users' [POST]

#### Orders
- Current Order by user route (args: user id)[token required]: '/orders/:user_id' [GET]

## Database schema 

### Tables:
- products
- users
- orders
- order_products

### columns:

#### Table products :
-  id
- name
- price
- category

`CREATE TABLE products (id SERIAL PRIMARY  KEY, product_name VARCHAR(100), price integer, category VARCHAR(255));`

#### Table users :
- id
- firstName
- lastName
- password

`CREATE TABLE users ( id SERIAL PRIMARY  KEY, firstname VARCHAR(100), lastname VARCHAR(100), password VARCHAR(255));`

#### Table orders:
- id
- user_id
- status of order (active or complete)

`CREATE TABLE orders ( id SERIAL PRIMARY KEY, user_id bigint REFERENCES users(id), status VARCHAR(20));`

#### Table order_products:
- id
- order_id
- product_id
- product_quantity

`CREATE TABLE order_products ( id SERIAL PRIMARY KEY, order_id bigint REFERENCES orders(id), product_id bigint REFERENCES products(id), product_quantity integer);`
