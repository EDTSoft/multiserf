import { GetPersonsResponse, Person } from "../models/Person";
import { enviroment } from "../enviroment/enviroment";

const { API_URL, TOKEN } = enviroment;

/**
 *
 * @param params - Query parameters to filter and/or populate persons (e.g., ?filters[credentials][code][$eq]=35HXK&populate=*)
 * @returns A promise that resolves to a GetPersonsResponse object containing an array of persons and metadata.
 */
export async function getPersons(
  params: string = ""
): Promise<GetPersonsResponse> {
  const response = await fetch(`${API_URL}/people${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching persons: ${response.statusText}`);
  }

  return response.json();
}

export async function getPersonById(id: number): Promise<Person> {
  const response = await fetch(`${API_URL}/people/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching person with id ${id}`);
  }

  return response.json();
}
