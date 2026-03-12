-- Insert sample products across different categories

-- Electronics
INSERT INTO products (name, description, price, category, image_url, rating, reviews, badge, stock) VALUES
('iPhone 15 Pro', 'Latest iPhone with A17 Pro chip, titanium design', 999.99, 'Electronics', 'https://m.media-amazon.com/images/I/81fxjeu8fdL._AC_UY218_.jpg', 4.8, 2341, 'Bestseller', 50),
('MacBook Air M2', 'Ultra-thin laptop with M2 chip', 1299.99, 'Electronics', 'https://m.media-amazon.com/images/I/71jG+e7roXL._AC_UY218_.jpg', 4.7, 1823, 'Top Rated', 30),
('Sony WH-1000XM5', 'Premium noise-canceling headphones', 399.99, 'Electronics', 'https://m.media-amazon.com/images/I/61vJHhmGOZL._AC_UY218_.jpg', 4.6, 912, 'Premium', 75),
('Samsung Galaxy Watch 6', 'Smart fitness and health tracking', 299.99, 'Electronics', 'https://m.media-amazon.com/images/I/61VxgmGRRML._AC_UY218_.jpg', 4.5, 567, NULL, 60);

-- Fashion
INSERT INTO products (name, description, price, category, image_url, rating, reviews, badge, stock) VALUES
('Leather Jacket', 'Genuine leather motorcycle jacket', 249.99, 'Fashion', 'https://m.media-amazon.com/images/I/71XBpWBpoeL._AC_UY218_.jpg', 4.7, 445, 'Trending', 25),
('Denim Jeans', 'Classic fit blue denim jeans', 79.99, 'Fashion', 'https://m.media-amazon.com/images/I/81Ywkq+iDkL._AC_UY218_.jpg', 4.4, 1234, NULL, 100),
('Running Shoes', 'Lightweight athletic running shoes', 129.99, 'Fashion', 'https://m.media-amazon.com/images/I/71EFOQ4AgML._AC_UY218_.jpg', 4.6, 789, 'Popular', 80),
('Wool Sweater', 'Cozy merino wool sweater', 89.99, 'Fashion', 'https://m.media-amazon.com/images/I/81YkqyaFVEL._AC_UY218_.jpg', 4.5, 332, NULL, 45);

-- Home & Kitchen
INSERT INTO products (name, description, price, category, image_url, rating, reviews, badge, stock) VALUES
('Coffee Maker', 'Programmable 12-cup coffee maker', 59.99, 'Home & Kitchen', 'https://m.media-amazon.com/images/I/81nMGDHMTRL._AC_UY218_.jpg', 4.3, 1567, 'Best Value', 120),
('Air Fryer', '5.8QT digital air fryer', 89.99, 'Home & Kitchen', 'https://m.media-amazon.com/images/I/71V1B2p9ZHL._AC_UY218_.jpg', 4.5, 890, 'Hot Deal', 65),
('Vacuum Cleaner', 'Cordless stick vacuum cleaner', 199.99, 'Home & Kitchen', 'https://m.media-amazon.com/images/I/71T6oKWiqEL._AC_UY218_.jpg', 4.4, 423, NULL, 35),
('Blender', 'High-speed professional blender', 149.99, 'Home & Kitchen', 'https://m.media-amazon.com/images/I/61zXIbmIrHL._AC_UY218_.jpg', 4.6, 278, 'Premium', 40);

-- Books
INSERT INTO products (name, description, price, category, image_url, rating, reviews, badge, stock) VALUES
('The Great Gatsby', 'Classic American novel by F. Scott Fitzgerald', 12.99, 'Books', 'https://m.media-amazon.com/images/I/91bYsX41DVL._AC_UY218_.jpg', 4.7, 2341, 'Classic', 200),
('JavaScript Guide', 'Complete guide to modern JavaScript', 39.99, 'Books', 'https://m.media-amazon.com/images/I/71g2ednj0JL._AC_UY218_.jpg', 4.8, 567, 'Bestseller', 150),
('Cookbook Collection', '500+ recipes from around the world', 29.99, 'Books', 'https://m.media-amazon.com/images/I/81bsw6fnUiL._AC_UY218_.jpg', 4.5, 892, NULL, 100),
('Science Fiction Anthology', 'Best sci-fi stories of the decade', 19.99, 'Books', 'https://m.media-amazon.com/images/I/71T6oKWiqEL._AC_UY218_.jpg', 4.6, 445, 'Award Winner', 80);

-- Sports
INSERT INTO products (name, description, price, category, image_url, rating, reviews, badge, stock) VALUES
('Yoga Mat', 'Non-slip exercise yoga mat', 29.99, 'Sports', 'https://m.media-amazon.com/images/I/81HLkDGxReL._AC_UY218_.jpg', 4.5, 1234, 'Popular', 150),
('Dumbbells Set', 'Adjustable weight dumbbells set', 79.99, 'Sports', 'https://m.media-amazon.com/images/I/71QFDO2MQJL._AC_UY218_.jpg', 4.4, 567, NULL, 60),
('Tennis Racket', 'Professional grade tennis racket', 159.99, 'Sports', 'https://m.media-amazon.com/images/I/61uwIhHgrXL._AC_UY218_.jpg', 4.7, 234, 'Pro Choice', 30),
('Mountain Bike', '21-speed mountain bike', 399.99, 'Sports', 'https://m.media-amazon.com/images/I/71T6oKWiqEL._AC_UY218_.jpg', 4.6, 123, 'Premium', 20);

-- Beauty
INSERT INTO products (name, description, price, category, image_url, rating, reviews, badge, stock) VALUES
('Face Cream', 'Anti-aging moisturizing face cream', 49.99, 'Beauty', 'https://m.media-amazon.com/images/I/51kVGrbEBGL._AC_UY218_.jpg', 4.6, 890, 'Top Rated', 80),
('Perfume Set', 'Luxury fragrance gift set', 89.99, 'Beauty', 'https://m.media-amazon.com/images/I/71T6oKWiqEL._AC_UY218_.jpg', 4.5, 445, 'Gift Idea', 40),
('Hair Dryer', 'Professional salon hair dryer', 79.99, 'Beauty', 'https://m.media-amazon.com/images/I/61isCOmGKxL._AC_UY218_.jpg', 4.4, 678, NULL, 50),
('Makeup Kit', 'Complete professional makeup kit', 129.99, 'Beauty', 'https://m.media-amazon.com/images/I/71T6oKWiqEL._AC_UY218_.jpg', 4.7, 332, 'Premium', 25);
