<?php

namespace Modules\Proxmox\Providers;

use Modules\Proxmox\Services\ProxmoxService;
use Nwidart\Modules\Support\ModuleServiceProvider;

class ProxmoxServiceProvider extends ModuleServiceProvider
{
    protected string $name = 'Proxmox';

    protected string $nameLower = 'proxmox';

    protected array $providers = [
        EventServiceProvider::class,
        RouteServiceProvider::class,
    ];

    public function register(): void
    {
        parent::register();

        $this->app->singleton(ProxmoxService::class);
    }
}
