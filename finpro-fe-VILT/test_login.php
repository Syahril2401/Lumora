<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$api = app(\App\Services\GoApiService::class);
$result = $api->login(['email' => 'test@gmail.com', 'password' => '12345678']); // adjust password if needed
print_r($result);
