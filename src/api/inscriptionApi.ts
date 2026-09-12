import { enviroment } from "../enviroment/enviroment";
import { GetInscriptionsResponse, Inscription } from "../models/Inscription";

const { API_URL, TOKEN } = enviroment;

export async function getInscriptions(
  params: string = ""
): Promise<GetInscriptionsResponse> {
  const response = await fetch(`${API_URL}/inscriptions${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching inscriptions: ${response.statusText}`);
  }

  return response.json();
}

export async function getInscriptionById(id: number): Promise<Inscription> {
  const response = await fetch(`${API_URL}/inscriptions/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching inscription with id ${id}`);
  }

  return response.json();
}
