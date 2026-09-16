import { getCredentials } from "@/src/api/credentialApi";
import { getInscriptions } from "@/src/api/inscriptionApi";
import { getPersons } from "@/src/api/personApi";
import { wp } from "@/src/helpers";
import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const [persons, setPersons] = React.useState<string | number>(0);
  const [inscriptions, setInscriptions] = React.useState<string | number>(0);
  const [credentialsUsed, setCredentialsUsed] = React.useState<string | number>(
    0
  );
  const [credentialsAvailable, setCredentialsAvailable] = React.useState<
    string | number
  >(0);

  const [fetchingPersons, setFetchingPersons] = React.useState(true);
  const [fetchingInscriptions, setFetchingInscriptions] = React.useState(true);
  const [fetchingCredentialsUsed, setFetchingCredentialsUsed] =
    React.useState(true);
  const [fetchingCredentialsAvailable, setFetchingCredentialsAvailable] =
    React.useState(true);
  const [networkError, setNetworkError] = React.useState<string | null>(null);

  React.useEffect(() => {
    fetchPersons();
    fetchCredentialsAvailable();
    fetchCredentialsUsed();
    fetchInscriptions();
  }, []);

  const fetchPersons = async () => {
    setFetchingPersons(true);
    const response = await getPersons()
      .then((resp) => {
        setNetworkError(null);
        return resp.meta.pagination.total;
      })
      .catch(() => {
        setNetworkError("Falló la conexión");
        return 0;
      });
    setPersons(response);
    setFetchingPersons(false);
  };

  const fetchCredentialStats = async () => {
    setFetchingCredentialsAvailable(true);
    setFetchingCredentialsUsed(true);
    try {
      const [all, assigned] = await Promise.all([
        getCredentials("?pagination[pageSize]=1"),
        getPersons(
          "?filters[credentials][id][$notNull]=true&pagination[pageSize]=1"
        ),
      ]);
      const used = assigned.meta.pagination.total;
      const total = all.meta.pagination.total;
      setCredentialsUsed(used);
      setCredentialsAvailable(Math.max(total - used, 0));
      setNetworkError(null);
    } catch {
      setNetworkError("Falló la conexión");
      setCredentialsUsed(0);
      setCredentialsAvailable(0);
    } finally {
      setFetchingCredentialsAvailable(false);
      setFetchingCredentialsUsed(false);
    }
  };

  const fetchCredentialsAvailable = async () => {
    await fetchCredentialStats();
  };

  const fetchCredentialsUsed = async () => {
    await fetchCredentialStats();
  };

  const fetchInscriptions = async () => {
    setFetchingInscriptions(true);
    const response = await getInscriptions()
      .then((resp) => {
        setNetworkError(null);
        return resp.meta.pagination.total;
      })
      .catch(() => {
        setNetworkError("Falló la conexión");
        return 0;
      });
    setInscriptions(response);
    setFetchingInscriptions(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/multiserflogo.jpg")}
          style={styles.headerImage}
          resizeMode="contain"
        />
      </View>

      {networkError ? (
        <Text style={styles.networkError}>{networkError}</Text>
      ) : null}

      <View style={styles.statsContainer}>
        <Pressable
          style={styles.statCard}
          onPress={() => (!fetchingPersons ? fetchPersons() : null)}
        >
          <View>
            <Text style={styles.statLabel}>Personas</Text>
            <Text style={styles.statValue}>
              {fetchingPersons ? "..." : persons}
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.statCard}
          onPress={() => (!fetchingInscriptions ? fetchInscriptions() : null)}
        >
          <View>
            <Text style={styles.statLabel}>Inscripciones</Text>
            <Text style={styles.statValue}>
              {fetchingInscriptions ? "..." : inscriptions}
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.statCard}
          onPress={() =>
            !fetchingCredentialsUsed ? fetchCredentialsUsed() : null
          }
        >
          <View>
            <Text style={styles.statLabel}>Credenciales asignadas</Text>
            <Text style={styles.statValue}>
              {fetchingCredentialsUsed ? "..." : credentialsUsed}
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={styles.statCard}
          onPress={() =>
            !fetchingCredentialsAvailable ? fetchCredentialsAvailable() : null
          }
        >
          <View>
            <Text style={styles.statLabel}>Credenciales disponibles</Text>
            <Text style={styles.statValue}>
              {fetchingCredentialsAvailable ? "..." : credentialsAvailable}
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    paddingVertical: 10,
  },
  headerImage: {
    width: wp(90),
    height: wp(90),
  },
  networkError: {
    color: "#b3261e",
    backgroundColor: "#fceeee",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 13,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    width: "48%",
    alignItems: "flex-start",
    elevation: 2,
    boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a73e8",
  },
});

export default HomeScreen;
