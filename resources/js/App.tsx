import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import VmListPage from './proxmox/VmListPage';
import { cn } from './lib/utils';

export default function App() {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="border-b">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <h1 className="text-lg font-semibold">{t('app.title')}</h1>
                    <nav className="flex gap-4 text-sm">
                        <NavLink
                            to="/vms"
                            className={({ isActive }) =>
                                cn(
                                    'transition-colors',
                                    isActive
                                        ? 'font-medium text-foreground'
                                        : 'text-muted-foreground hover:text-foreground',
                                )
                            }
                        >
                            {t('vms.pageTitle')}
                        </NavLink>
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-6 py-8">
                <Routes>
                    <Route path="/" element={<Navigate to="/vms" replace />} />
                    <Route path="/vms" element={<VmListPage />} />
                </Routes>
            </main>
        </div>
    );
}
