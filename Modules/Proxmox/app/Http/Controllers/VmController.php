<?php

declare(strict_types=1);

namespace Modules\Proxmox\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Proxmox\Data\VmData;
use Modules\Proxmox\Services\ProxmoxService;

class VmController extends Controller
{
    public function __construct(private readonly ProxmoxService $proxmox) {}

    /**
     * @return list<VmData>
     */
    public function index(): array
    {
        return $this->proxmox->listVMs();
    }
}
