<?php
$pdo = new PDO('mysql:host=localhost;port=3306;dbname=srl_platform', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Run each statement individually 
$statements = [

    // 1. Add missing columns to targets table
    "ALTER TABLE `targets` ADD COLUMN IF NOT EXISTS `focus_dimension` VARCHAR(100) DEFAULT 'General'",
    "ALTER TABLE `targets` ADD COLUMN IF NOT EXISTS `priority` VARCHAR(20) DEFAULT 'medium'",
    "ALTER TABLE `targets` ADD COLUMN IF NOT EXISTS `due_date` DATE",

    // 2. Change status to varchar so it supports not_started/in_progress/completed
    "ALTER TABLE `targets` MODIFY COLUMN `status` VARCHAR(50) DEFAULT 'not_started'",

    // 3. Create subtasks table
    "CREATE TABLE IF NOT EXISTS `subtasks` (
        `subtask_id` CHAR(36) PRIMARY KEY,
        `target_id` CHAR(36) NOT NULL,
        `user_id` CHAR(36) NOT NULL,
        `title` VARCHAR(200) NOT NULL,
        `is_completed` TINYINT(1) DEFAULT 0,
        `completed_at` TIMESTAMP NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX `idx_subtasks_target` (`target_id`),
        INDEX `idx_subtasks_user` (`user_id`),
        CONSTRAINT `fk_subtask_target` FOREIGN KEY (`target_id`) REFERENCES `targets`(`target_id`) ON DELETE CASCADE,
        CONSTRAINT `fk_subtask_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
    ) ENGINE=InnoDB",

    // 4. Create notifications table
    "CREATE TABLE IF NOT EXISTS `notifications` (
        `notification_id` CHAR(36) PRIMARY KEY,
        `user_id` CHAR(36) NOT NULL,
        `type` VARCHAR(50) NOT NULL DEFAULT 'info',
        `title` VARCHAR(200) NOT NULL,
        `message` TEXT NOT NULL,
        `is_read` TINYINT(1) DEFAULT 0,
        `related_id` CHAR(36) NULL,
        `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX `idx_notif_user` (`user_id`, `created_at`),
        CONSTRAINT `fk_notif_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE CASCADE
    ) ENGINE=InnoDB",
];

foreach ($statements as $stmt) {
    try {
        $pdo->exec($stmt);
        $preview = substr(preg_replace('/\s+/', ' ', $stmt), 0, 80);
        echo "✅ OK: $preview...\n";
    } catch (PDOException $e) {
        $code = $e->getCode();
        $msg  = $e->getMessage();
        // 1060 = Duplicate column, 1050 = Table already exists - safe to ignore
        if (strpos($msg, 'Duplicate column') !== false || strpos($msg, "already exists") !== false) {
            $preview = substr(preg_replace('/\s+/', ' ', $stmt), 0, 60);
            echo "⏭️  SKIP (already exists): $preview...\n";
        } else {
            echo "❌ ERR [$code]: $msg\n";
        }
    }
}

// Verify tables exist
echo "\n--- Verification ---\n";
$tables = ['targets', 'subtasks', 'notifications'];
foreach ($tables as $table) {
    $result = $pdo->query("SHOW TABLES LIKE '$table'")->fetchAll();
    echo ($result ? "✅" : "❌") . " Table `$table` " . ($result ? "EXISTS" : "MISSING") . "\n";
}

// Show targets columns
echo "\n--- Targets Columns ---\n";
$cols = $pdo->query("SHOW COLUMNS FROM targets")->fetchAll(PDO::FETCH_ASSOC);
foreach ($cols as $col) {
    echo "  • {$col['Field']} ({$col['Type']})\n";
}
echo "\n✅ All done!\n";
