const request = require('supertest');
const app = require('../app');
const client = require('../database/db');

beforeAll(() =>
  client.query('CREATE TABLE IF NOT EXISTS products (id serial PRIMARY KEY, name VARCHAR(60) NOT NULL, slogan VARCHAR(60) NOT NULL, description VARCHAR(60) NOT NULL, category VARCHAR(60) NOT NULL, default_price VARCHAR(60) NOT NULL)')
    .then(() => client.query('CREATE TABLE IF NOT EXISTS features (feature_id serial PRIMARY KEY, product_id serial REFERENCES products (id) ON DELETE CASCADE, feature VARCHAR(30) NOT NULL, value VARCHAR(30) NOT NULL)'))
    .then(() => client.query('CREATE TABLE IF NOT EXISTS styles (style_id serial PRIMARY KEY, product_id serial REFERENCES products (product_id) ON DELETE CASCADE, name VARCHAR(30) NOT NULL, sale_price VARCHAR(30) DEFAULT NULL, original_price VARCHAR(30) NOT NULL, default_style BOOLEAN NOT NULL)'))
    .then(() => client.query('CREATE TABLE IF NOT EXISTS photos (photos_id serial PRIMARY KEY, style_id_photos serial REFERENCES styles (style_id) ON DELETE CASCADE, url TEXT DEFAULT NULL, thumbnail_url TEXT DEFAULT NULL)'))
    .then(() => client.query('CREATE TABLE IF NOT EXISTS sku (sku serial PRIMARY KEY, style_id_sku serial REFERENCES styles (style_id) ON DELETE CASCADE, size VARCHAR(10) NOT NULL, quantity INTEGER NOT NULL)'))
    .then(() => client.query('CREATE TABLE IF NOT EXISTS related_items (related_id serial PRIMARY KEY, product_id serial REFERENCES products (id) ON DELETE CASCADE, related_product_id INTEGER NOT NULL)'))
    .then(() => client.query('INSERT INTO products VALUES (1,\'Camo Onesie\',\'Blend in to your crowd\',\'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.\',\'Jackets\',140), (2,\'Bright Future Sunglasses\',\'Youve got to wear shades\',\'Where youre going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.\',\'Accessories\',69), (3,\'Morning Joggers\',\'Make yourself a morning person\',\'Whether youre a morning person or not.  Whether youre gym bound or not.  Everyone looks good in joggers.\',\'Pants\',40),(4,\'Slackers Slacks\',\'Comfortable for everything, or nothing\',\'Ill tell you how great they are after I nap for a bit.\',\'Pants\',65), (5,\'Heir Force Ones\',\'A sneaker dynasty\',\'Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. Im just a sneaker pro, I love Pumas and shell toes, but cant nothin compare to a fresh crispy white pearl\',\'Kicks\',99), (6,\'Pumped Up Kicks\',\'Faster than a just about anything\',\'The Pumped Up serves up crisp court style with a modern look. These shoes show off tennis-whites shades and are constructed with a supple leather upper and a classic rubber cupsole.\',\'Kicks\',89) ON CONFLICT (id) DO NOTHING'))
    .then(() => client.query('INSERT INTO features VALUES (1,1,\'Fabric\',\'Canvas\'), (2,1,\'Buttons\',\'Brass\') ON CONFLICT (feature_id) DO NOTHING'))
    .then(() => client.query('INSERT INTO styles VALUES (1,1,\'Forest Green & Black\',null,140,\'1\'), (2,1,\'Desert Brown & Tan\',null,140,\'0\'), (3,1,\'Ocean Blue & Grey\',100,140,\'0\'), (4,1,\'Digital Red & Black\',null,140,\'0\'), (5,1,\'Sky Blue & White\',100,140,\'0\'), (6,1,\'Dark Grey & Black\',null,170,\'0\') ON CONFLICT (style_id) DO NOTHING'))
    .then(() => client.query('INSERT INTO photos VALUES (1,1,\'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80\',\'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80\'), (2,1,\'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80\',\'https://images.unsplash.com/photo-1534011546717-407bced4d25c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80\'), (3,1,\'https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80\',\'https://images.unsplash.com/photo-1549831243-a69a0b3d39e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80\'), (4,1,\'https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80\',\'https://images.unsplash.com/photo-1527522883525-97119bfce82d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80\'), (5,1,\'https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80\',\'https://images.unsplash.com/photo-1556648202-80e751c133da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80\'), (6,1,\'https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80\',\'https://images.unsplash.com/photo-1532543491484-63e29b3c1f5d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80\') ON CONFLICT (photos_id) DO NOTHING'))
    .then(() => client.query('INSERT INTO sku VALUES (1,1,\'XS\',8), (2,1,\'S\',16), (3,1,\'M\',17), (4,1,\'L\',10), (5,1,\'XL\',15), (6,1,\'XL\',4) ON CONFLICT (sku) DO NOTHING'))
    .then(() => client.query('INSERT INTO related_items VALUES (1,1,2), (2,1,3), (3,1,8), (4,1,7) ON CONFLICT (related_id) DO NOTHING'))
);

