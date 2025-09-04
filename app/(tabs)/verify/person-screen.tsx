import CredentialInfo from "@/src/components/Credential";
import InscriptionInfo from "@/src/components/Inscription";
import PersonInfo from "@/src/components/Person";
import { getCredentialValidity } from "@/src/helpers/validator";
import { Credential } from "@/src/models/Credential";
import { Person } from "@/src/models/Person";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function PersonScreen() {
  const params = useLocalSearchParams<{ credential?: string }>();

  if (!params || Object.keys(params).length === 0) {
    return (
      <View style={styles.center}>
        <Text>No se encontró información de la credencial.</Text>
      </View>
    );
  }

  let credential: Credential | null = null;
  let person: Person | null | undefined = null;

  if (params.credential) {
    try {
      credential = JSON.parse(params.credential);
    } catch (e) {
      console.error("Error parsing credential:", e);
    }
  }

  person = credential?.persona;
  const inscription = credential?.persona?.inscription;

  const validity = getCredentialValidity(credential);

  return (
    <ScrollView>
      <View style={styles.info_container}>
        {credential && (
          <CredentialInfo credential={credential} showIcon={true} />
        )}
        {person && <PersonInfo person={person} />}
        {inscription && <InscriptionInfo inscription={inscription} />}
        {validity === "unused" && (
          <View style={styles.center}>
            <Text variant="titleMedium">
              *La credencial está disponible para ser asignada a una persona
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  info_container: {
    display: "flex",
    marginTop: "10%",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
