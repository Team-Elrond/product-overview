CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  slogan VARCHAR(200) NOT NULL,
  description VARCHAR(1000) NOT NULL,
  category VARCHAR(30) NOT NULL,
  default_price VARCHAR(30) NOT NULL
);

CREATE TABLE features (
  feature_id SERIAL PRIMARY KEY,
  product_id SERIAL REFERENCES products (product_id) ON DELETE CASCADE,
  feature VARCHAR(30) NOT NULL,
  value VARCHAR(30) DEFAULT NULL
);

CREATE TABLE styles (
  style_id SERIAL PRIMARY KEY,
  product_id SERIAL REFERENCES products (product_id) ON DELETE CASCADE,
  name VARCHAR(30) NOT NULL,
  original_price VARCHAR(30) NOT NULL,
  sale_price VARCHAR(30) DEFAULT NULL,
  'default?' BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE photos (
  photos_id SERIAL PRIMARY KEY,
  style_id_photos SERIAL REFERENCES styles (style_id) ON DELETE CASCADE,
  url TEXT DEFAULT NULL,
  thumbnail_url TEXT DEFAULT NULL
);

CREATE TABLE sku (
  sku SERIAL PRIMARY KEY,
  style_id_sku SERIAL REFERENCES styles (style_id) ON DELETE CASCADE,
  size VARCHAR(10) NOT NULL,
  quantity INTEGER NOT NULL
);

CREATE TABLE cart (
  cart_id SERIAL PRIMARY KEY,
  user_session INTEGER NOT NULL,
  product_id SERIAL REFERENCES products (product_id) ON DELETE CASCADE,
  active BOOLEAN NOT NULL
);

CREATE INDEX ON features (product_id);
CREATE INDEX ON styles (product_id);
CREATE INDEX ON photos (styles_id_photos);
CREATE INDEX ON sku (styles_id_sku);
CREATE INDEX ON related_items (product_id);