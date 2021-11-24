const request = require('supertest');
const app = require('../app');

describe('GET /products', () => {
  describe('when a request is made with no params', () => {
    test('should return 5 products by default', async () => {
      await request(app).get('/products')
        .then(response => {
          expect(response.body.length).toBe(5);
        });
    });
    test('should return first 5 products in database by default', async () => {
      await request(app).get('/products')
        .then(response => {
          expect(response.body[0].name).toEqual(expect.stringContaining('Camo Onesie'));
          expect(response.body[1].name).toEqual(expect.stringContaining('Bright Future Sunglasses'));
          expect(response.body[2].name).toEqual(expect.stringContaining('Morning Joggers'));
          expect(response.body[3].name).toEqual(expect.stringContaining('Slacker\'s Slacks'));
          expect(response.body[4].name).toEqual(expect.stringContaining('Heir Force Ones'));
        });
    });
    test('should respond with a 200 status code', async () => {
      await request(app).get('/products')
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });
    test('should specify json in the content type header', async () => {
      await request(app).get('/products')
        .then(response => {
          expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });
    });
  });
  describe('when a request is made with params', () => {
    test('should return number products based on count param', async () => {
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
      await request(app).get('/products/?page=2')
        .then(response => {
          expect(response.body.length).toBe(5);
          expect(response.body[0].name).toEqual(expect.stringContaining('Pumped Up Kicks'));
          expect(response.body[1].name).toEqual(expect.stringContaining('Blues Suede Shoes'));
          expect(response.body[2].name).toEqual(expect.stringContaining('YEasy 350'));
          expect(response.body[3].name).toEqual(expect.stringContaining('Summer Shoes'));
          expect(response.body[4].name).toEqual(expect.stringContaining('Infinity Stone'));
        });
    });
  });
});

describe('GET /products/:product_id', () => {
  test('should return a product', async () => {
    await request(app).get('/products/1')
      .then(response => {
        expect(response.body.id).toBe(1);
        expect(response.body.features).toBeDefined();
        expect(response.statusCode).toBe(200);
      });
  });
  test('should return error on invalid id', async () => {
    await request(app).get('/products/a')
      .then(response => {
        expect(response.body.name).toEqual((expect.stringContaining('error')));
        expect(response.statusCode).toBe(404);
      });
  });
});

describe('GET /products/:product_id/styles', () => {
  test('should return all styles for a give product id', async () => {
    await request(app).get('/products/1/styles')
      .then(response => {
        expect(response.body.results.length).toBe(6);
        expect(response.statusCode).toBe(200);
      });
  });
  test('should return photos for each style', async () => {
    await request(app).get('/products/1/styles')
      .then(response => {
        expect(response.body.results[0].photos).toBeDefined();
      });
  });
  test('should return skus for each style', async () => {
    await request(app).get('/products/1/styles')
      .then(response => {
        expect(response.body.results[0].skus).toBeDefined();
      });
  });
  test('should return error on invalid id', async () => {
    await request(app).get('/products/a/styles')
      .then(response => {
        expect(response.body.name).toEqual((expect.stringContaining('error')));
        expect(response.statusCode).toBe(404);
      });
  });
});

describe('GET /products/:product_id/related', () => {
  test('should return related products given a product id', async () => {
    await request(app).get('/products/1/related')
      .then(response => {
        expect(response.body.length).toBe(4);
        expect(response.statusCode).toBe(200);
      });
  });
  test('should return error on invalid id', async () => {
    await request(app).get('/products/a/related')
      .then(response => {
        expect(response.body.name).toEqual((expect.stringContaining('error')));
        expect(response.statusCode).toBe(404);
      });
  });
});
