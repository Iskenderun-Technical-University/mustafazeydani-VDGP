CREATE TABLE `projects`(
    `uuid` VARCHAR(36) NOT NULL,
    `user_uuid` VARCHAR(36) NOT NULL,
    `name` VARCHAR(25) NOT NULL,
    `field` VARCHAR(25) NOT NULL,
    `description` TEXT NOT NULL,
    `creation_date` DATETIME NOT NULL
);

ALTER TABLE `projects`
    ADD PRIMARY KEY(`uuid`);

ALTER TABLE `projects`
    ADD INDEX `projects_name_index`(`name`);

CREATE TABLE `notes`(
    `uuid` VARCHAR(36) NOT NULL,
    `user_uuid` VARCHAR(36) NOT NULL,
    `content` TEXT NOT NULL
);

ALTER TABLE `notes`
    ADD PRIMARY KEY(`uuid`);

CREATE TABLE `tasks`(
    `uuid` VARCHAR(36) NOT NULL,
    `user_uuid` VARCHAR(36) NOT NULL,
    `project_uuid` VARCHAR(36) NOT NULL,
    `task` VARCHAR(100) NOT NULL,
    `deadline` DATETIME NOT NULL,
    `priority` VARCHAR(25) NOT NULL,
    `status` VARCHAR(25) NOT NULL,
    `project_name` VARCHAR(25) NOT NULL
);

ALTER TABLE `tasks`
    ADD PRIMARY KEY(`uuid`);

ALTER TABLE `tasks`
    ADD INDEX `tasks_project_name_index`(`project_name`);

CREATE TABLE `user_stats`(
    `user_uuid` VARCHAR(36) NOT NULL,
    `completed_projects` INT NOT NULL,
    `completed_tasks` INT NOT NULL,
    `ongoing_tasks` INT NOT NULL
);

ALTER TABLE `user_stats` 
    ADD PRIMARY KEY(`user_uuid`);

CREATE TABLE `users`(
    `uuid` VARCHAR(36) NOT NULL,
    `username` VARCHAR(25) NOT NULL,
    `email` VARCHAR(25) NOT NULL,
    `password` VARCHAR(60) NOT NULL
);

ALTER TABLE `users`
    ADD PRIMARY KEY(`uuid`);

ALTER TABLE `tasks`
    ADD CONSTRAINT 
    `tasks_user_uuid_foreign` 
    FOREIGN KEY(`user_uuid`) 
    REFERENCES `users`(`uuid`)
    ON DELETE CASCADE;
    
ALTER TABLE `tasks`
    ADD CONSTRAINT 
    `tasks_project_uuid_foreign` 
    FOREIGN KEY(`project_uuid`) 
    REFERENCES `projects`(`uuid`)
    ON DELETE CASCADE;
    
ALTER TABLE `projects`
    ADD CONSTRAINT 
    `projects_user_uuid_foreign` 
    FOREIGN KEY(`user_uuid`) 
    REFERENCES `users`(`uuid`)
    ON DELETE CASCADE;

ALTER TABLE `tasks`
    ADD CONSTRAINT 
    `tasks_project_name_foreign` 
    FOREIGN KEY(`project_name`) 
    REFERENCES `projects`(`name`)
    ON DELETE CASCADE;
    
ALTER TABLE `notes`
    ADD CONSTRAINT 
    `notes_user_uuid_foreign` 
    FOREIGN KEY(`user_uuid`) 
    REFERENCES `users`(`uuid`)
    ON DELETE CASCADE;
    
ALTER TABLE `user_stats` 
    ADD CONSTRAINT 
    `users_stats_user_uuid_foreign` 
    FOREIGN KEY(`user_uuid`) 
    REFERENCES `users`(`uuid`)
    ON DELETE CASCADE;