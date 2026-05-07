import { useTranslation } from 'react-i18next';

import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

import { useVms } from './useVms';

const TEST_TAG = 'bergwerk-test';

export default function VmListPage() {
    const { t } = useTranslation();
    const { data, isPending, isError } = useVms();

    return (
        <section className="space-y-6">
            <header>
                <h1 className="text-2xl font-semibold tracking-tight">
                    {t('vms.pageTitle')}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                    {t('vms.pageSubtitle')}
                </p>
            </header>

            <div className="rounded-lg border bg-card">
                {isPending ? (
                    <p className="p-6 text-sm text-muted-foreground">
                        {t('vms.loading')}
                    </p>
                ) : isError ? (
                    <p className="p-6 text-sm text-red-600">{t('vms.error')}</p>
                ) : data && data.length === 0 ? (
                    <p className="p-6 text-sm text-muted-foreground">
                        {t('vms.empty')}
                    </p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-24">
                                    {t('vms.columns.id')}
                                </TableHead>
                                <TableHead>{t('vms.columns.name')}</TableHead>
                                <TableHead className="w-28">
                                    {t('vms.columns.status')}
                                </TableHead>
                                <TableHead className="w-40">
                                    {t('vms.columns.node')}
                                </TableHead>
                                <TableHead>{t('vms.columns.tags')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.map((vm) => {
                                const isTest = vm.tags.includes(TEST_TAG);
                                return (
                                    <TableRow
                                        key={vm.id}
                                        className={cn(
                                            isTest && 'bg-amber-50/60',
                                        )}
                                    >
                                        <TableCell className="font-mono">
                                            {vm.id}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {vm.name}
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    vm.status === 'running'
                                                        ? 'running'
                                                        : 'stopped'
                                                }
                                            >
                                                {vm.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-mono text-xs">
                                            {vm.node}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {vm.tags.map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant={
                                                            tag === TEST_TAG
                                                                ? 'test'
                                                                : 'outline'
                                                        }
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}
            </div>
        </section>
    );
}
