<?php

use Illuminate\Support\Facades\Route;
use Modules\Proxmox\Http\Controllers\VmController;

// Phase 1: VM list endpoint, unauthenticated for the read-only gate check.
// Locked down behind auth:sanctum in Phase 7.
Route::get('/vms', [VmController::class, 'index'])->name('vms.index');
