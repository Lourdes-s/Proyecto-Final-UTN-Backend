CREATE TABLE Users (
	id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT FALSE,
    verify_email BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE TABLE Contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    user_id_contact INT NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id_contact) REFERENCES Users (id) ON DELETE CASCADE,
    UNIQUE(user_id, user_id_contact)
)

CREATE TABLE Chats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    issurer_id INT NOT NULL,
    receiver_id INT NOT NULL,
    content VARCHAR(255) NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (issurer_id) REFERENCES Users (id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES Users (id) ON DELETE CASCADE
)

ALTER TABLE Users ADD thumbnail LONGTEXT; 
ALTER TABLE Users ADD telephone VARCHAR(255); 
ALTER TABLE Users ADD public_state VARCHAR(255); 
ALTER TABLE Users ADD description_content VARCHAR(255); 
ALTER TABLE Users ADD address_content VARCHAR(255); 
