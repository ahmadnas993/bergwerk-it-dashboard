function getCookie(name: string): string | undefined {
    const match = document.cookie.match(
        new RegExp('(^|;\\s*)' + name + '=([^;]*)'),
    );
    return match ? decodeURIComponent(match[2]) : undefined;
}

async function primeCsrf(): Promise<void> {
    await fetch('/sanctum/csrf-cookie', {
        credentials: 'same-origin',
    });
}

export class ApiError extends Error {
    constructor(
        message: string,
        public readonly status: number,
        public readonly body: unknown,
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
    const method = (init.method ?? 'GET').toUpperCase();
    const isMutation = method !== 'GET' && method !== 'HEAD';

    if (isMutation) {
        await primeCsrf();
    }

    const headers = new Headers(init.headers);
    headers.set('Accept', 'application/json');
    headers.set('X-Requested-With', 'XMLHttpRequest');

    if (isMutation && !headers.has('Content-Type') && init.body) {
        headers.set('Content-Type', 'application/json');
    }

    const xsrf = getCookie('XSRF-TOKEN');
    if (xsrf && isMutation) {
        headers.set('X-XSRF-TOKEN', xsrf);
    }

    const response = await fetch(path, {
        ...init,
        method,
        headers,
        credentials: 'same-origin',
    });

    const text = await response.text();
    let data: unknown = null;
    if (text) {
        try {
            data = JSON.parse(text);
        } catch {
            data = text;
        }
    }

    if (!response.ok) {
        throw new ApiError(
            `${method} ${path} failed with ${response.status}`,
            response.status,
            data,
        );
    }

    return data as T;
}
