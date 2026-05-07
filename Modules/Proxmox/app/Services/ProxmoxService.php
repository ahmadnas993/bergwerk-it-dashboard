<?php

declare(strict_types=1);

namespace Modules\Proxmox\Services;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use Modules\Proxmox\Data\VmData;
use RuntimeException;

class ProxmoxService
{
    private function client(): PendingRequest
    {
        return Http::baseUrl(config('proxmox.base_url'))
            ->withHeaders([
                'Authorization' => sprintf(
                    'PVEAPIToken=%s=%s',
                    config('proxmox.token_id'),
                    config('proxmox.token_secret'),
                ),
            ])
            ->withOptions(['verify' => config('proxmox.verify_ssl')])
            ->acceptJson();
    }

    /**
     * @return list<VmData>
     */
    public function listVMs(): array
    {
        $rows = $this->safeGet('/cluster/resources', ['type' => 'vm']);

        return array_values(array_map(
            static fn (array $row): VmData => VmData::fromProxmox($row),
            array_filter(
                $rows,
                static fn (array $row): bool => isset($row['vmid']) && empty($row['template']),
            ),
        ));
    }

    /**
     * @param  array<string, scalar>  $query
     * @return array<int, array<string, mixed>>
     */
    private function safeGet(string $path, array $query = []): array
    {
        try {
            return $this->client()->get($path, $query)->throw()->json('data') ?? [];
        } catch (RequestException $e) {
            throw new RuntimeException(
                sprintf('Proxmox API GET %s failed with status %d', $path, $e->response->status()),
                $e->getCode(),
            );
        } catch (ConnectionException $e) {
            throw new RuntimeException(
                sprintf('Proxmox API GET %s unreachable', $path),
                $e->getCode(),
            );
        }
    }
}
