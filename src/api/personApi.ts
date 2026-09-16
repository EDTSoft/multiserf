import { GetPersonsResponse, Person } from "../models/Person";
import { apiFetch } from "./client";

/**
 *
 * @param params - Query parameters to filter and/or populate persons (e.g., ?filters[credentials][code][$eq]=35HXK&populate=*)
 * @returns A promise that resolves to a GetPersonsResponse object containing an array of persons and metadata.
 */
export async function getPersons(
  params: string = ""
): Promise<GetPersonsResponse> {
  const response = await apiFetch(`/people${params}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Error fetching persons: ${response.statusText}`);
  }

  return response.json();
}

export async function getPersonById(id: number): Promise<Person> {
  const response = await apiFetch(`/people/${id}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Error fetching person with id ${id}`);
  }

  return response.json();
}
