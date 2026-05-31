<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

try {
    DB::statement("DROP TABLE IF EXISTS srl_platform.schedules");
    DB::statement("
        CREATE TABLE srl_platform.schedules (
          schedule_id CHAR(36) PRIMARY KEY,
          user_id CHAR(36) NOT NULL,
          title VARCHAR(200) NOT NULL,
          description TEXT,
          date DATE NOT NULL,
          start_time VARCHAR(10) NOT NULL,
          end_time VARCHAR(10) NOT NULL,
          duration_minutes INT DEFAULT 0,
          focus_dimension VARCHAR(100) DEFAULT 'General',
          status VARCHAR(50) DEFAULT 'planned',
          target_id CHAR(36),
          created_at DATETIME(3),
          updated_at DATETIME(3)
        )
    ");
    echo "Table recreated successfully.\n";
} catch (\Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
