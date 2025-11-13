const BASE = '/api'; //http://localhost:8080

async function request(path, opts = {}) {
    const res = await fetch(BASE + path, opts);

    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(`${res.status} ${res.statusText} ${text}`);
    }

    const ct = res.headers.get('content-type') || '';
    return ct.includes('application/json') ? res.json() : res.text();
}

export async function getJSON(path) {
    return request(path);
}

export async function postJSON(path, body) {
    return request(path, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
        }
    );
}
