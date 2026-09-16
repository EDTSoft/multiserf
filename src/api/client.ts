import { enviroment } from "../enviroment/enviroment";

const { API_URL, TOKEN } = enviroment;

export async function apiFetch(
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  const url = `${API_URL}${path}`;

  try {
    return await fetch(url, {
      ...init,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
        ...(init.headers ?? {}),
      },
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`Sin conexión a ${url}. ${detail}`);
  }
}
