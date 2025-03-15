CREATE DATABASE ShopDB;
USE ShopDB;

-- Table: Account
CREATE TABLE Account (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username NVARCHAR(100) NOT NULL,
    password NVARCHAR(100) NOT NULL,
    email NVARCHAR(100),
    type_account BIT NOT NULL,
    status BIT NOT NULL
);
select * from account
Update account set
type_account ="ROLE_MANAGER" where id=2;
#thay đổi mới
ALTER TABLE product add COLUMN description nvarchar(200);
ALTER TABLE account modify COLUMN active BIT not null default 1;
ALTER TABLE voucher add COLUMN quantity int not null;
ALTER TABLE product add column urlImg nvarchar(200) not null default 'Hiện tại chưa có ảnh';

select * from voucher;
ALTER TABLE Account 
MODIFY COLUMN type_account Nvarchar(20) NOT NULL DEFAULT 'ROLE_USER', 
MODIFY COLUMN status BIT NOT NULL DEFAULT 1;

-- Table: Info
CREATE TABLE Info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    address NVARCHAR(100),
    tel CHAR(10),
    account_id INT,
    FOREIGN KEY (account_id) REFERENCES Account(id)
);

-- Table: Category
CREATE TABLE Category (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(50) NOT NULL
);

-- Table: Product
CREATE TABLE Product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    price FLOAT NOT NULL,
    status BIT NOT NULL,
    discount FLOAT,
    price_sales FLOAT,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES Category(id)
);

-- Table: Feedback
CREATE TABLE Feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    star INT(5) NOT NULL,
    comment NVARCHAR(1000),
    account_id INT,
    product_id INT,
    FOREIGN KEY (account_id) REFERENCES Account(id),
    FOREIGN KEY (product_id) REFERENCES Product(id)
);

-- Table: Cart
CREATE TABLE Cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quantity INT NOT NULL,
    id_product INT,
    FOREIGN KEY (id_product) REFERENCES Product(id)
);

-- Table: Voucher
CREATE TABLE Voucher (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Date_sale DATE NOT NULL,
    Date_end DATE NOT NULL,
    discount FLOAT NOT NULL,
    title NVARCHAR(50),
    code CHAR(8)
);

-- Table: Bill
CREATE TABLE Bill (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_product INT,
    id_account INT,
    FOREIGN KEY (id_product) REFERENCES Product(id),
    FOREIGN KEY (id_account) REFERENCES Account(id)
);

-- Table: Bill_detail
CREATE TABLE Bill_detail (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quantity INT NOT NULL,
    total_price FLOAT NOT NULL,
    type_payment BIT NOT NULL,
    Date DATE NOT NULL ,
    id_bill INT,
    FOREIGN KEY (id_bill) REFERENCES Bill(id)
);
ALTER TABLE Bill_detail 
MODIFY COLUMN Date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;



-- Table: Revenue
CREATE TABLE Revenue (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Date DATE NOT NULL,
    total FLOAT NOT NULL
);
-- Insert sample data
INSERT INTO Account (username, password, email, type_account, status) VALUES
('john_doe', 'password123', 'john@example.com', 0, 1),
('jane_smith', 'securepass', 'jane@example.com', 1, 1);

INSERT INTO Info (address, tel, account_id) VALUES
('123 Main St', '1234567890', 1),
('456 Elm St', '0987654321', 2);

INSERT INTO Category (name) VALUES
('Electronics'),
('Books');

INSERT INTO Product (name, price, status, discount, price_sales, category_id) VALUES
('Smartphone', 699.99, 1, 10.0, 629.99, 1),
('Novel', 19.99, 1, 0, 19.99, 2);

INSERT INTO Feedback (star, comment, account_id, product_id) VALUES
(5, 'Excellent product!', 1, 1),
(4, 'Good read.', 2, 2);

INSERT INTO Cart (quantity, id_product) VALUES
(2, 1),
(1, 2);

INSERT INTO Voucher (Date_sale, Date_end, discount, title, code) VALUES
('2025-01-01', '2025-01-31', 20.0, 'New Year Discount', 'NY2025');

INSERT INTO Bill (id_product, id_account) VALUES
(1, 1),
(2, 2);

INSERT INTO Bill_detail (quantity, total_price, type_payment, Date, id_bill) VALUES
(2, 1259.98, 1, '2025-01-19', 1),
(1, 19.99, 0, '2025-01-19', 2);

INSERT INTO Revenue (Date, total) VALUES
('2025-01-19', 1279.97);
