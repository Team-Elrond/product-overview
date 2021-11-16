CREATE TABLE question (
   question_id int,
   question_body text,
   question_date timestamp,
   asker_name text,
   question_helpfulness int,
   PRIMARY KEY(question_id)
);

CREATE TABLE answer (
   question_id int,
   id int,
   body text,
   date timestamp,
   answerer_name text,
   helpfulness int,
   photos list<text>,
   PRIMARY KEY(question_id, id)
);


-- ---
-- Table 'products'
--
-- ---

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

-- ---
-- Table 'styles'
--
-- ---

DROP TABLE IF EXISTS `styles`;

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

-- ---
-- Table 'sku'
--
-- ---

DROP TABLE IF EXISTS `sku`;

CREATE TABLE `sku` (
  sku_id int
  product_id int,
  style_id int,
  size_id int,
  quantity int,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'size'
--
-- ---

DROP TABLE IF EXISTS `size`;

CREATE TABLE `size` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `size` VARCHAR(10) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);
