import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

void i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    resources: {
        en: {
            translation: {
                app: {
                    title: 'Bergwerk Console',
                },
                vms: {
                    pageTitle: 'Virtual Machines',
                    pageSubtitle:
                        'Live view of Proxmox VMs across all nodes. Test-tagged VMs are highlighted.',
                    loading: 'Loading VMs…',
                    error: 'Failed to load VMs.',
                    empty: 'No VMs found.',
                    columns: {
                        id: 'VM ID',
                        name: 'Name',
                        status: 'Status',
                        node: 'Node',
                        tags: 'Tags',
                    },
                },
            },
        },
    },
});

export default i18n;
