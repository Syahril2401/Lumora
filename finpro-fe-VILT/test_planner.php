<?php
$ch = curl_init('http://localhost:8008/api/auth/login');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['email' => 'admin@example.com', 'password' => 'admin123']));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
$loginRes = curl_exec($ch);
curl_close($ch);

$token = json_decode($loginRes, true)['data']['token'];
echo "Got token: " . substr($token, 0, 10) . "...\n";

$ch2 = curl_init('http://localhost:8008/api/dashboard/planner');
curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch2, CURLOPT_HTTPHEADER, ["Authorization: Bearer $token"]);
$res = curl_exec($ch2);
$httpcode = curl_getinfo($ch2, CURLINFO_HTTP_CODE);
curl_close($ch2);

echo "HTTP Code: $httpcode\n";
echo "Response: $res\n";
