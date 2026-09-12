import { StyleSheet, TouchableOpacity, Button, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text, View } from "@/src/components/Themed";
import QRScanner, { CameraState } from "@/src/components/QrScanner";
import { wp } from "@/src/helpers";
import Colors from "@/src/constants/Colors";
import { useColorScheme } from "@/src/components/useColorScheme";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { navigate } from "expo-router/build/global-state/routing";
import { useRouter } from "expo-router";
import { CodeInput } from "@/src/components/CodeInput/CodeInput";

const VERIFY_TEXT = ["Escribir el código.", "Escanear el código"];

export default function VerifyScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [cameraState, setCameraState] = React.useState<CameraState>("idle");
  const [scanQrCode, setScanQrCode] = React.useState<boolean>(true);
  const [processing, setProcessing] = React.useState<boolean>(false);
  const [changeVerifyText, setChangeVerifyText] = React.useState<string>(
    VERIFY_TEXT[0]
  );

  React.useEffect(() => {
    scanQrCode
      ? setChangeVerifyText(VERIFY_TEXT[0])
      : setChangeVerifyText(VERIFY_TEXT[1]);
  }, [scanQrCode]);

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
      {scanQrCode && (
        <>
          <View style={styles.qrContainer}>
            <QRScanner
              scanningOperation={setProcessing}
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
        </>
      )}

      {!scanQrCode && (
        <CodeInput
          verifyingOperation={setProcessing}
          navigateTrigger={navigateTrigger}
        />
      )}

      <View style={styles.change_action_container}>
        <Pressable
          style={[styles.outlinedButton, processing && { opacity: 0 }]}
          onPress={() => !processing && setScanQrCode(!scanQrCode)}
          disabled={processing}
        >
          <Text style={styles.outlinedButtonText}>{changeVerifyText}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  qrContainer: {
    width: wp(90),
    height: wp(90),
    overflow: "hidden",
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
  action_text: {
    fontWeight: "500",
  },
  change_action_container: {
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    marginBottom: "5%",
  },
  outlinedButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#041FAC",
    borderRadius: 25,
    backgroundColor: "transparent",
    minWidth: 180,
  },
  outlinedButtonPressed: {
    backgroundColor: "rgba(4, 31, 172, 0.1)",
  },
  outlinedButtonText: {
    color: "#041FAC",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});
