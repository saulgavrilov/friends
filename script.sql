CREATE DATABASE `friends`;

-- Users Table
CREATE TABLE `friends`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `coverPic` TEXT(300) NULL,
  `profilePic` TEXT(300) NULL,
  `createdAt` DATETIME NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE);

-- Posts Table
CREATE TABLE `friends`.`posts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `desc` TEXT(300) NOT NULL,
  `img` TEXT(300) NULL,
  `userId` INT NOT NULL,
  `createdAt` DATETIME NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `userId_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `userId`
    FOREIGN KEY (`userId`)
    REFERENCES `friends`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

-- Comments Table
CREATE TABLE `friends`.`comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `desc` VARCHAR(100) NOT NULL,
  `userId` INT NOT NULL,
  `postId` INT NOT NULL,
  `createdAt` DATETIME NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `userId_idx` (`userId` ASC) VISIBLE,
  INDEX `postId_idx` (`postId` ASC) VISIBLE,
  CONSTRAINT `commentUserId`
    FOREIGN KEY (`userId`)
    REFERENCES `friends`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `postId`
    FOREIGN KEY (`postId`)
    REFERENCES `friends`.`posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

-- Relationships Table
CREATE TABLE `friends`.`relationships` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `followerUserId` INT NOT NULL,
  `followedUserId` INT NOT NULL,
  `createdAt` DATETIME NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `followerUser_idx` (`followerUserId` ASC) VISIBLE,
  INDEX `followedUser_idx` (`followedUserId` ASC) VISIBLE,
  CONSTRAINT `followerUser`
    FOREIGN KEY (`followerUserId`)
    REFERENCES `friends`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `followedUser`
    FOREIGN KEY (`followedUserId`)
    REFERENCES `friends`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

-- Likes Table
CREATE TABLE `friends`.`likes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `postId` INT NOT NULL,
  `createdAt` DATETIME NULL DEFAULT now(),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `likeUserId_idx` (`userId` ASC) VISIBLE,
  INDEX `likePostId_idx` (`postId` ASC) VISIBLE,
  CONSTRAINT `likeUserId`
    FOREIGN KEY (`userId`)
    REFERENCES `friends`.`users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `likePostId`
    FOREIGN KEY (`postId`)
    REFERENCES `friends`.`posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);