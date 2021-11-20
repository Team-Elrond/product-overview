CREATE TABLE products (
  product_id serial PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  slogan VARCHAR(60) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  category VARCHAR(30) NOT NULL,
  default_price VARCHAR(30) NOT NULL,
  created_at VARCHAR(30) NOT NULL,
  updated_at VARCHAR(30) NOT NULL
);

CREATE TABLE features (
  feature_id serial PRIMARY KEY,
  feature VARCHAR(30) NOT NULL
);

CREATE TABLE styles (
  style_id serial PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  original_price VARCHAR(30) NOT NULL,
  sale_price VARCHAR(30) DEFAULT NULL,
  default BOOLEAN NOT NULL DEFAULT FALSE,
  product_id serial REFERENCES products (product_id) ON DELETE CASCADE
);

CREATE TABLE photos (
  photos_id serial PRIMARY KEY,
  style_id serial REFERENCES styles (style_id) ON DELETE CASCADE,
  url text DEFAULT NULL,
  thumbnail_url text DEFAULT NULL
);

CREATE TABLE products_and_features (
  products_and_features_id serial PRIMARY KEY,
  product_id REFERENCES products (product_id) ON DELETE CASCADE,
  feature_id REFERENCES features (feature_id) ON DELETE CASCADE,
  value INTEGER DEFAULT NULL
);

CREATE TABLE sizes (
  size_id serial PRIMARY KEY,
  size VARCHAR(10) NOT NULL
);

CREATE TABLE sku (
  sku INTEGER NULL AUTO_INCREMENT,
  product_id REFERENCES products (product_id) ON DELETE CASCADE,
  style_id serial REFERENCES styles (style_id) ON DELETE CASCADE,
  size_id serial REFERENCES sizes (size_id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL
);