afterAll(done => client.end(done));

describe('GET /products', () => {
  describe('when a request is made with no params', () => {
    test('should return 5 products by default', async () => {
      jest.setTimeout(30000);
      await request(app).get('/products')
        .then(response => {
          expect(response.body.length).toBe(5);
        });
    });
    test('should return first 5 products in database by default', async () => {
      jest.setTimeout(30000);
      await request(app).get('/products')
        .then(response => {
          expect(response.body[0].name).toEqual(expect.stringContaining('Camo Onesie'));
          expect(response.body[1].name).toEqual(expect.stringContaining('Bright Future Sunglasses'));
          expect(response.body[2].name).toEqual(expect.stringContaining('Morning Joggers'));
          expect(response.body[3].name).toEqual(expect.stringContaining('Slacker'));
          expect(response.body[4].name).toEqual(expect.stringContaining('Heir Force Ones'));
        });
    });
    test('should respond with a 200 status code', async () => {
      jest.setTimeout(30000);
      await request(app).get('/products')
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });
    test('should specify json in the content type header', async () => {
      jest.setTimeout(30000);
      await request(app).get('/products')
        .then(response => {
          expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });
    });
  });
  describe('when a request is made with params', () => {
    test('should return number products based on count param', async () => {
      jest.setTimeout(30000);
      await request(app).get('/products/?count=3')
        .then(response => {
          expect(response.body.length).toBe(3);
        });
      await request(app).get('/products/?count=20')
        .then(response => {
          expect(response.body.length).toBe(20);
        });
    });
    test('should return products based on page param', async () => {
      jest.setTimeout(30000);
      await request(app).get('/products/?count=3&page=2')
        .then(response => {
          expect(response.body.length).toBe(3);
          expect(response.body[0].name).toEqual(expect.stringContaining('Slacker'));
          expect(response.body[1].name).toEqual(expect.stringContaining('Heir Force Ones'));
          expect(response.body[2].name).toEqual(expect.stringContaining('Pumped Up Kicks'));
        });
    });
  });
});

describe('GET /products/:product_id', () => {
  test('should return a product', async () => {
    jest.setTimeout(30000);
    await request(app).get('/products/1')
      .then(response => {
        expect(response.body.id).toBe(1);
        expect(response.body.features).toBeDefined();
        expect(response.statusCode).toBe(200);
      });
  });
  test('should return error on invalid id', async () => {
    jest.setTimeout(30000);
    await request(app).get('/products/a')
      .then(response => {
        expect(response.body.name).toEqual((expect.stringContaining('error')));
        expect(response.statusCode).toBe(404);
      });
  });
});

describe('GET /products/:product_id/styles', () => {
  test('should return all styles for a give product id', async () => {
    jest.setTimeout(30000);
    await request(app).get('/products/1/styles')
      .then(response => {
        expect(response.body.results.length).toBe(6);
        expect(response.statusCode).toBe(200);
      });
  });
  test('should return photos for each style', async () => {
    jest.setTimeout(30000);
    await request(app).get('/products/1/styles')
      .then(response => {
        expect(response.body.results[0].photos).toBeDefined();
      });
  });
  test('should return skus for each style', async () => {
    jest.setTimeout(30000);
    await request(app).get('/products/1/styles')
      .then(response => {
        expect(response.body.results[0].skus).toBeDefined();
      });
  });
  test('should return error on invalid id', async () => {
    jest.setTimeout(30000);
    await request(app).get('/products/a/styles')
      .then(response => {
        expect(response.body.name).toEqual((expect.stringContaining('error')));
        expect(response.statusCode).toBe(404);
      });
  });
});

describe('GET /products/:product_id/related', () => {
  test('should return related products given a product id', async () => {
    jest.setTimeout(30000);
    await request(app).get('/products/1/related')
      .then(response => {
        expect(response.body.length).toBe(4);
        expect(response.statusCode).toBe(200);
      });
  });
  test('should return error on invalid id', async () => {
    jest.setTimeout(30000);
    await request(app).get('/products/a/related')
      .then(response => {
        expect(response.body.name).toEqual((expect.stringContaining('error')));
        expect(response.statusCode).toBe(404);
      });
  });
});
