<?php

declare(strict_types=1);

namespace Modules\Proxmox\Data;

use Spatie\LaravelData\Data;

class VmData extends Data
{
    /**
     * @param  list<string>  $tags
     */
    public function __construct(
        public int $id,
        public string $name,
        public string $status,
        public string $node,
        public string $type,
        public array $tags,
    ) {}

    /**
     * @param  array<string, mixed>  $payload
     */
    public static function fromProxmox(array $payload): self
    {
        $rawTags = $payload['tags'] ?? '';
        $tags = $rawTags === '' ? [] : array_values(array_filter(explode(';', (string) $rawTags)));

        return new self(
            id: (int) $payload['vmid'],
            name: (string) ($payload['name'] ?? ''),
            status: (string) ($payload['status'] ?? 'unknown'),
            node: (string) ($payload['node'] ?? ''),
            type: (string) ($payload['type'] ?? 'qemu'),
            tags: $tags,
        );
    }
}
