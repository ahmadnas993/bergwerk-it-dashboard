import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api';

type VmData = Modules.Proxmox.Data.VmData;

export function useVms() {
    return useQuery({
        queryKey: ['vms'],
        queryFn: () => api<VmData[]>('/api/vms'),
        refetchInterval: 30_000,
    });
}
