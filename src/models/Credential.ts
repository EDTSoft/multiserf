import { Meta } from "./Pagination";
import { Person } from "./Person";

export interface Credential {
  id: number;
  documentId: string;
  valid_until?: string | null;
  active?: boolean;
  createdAt: string | null;
  updatedAt: string | null;
  publishedAt: string | null;
  code: string;
  persona?: Person | null;
}

export interface GetCredentialsResponse {
  data: Credential[];
  meta: Meta;
}

export type CredentialValidity = "valid" | "no-valid" | "unused" | "expired";
