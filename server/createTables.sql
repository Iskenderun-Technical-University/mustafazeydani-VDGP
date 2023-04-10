CREATE TABLE `projects`(
    `uuid` VARCHAR(36) NOT NULL,
    `user_uuid` VARCHAR(36) NOT NULL,
    `name` VARCHAR(25) NOT NULL,
    `field` VARCHAR(25) NOT NULL,
    `creation_date` DATE NOT NULL,
    `is_favourite` TINYINT(1) NOT NULL
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
    `deadline` DATE NOT NULL,
    `status` VARCHAR(25) NOT NULL,
    `project_name` VARCHAR(25) NOT NULL,
    `priority` VARCHAR(25) NOT NULL,
    `is_done` TINYINT(1) NOT NULL
);

ALTER TABLE `tasks`
    ADD PRIMARY KEY(`uuid`);

ALTER TABLE `tasks`
    ADD INDEX `tasks_project_name_index`(`project_name`);

CREATE TABLE `project_specs`(
    `uuid` VARCHAR(36) NOT NULL,
    `project_uuid` VARCHAR(36) NOT NULL,
    `specification` VARCHAR(255) NOT NULL
);

ALTER TABLE `project_specs`
    ADD PRIMARY KEY(`uuid`);

CREATE TABLE `project_stats`(
    `uuid` VARCHAR(36) NOT NULL,
    `user_uuid` VARCHAR(36) NOT NULL,
    `total` INT NOT NULL,
    `completed` INT NOT NULL,
    `in_progress` INT NOT NULL,
    `out_of_schedule` INT NOT NULL
);

ALTER TABLE `project_stats`
    ADD PRIMARY KEY(`uuid`);

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
    
ALTER TABLE `project_specs`
    ADD CONSTRAINT 
    `project_specs_project_uuid_foreign` 
    FOREIGN KEY(`project_uuid`) 
    REFERENCES `projects`(`uuid`)
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
    
ALTER TABLE `projects`
    ADD CONSTRAINT 
    `projects_name_foreign` 
    FOREIGN KEY(`name`) 
    REFERENCES `tasks`(`project_name`)
    ON DELETE CASCADE;
    
ALTER TABLE `notes`
    ADD CONSTRAINT 
    `notes_user_uuid_foreign` 
    FOREIGN KEY(`user_uuid`) 
    REFERENCES `users`(`uuid`)
    ON DELETE CASCADE;
    
ALTER TABLE `project_stats`
    ADD CONSTRAINT 
    `project_stats_user_uuid_foreign` 
    FOREIGN KEY(`user_uuid`) 
    REFERENCES `users`(`uuid`)
    ON DELETE CASCADE;