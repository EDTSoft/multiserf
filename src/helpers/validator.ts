import { Credential, CredentialValidity } from "../models/Credential";
import { QrCodeObject } from "../models/QrCode";

export function isValidQrCodeObject(input: unknown): input is QrCodeObject {
  let obj: unknown;

  if (typeof input === "string") {
    try {
      obj = JSON.parse(input);
    } catch {
      return false;
    }
  } else {
    obj = input;
  }

  return (
    typeof obj === "object" &&
    obj !== null &&
    !Array.isArray(obj) &&
    typeof (obj as { code?: unknown }).code === "string"
  );
}

export function getCredentialValidity(
  credential: Credential | null
): CredentialValidity {
  if (!credential?.active || !credential.valid_until) {
    return "no-valid";
  }

  const now = new Date();
  const validUntil = new Date(credential.valid_until);

  if (validUntil.getTime() <= now.getTime()) {
    return "expired";
  }

  return credential.persona ? "valid" : "unused";
}
