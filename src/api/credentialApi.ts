import { GetCredentialsResponse, Credential } from "../models/Credential";
import { apiFetch } from "./client";
import { getPersons } from "./personApi";

async function readErrorMessage(response: Response, fallback: string) {
  try {
    const body = await response.json();
    return body?.error?.message || response.statusText || fallback;
  } catch {
    return response.statusText || fallback;
  }
}

/**
 *
 * @param params - Query parameters to filter and/or populate credentials (e.g., ?filters[credentials][code][$eq]=35HXK&populate=*)
 * @returns A promise that resolves to a GetCredentialsResponse object containing an array of credentials and metadata.
 */
export async function getCredentials(
  params: string = ""
): Promise<GetCredentialsResponse> {
  const response = await apiFetch(`/credentials${params}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(
      `Error fetching credentials: ${await readErrorMessage(response, "unknown")}`
    );
  }

  return response.json();
}

export async function getCredentialWithPersonByCode(
  code: string
): Promise<GetCredentialsResponse> {
  const encoded = encodeURIComponent(code.trim());
  const credentialsRes = await getCredentials(
    `?filters[code][$eq]=${encoded}`
  );
  const credential = credentialsRes.data[0];

  if (!credential) {
    return credentialsRes;
  }

  const peopleRes = await getPersons(
    `?filters[credentials][code][$eq]=${encoded}&populate=*`
  );

  return {
    data: [
      {
        ...credential,
        persona: peopleRes.data[0] ?? null,
      },
    ],
    meta: credentialsRes.meta,
  };
}

export async function getCredentialById(id: number): Promise<Credential> {
  const response = await apiFetch(`/credentials/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Error fetching credential with id ${id}`);
  }

  return response.json();
}
