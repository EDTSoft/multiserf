import { GetInscriptionsResponse, Inscription } from "../models/Inscription";
import { apiFetch } from "./client";

export async function getInscriptions(
  params: string = ""
): Promise<GetInscriptionsResponse> {
  const response = await apiFetch(`/inscriptions${params}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Error fetching inscriptions: ${response.statusText}`);
  }

  return response.json();
}

export async function getInscriptionById(id: number): Promise<Inscription> {
  const response = await apiFetch(`/inscriptions/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Error fetching inscription with id ${id}`);
  }

  return response.json();
}
