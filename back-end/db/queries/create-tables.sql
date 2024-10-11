CREATE TABLE prices(
    neighbourhood_id VARCHAR(50) PRIMARY KEY,
    price INTEGER NOT NULL
);
CREATE TABLE prices_history(
    id SERIAL PRIMARY KEY ,
    neighbourhood_id VARCHAR(50) REFERENCES prices(neighbourhood_id) ON DELETE CASCADE,
    price INTEGER NOT NULL,
    timestamp TIMESTAMP NOT NULL
);
CREATE TABLE emailing_list(
   email VARCHAR(50) PRIMARY KEY
);
