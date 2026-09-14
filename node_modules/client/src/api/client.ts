/**
 * Client HTTP pour communiquer avec l'API Node/Express.
 *
 * TODO 1 : Ajout de `credentials: 'include'` dans `fetch`
 * C'est CE paramètre qui ordonne au navigateur d'inclure les cookies (HttpOnly)
 * lors de chaque requête vers l'API cross-origin (port 3001 vs 5173).
 */

const API_URL = 'http://localhost:3001';

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function api<T = unknown>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include', // <--- CRUCIAL : inclusion des cookies HttpOnly
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = (data && typeof data === 'object' && 'error' in data && typeof data.error === 'string')
      ? data.error
      : 'Erreur réseau';
    throw new ApiError(response.status, message);
  }

  return data as T;
}
