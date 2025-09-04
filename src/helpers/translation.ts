import { CredentialValidity } from "../models/Credential";

export function getCredentialValidityTranslation(
  validity: CredentialValidity
): string {
  const translations: Record<CredentialValidity, string> = {
    valid: "Válida",
    "no-valid": "No es válida",
    unused: "No está asociada",
    expired: "Expirada",
  };

  return translations[validity];
}
