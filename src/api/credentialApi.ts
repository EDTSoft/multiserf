import { GetCredentialsResponse, Credential } from "../models/Credential";
import { enviroment } from "../enviroment/enviroment";

const { API_URL, TOKEN } = enviroment;

/**
 *
 * @param params - Query parameters to filter and/or populate credentials (e.g., ?filters[credentials][code][$eq]=35HXK&populate=*)
 * @returns A promise that resolves to a GetCredentialsResponse object containing an array of credentials and metadata.
 */
export async function getCredentials(
  params: string = ""
): Promise<GetCredentialsResponse> {
  const response = await fetch(`${API_URL}/credentials${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching credentials: ${response.statusText}`);
  }

  return response.json();
}

export async function getCredentialById(id: number): Promise<Credential> {
  const response = await fetch(`${API_URL}/credentials/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching credential with id ${id}`);
  }

  return response.json();
}
