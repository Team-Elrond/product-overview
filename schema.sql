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
  product_id SERIAL REFERENCES products (id) ON DELETE CASCADE,
  feature VARCHAR(30) NOT NULL,
  value VARCHAR(30) DEFAULT NULL
);

CREATE TABLE styles (
  style_id SERIAL PRIMARY KEY,
  product_id SERIAL REFERENCES products (id) ON DELETE CASCADE,
  name VARCHAR(30) NOT NULL,
  original_price VARCHAR(30) NOT NULL,
  sale_price VARCHAR(30) DEFAULT NULL,
  "default?" BOOLEAN NOT NULL DEFAULT FALSE
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

CREATE TABLE related_items (
  related_id SERIAL PRIMARY KEY,
  product_id SERIAL REFERENCES products (id) ON DELETE CASCADE,
  related_product_id INTEGER NOT NULL
);

CREATE INDEX ON products (id);
CREATE INDEX ON features (product_id);
CREATE INDEX ON styles (product_id);
CREATE INDEX ON photos (style_id_photos);
CREATE INDEX ON sku (style_id_sku);
CREATE INDEX ON related_items (product_id);

COPY products FROM '/home/ubuntu/product_overview/product_overview/product.csv' DELIMITER ',' CSV HEADER;
COPY features FROM '/home/ubuntu/product_overview/product_overview/features.csv' DELIMITER ',' CSV HEADER;
COPY styles FROM '/home/ubuntu/product_overview/product_overview/styles.csv' DELIMITER ',' CSV HEADER;
COPY photos FROM '/home/ubuntu/product_overview/product_overview/xaa.csv' DELIMITER ',' CSV HEADER;
COPY photos FROM '/home/ubuntu/product_overview/product_overview/xab.csv' DELIMITER ',';
COPY photos FROM '/home/ubuntu/product_overview/product_overview/xac.csv' DELIMITER ',';
COPY photos FROM '/home/ubuntu/product_overview/product_overview/xad.csv' DELIMITER ',';
COPY photos FROM '/home/ubuntu/product_overview/product_overview/xae.csv' DELIMITER ',';
COPY photos FROM '/home/ubuntu/product_overview/product_overview/xaf.csv' DELIMITER ',';
COPY sku FROM '/home/ubuntu/product_overview/product_overview/skus.csv' DELIMITER ',' CSV HEADER;
COPY related_items FROM '/home/ubuntu/product_overview/product_overview/related.csv' DELIMITER ',' CSV HEADER;