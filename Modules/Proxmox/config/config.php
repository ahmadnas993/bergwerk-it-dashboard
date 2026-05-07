<?php

return [
    'name' => 'Proxmox',

    'host' => env('PROXMOX_HOST'),
    'port' => (int) env('PROXMOX_PORT', 8006),
    'node' => env('PROXMOX_NODE'),

    'token_id' => env('PROXMOX_TOKEN_ID'),
    'token_secret' => env('PROXMOX_TOKEN_SECRET'),

    'verify_ssl' => (bool) env('PROXMOX_VERIFY_SSL', false),

    'base_url' => sprintf(
        'https://%s:%d/api2/json',
        env('PROXMOX_HOST'),
        (int) env('PROXMOX_PORT', 8006),
    ),
];
