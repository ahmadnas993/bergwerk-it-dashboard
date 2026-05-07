import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';

import App from './App';
import i18n from './lib/i18n';
import { queryClient } from './lib/queryClient';
import '../css/app.css';

const container = document.getElementById('app');
if (!container) {
    throw new Error('Mount point #app not found in DOM');
}

createRoot(container).render(
    <StrictMode>
        <I18nextProvider i18n={i18n}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </QueryClientProvider>
        </I18nextProvider>
    </StrictMode>,
);
