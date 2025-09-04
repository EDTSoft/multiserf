import { SafeAreaView, StyleSheet, useColorScheme } from "react-native";

import EditScreenInfo from "@/src/components/EditScreenInfo";
import { Text, View } from "@/src/components/Themed";
import QRScanner, { CameraState } from "@/src/components/QrScanner";
import { wp } from "@/src/helpers";
import Colors from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { navigate } from "expo-router/build/global-state/routing";
import { useRouter } from "expo-router";

export default function VerifyScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [cameraState, setCameraState] = React.useState<CameraState>("idle");

  const navigateTrigger = (url: any, data: any) => {
    router.navigate({
      pathname: url,
      params: { credential: JSON.stringify(data.credential) },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.qrContainer}>
        <QRScanner
          onCameraStateChange={setCameraState}
          navigateTrigger={navigateTrigger}
        />
      </View>
      {cameraState === "init" && (
        <View style={styles.info_container}>
          <ActivityIndicator
            size={16}
            color={Colors[colorScheme ?? "light"].text}
          />
          <Text style={styles.info}>Inicializando cámara...</Text>
        </View>
      )}

      {cameraState === "fail" && (
        <View style={styles.info_container}>
          <Text style={{ color: "red" }}>Error al iniciar la cámara</Text>
        </View>
      )}
      {cameraState === "ready" && (
        <View style={styles.info_container}>
          <FontAwesome
            name="info-circle"
            size={16}
            color={Colors[colorScheme ?? "light"].text}
          />
          <Text
            style={styles.info}
            lightColor="rgba(0,0,0,0.8)"
            darkColor="rgba(255,255,255,0.8)"
          >
            {
              "Escane el código QR de la credencial para verificar su usuario y validez"
            }
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  qrContainer: {
    height: wp(90),
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  info_container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    textAlign: "center",
    padding: 10,
    marginTop: 10,
    width: "80%",
  },
  info: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 5,
  },
  loader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
