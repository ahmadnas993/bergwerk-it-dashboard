<?php

declare(strict_types=1);

use Modules\Proxmox\Data\VmData;

it('parses an empty tags string to an empty array', function () {
    $vm = VmData::fromProxmox(['vmid' => 100]);

    expect($vm->id)->toBe(100)
        ->and($vm->name)->toBe('')
        ->and($vm->status)->toBe('unknown')
        ->and($vm->node)->toBe('')
        ->and($vm->type)->toBe('qemu')
        ->and($vm->tags)->toBe([]);
});

it('parses a single tag', function () {
    $vm = VmData::fromProxmox(['vmid' => 101, 'tags' => 'bergwerk-test']);

    expect($vm->tags)->toBe(['bergwerk-test']);
});

it('parses multiple semicolon-separated tags', function () {
    $vm = VmData::fromProxmox([
        'vmid' => 102,
        'tags' => 'tenant-001;bergwerk-test',
    ]);

    expect($vm->tags)->toBe(['tenant-001', 'bergwerk-test']);
});

it('drops empty entries from the tag string', function () {
    $vm = VmData::fromProxmox(['vmid' => 103, 'tags' => 'a;;b']);

    expect($vm->tags)->toBe(['a', 'b']);
});

it('captures all provided fields', function () {
    $vm = VmData::fromProxmox([
        'vmid' => 200,
        'name' => 'ucs-acme',
        'status' => 'running',
        'node' => 'bwsnpmd02',
        'type' => 'qemu',
        'tags' => 'tenant-acme;bergwerk-test',
    ]);

    expect($vm->id)->toBe(200)
        ->and($vm->name)->toBe('ucs-acme')
        ->and($vm->status)->toBe('running')
        ->and($vm->node)->toBe('bwsnpmd02')
        ->and($vm->type)->toBe('qemu')
        ->and($vm->tags)->toBe(['tenant-acme', 'bergwerk-test']);
});

it('coerces vmid string to int', function () {
    $vm = VmData::fromProxmox(['vmid' => '300', 'name' => 'opensense-acme']);

    expect($vm->id)->toBe(300)
        ->and($vm->name)->toBe('opensense-acme');
});
