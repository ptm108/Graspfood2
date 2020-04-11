CREATE TABLE FullTime(
	uid INTEGER,
	monthlyBaseSalary DECIMAL,
	PRIMARY KEY(uid),
	FOREIGN KEY (uid) REFERENCES DeliveryRider(uid) ON DELETE CASCADE
);

CREATE TABLE PartTime(
	uid INTEGER,
	weeklyBaseSalary DECIMAL,
	totalWorkHours INTEGER,
	PRIMARY KEY(uid),
	FOREIGN KEY (uid) REFERENCES DeliveryRider(uid) ON DELETE CASCADE
);

CREATE TABLE Promotion(
	pid SERIAL,
	rid INTEGER,
	minSpending NUMERIC(5,2),
	percentDiscount INTEGER,
	maxCustomerCount INTEGER,
	currCustomerCount INTEGER,
	customerType VARCHAR(255),
	startDate DATE,
	endDate DATE,
	promoCode VARCHAR(255) UNIQUE,
	PRIMARY KEY(pid),
	FOREIGN KEY(rid) REFERENCES Restaurant(rid) ON DELETE CASCADE
);

CREATE TABLE Restaurant (
rid  SERIAL, 
rname VARCHAR(255) UNIQUE, 
minSpending DECIMAL,
streetName VARCHAR(255), 
unitNo VARCHAR(255), 
postalCode BIGINT, 
PRIMARY KEY(rid)
);

CREATE TABLE Customer(
	uid INTEGER PRIMARY KEY REFERENCES Actor ON DELETE CASCADE,
cname VARCHAR(255),
rewardPoints INTEGER
);

CREATE TABLE OrderPlaced(
oid SERIAL,
uid INTEGER,
rid INTEGER,
timeStamp TIMESTAMP,
totalPrice DECIMAL(5,2),
deliveryFee DECIMAL(5,2),
rewardPointsUsed INTEGER,
paymentMethod VARCHAR(255),
address VARCHAR(255),
postalCode VARCHAR(6),
promoCode VARCHAR(255),
PRIMARY KEY(oid),
FOREIGN KEY(uid) REFERENCES Customer (uid) ON DELETE SET NULL,
            FOREIGN KEY(rid) REFERENCES Restaurant (rid) ON DELETE SET NULL
);

CREATE TABLE Actor (
uid SERIAL, 
username VARCHAR(255) UNIQUE NOT NULL, 
password VARCHAR(25) NOT NULL, 
accessRight INTEGER REFERENCES ActorType(aid), 
PRIMARY KEY(uid)
);

CREATE TABLE RestaurantStaff(
	uid INTEGER PRIMARY KEY REFERENCES Actor ON DELETE CASCADE,
	rid INTEGER,
	rsName VARCHAR(255),
            FOREIGN KEY (rid) REFERENCES Restaurant (rid) ON DELETE CASCADE
);

CREATE TABLE FDSManager(
	uid INTEGER PRIMARY KEY REFERENCES Actor ON DELETE CASCADE,
	fdsmName VARCHAR(225)
);

CREATE TABLE DeliveryRider(
	uid INTEGER PRIMARY KEY REFERENCES Actor ON DELETE CASCADE,
	drname VARCHAR(255),
	isIdle BOOLEAN,
	deliveryRiderRating NUMERIC(2,1),
	timeForScheduleUpdate TIMESTAMP, 
	joinDate DATE,
	totalWorkHours INTEGER DEFAULT 0
);

CREATE TABLE Schedule (
	dayNo 	INTEGER,
	startNo INTEGER, 
endNo INTEGER, 
	PRIMARY KEY(dayNo, startNo, endNo),
	check (
	    (dayNo in (1,2,3,4,5,6,7) and startNo >= 10 and endNo <= 22)
	)
);

CREATE TABLE Works (
	uid INTEGER,
	dayNo INTEGER NOT NULL,
	startNo INTEGER NOT NULL,
	endNo INTEGER NOT NULL,
	hours INTEGER NOT NULL,
	PRIMARY KEY(uid, dayNo, startNo, endNo),
	FOREIGN KEY(uid) REFERENCES DeliveryRider(uid) ON DELETE CASCADE,
	FOREIGN KEY(dayNo,  startNo, endNo) REFERENCES Schedule(dayNo, startNo, endNo) ON DELETE CASCADE
	);

CREATE TABLE FoodItem (
	fid SERIAL,
	rid INTEGER,
	fname VARCHAR(255),
	price DECIMAL(5,2),
description VARCHAR(255), 
category VARCHAR(255),
currentNumOforders INTEGER,
dailyLimit INTEGER,
PRIMARY KEY (fid),
FOREIGN KEY (rid) REFERENCES Restaurant (rid) ON DELETE SET NULL
);

CREATE TABLE CreditCard (
	uid INTEGER,
	ccNumber VARCHAR(255),
	cardHolderName VARCHAR(255) NOT NULL,
	expiryDate DATE NOT NULL,
	PRIMARY KEY(ccNumber, uid),
FOREIGN KEY(uid) REFERENCES Customer (uid) ON DELETE CASCADE
	);

CREATE TABLE Delivers (
	oid INTEGER,
	uid INTEGER,
	riderLeaveForRestaurantTime TIMESTAMP,
	riderArriveAtRestaurantTime TIMESTAMP,
	riderLeaveRestaurantTime TIMESTAMP,
	riderDeliverTime TIMESTAMP,
	delieveryFeeCommission DECIMAL,
	deliveryServiceRating DECIMAL,
PRIMARY KEY(oid, uid),
	FOREIGN KEY(oid) REFERENCES OrderPlaced(oid) ON DELETE SET NULL,
	FOREIGN KEY(uid) REFERENCES DeliveryRider(uid) ON DELETE SET NULL
);

CREATE TABLE Reviews (	
	reid SERIAL,
oid INTEGER,
uid INTEGER,
timeStamp TIMESTAMP,
title VARCHAR(255),
description VARCHAR(255),
rating DECIMAL,
	PRIMARY KEY(reid),
	FOREIGN KEY(oid) REFERENCES OrderPlaced (oid) ON DELETE SET NULL,
	FOREIGN KEY(uid) REFERENCES Customer(uid) ON DELETE SET NULL
);


