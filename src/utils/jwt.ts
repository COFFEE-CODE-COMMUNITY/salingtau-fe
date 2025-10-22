export function decodeJwt<T = unknown>(token: string): T | null {
  try {
    const base64Payload = token.split('.')[1];
    return JSON.parse(atob(base64Payload)) as T;
  } catch (err) {
    return null;
  }
}