CREATE TABLE products (
  product_id int,
  name text,
  slogan text
  description text,
  category text,
  default_price text,
  created_at text,
  updated_at text,
  features tuple<text, text>
  PRIMARY KEY (product_id)
);

CREATE TABLE styles (
  styles_id int,
  name text,
  original_price text,
  sale_price text
  default boolean,
  product_id int,
  photos list<text>,
  skus tuple<text, tuple<int, text>>
  PRIMARY KEY (styles_id)
);

