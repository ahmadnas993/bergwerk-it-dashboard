<?php

declare(strict_types=1);

use Illuminate\Support\Facades\Route;

// Phase 1 placeholder — auth middleware redirects unauthenticated users to route('login').
// Phase 7 replaces this with a real login flow.
Route::get('/login', fn () => response()->json(['message' => 'Authentication required'], 401))
    ->name('login');

Route::get('/{any?}', fn () => view('app'))
    ->where('any', '^(?!(api|sanctum|horizon|build|storage|up|login)(/|$)).*$');
