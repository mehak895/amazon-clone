-- Update all product image URLs to real Amazon CDN URLs

-- Electronics
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/81fxjeu8fdL._AC_UY218_.jpg' WHERE name = 'iPhone 15 Pro';
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/71jG+e7roXL._AC_UY218_.jpg' WHERE name = 'MacBook Air M2';
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/61vJHhmGOZL._AC_UY218_.jpg' WHERE name = 'Sony WH-1000XM5';
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/61VxgmGRRML._AC_UY218_.jpg' WHERE name = 'Samsung Galaxy Watch 6';

-- Fashion
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/71XBpWBpoeL._AC_UY218_.jpg' WHERE name = 'Leather Jacket';
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/81Ywkq+iDkL._AC_UY218_.jpg' WHERE name = 'Denim Jeans';
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/71EFOQ4AgML._AC_UY218_.jpg' WHERE name = 'Running Shoes';
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/81YkqyaFVEL._AC_UY218_.jpg' WHERE name = 'Wool Sweater';

-- Home & Kitchen
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/81nMGDHMTRL._AC_UY218_.jpg' WHERE name = 'Coffee Maker';
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/71V1B2p9ZHL._AC_UY218_.jpg' WHERE name = 'Air Fryer';
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/71T6oKWiqEL._AC_UY218_.jpg' WHERE name = 'Vacuum Cleaner';
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/61zXIbmIrHL._AC_UY218_.jpg' WHERE name = 'Blender';

-- Books
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UY218_.jpg' WHERE name = 'The Great Gatsby';
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/71g2ednj0JL._AC_UY218_.jpg' WHERE name = 'JavaScript Guide';
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UY218_.jpg' WHERE name = 'Cookbook Collection';
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/71T6oKWiqEL._AC_UY218_.jpg' WHERE name = 'Science Fiction Anthology';

-- Sports
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/81HLkDGxReL._AC_UY218_.jpg' WHERE name = 'Yoga Mat';
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/71QFDO2MQJL._AC_UY218_.jpg' WHERE name = 'Dumbbells Set';
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/61uwIhHgrXL._AC_UY218_.jpg' WHERE name = 'Tennis Racket';
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/71T6oKWiqEL._AC_UY218_.jpg' WHERE name = 'Mountain Bike';

-- Beauty
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/51kVGrbEBGL._AC_UY218_.jpg' WHERE name = 'Face Cream';
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/71T6oKWiqEL._AC_UY218_.jpg' WHERE name = 'Perfume Set';
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/61isCOmGKxL._AC_UY218_.jpg' WHERE name = 'Hair Dryer';
UPDATE products SET image_url = 'https://m.media-amazon.com/images/I/71T6oKWiqEL._AC_UY218_.jpg' WHERE name = 'Makeup Kit';

-- Verify updates
SELECT name, image_url FROM products ORDER BY id;
