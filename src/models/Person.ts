import { Credential } from "./Credential";
import { Inscription } from "./Inscription";
import { Organization } from "./Organization";
import { Meta } from "./Pagination";

export interface Person {
  id: number;
  documentId: string;
  createdAt: string | null;
  updatedAt: string | null;
  publishedAt: string | null;
  name_lastname: string;
  email: string;
  phone?: string;
  country?: string;
  credentials?: Credential[];
  inscription?: Inscription | null;
  organization?: Organization | null;
}

export interface GetPersonsResponse {
  data: Person[];
  meta: Meta;
}
