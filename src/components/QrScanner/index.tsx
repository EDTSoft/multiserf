import * as React from "react";
import { View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text, Icon, Button } from "react-native-paper";

import styles from "./styles";

import {
  BarcodeScanningResult,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { wp } from "../../helpers";
import { useIsFocused } from "@react-navigation/native";
import { isValidQrCodeObject } from "@/src/helpers/validator";
import { getCredentials } from "@/src/api/credentialApi";
import Toast from "react-native-root-toast";

export type CameraState =
  | "idle"
  | "permission-required"
  | "no-allowed"
  | "init"
  | "ready"
  | "fail";

interface QrScannerProps {
  scanningOperation?: (operation: boolean) => void;
  onCameraStateChange?: (state: CameraState) => void;
  navigateTrigger?: (url: string, data: any) => void;
}

const QrScanner: React.FC<QrScannerProps> = ({
  scanningOperation,
  onCameraStateChange,
  navigateTrigger,
}) => {
  const isFocused = useIsFocused();
  const [isCameraReady, setIsCameraReady] = React.useState(false);
  const [cameraFail, setCameraFail] = React.useState(false);
  const [facing, setFacing] = React.useState<CameraType>("back");
  const [visibleToast, setVisibleToast] = React.useState(false);
  const [textToast, setTextToast] = React.useState("");
  const [scanned, setScanned] = React.useState(false);

  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = React.useRef<CameraView | null>(null);

  React.useEffect(() => {
    scanningOperation?.(scanned);

    if (cameraFail) {
      onCameraStateChange?.("fail");
      return;
    }

    if (!permission) return;

    if (!permission.granted) {
      onCameraStateChange?.(
        permission.canAskAgain ? "permission-required" : "no-allowed"
      );
      return;
    }

    if (isFocused && !isCameraReady) {
      onCameraStateChange?.("init");
      return;
    }

    if (isCameraReady) {
      onCameraStateChange?.("ready");
    }
  }, [isFocused, isCameraReady, cameraFail, permission, scanned]);

  const handleScan = (result: BarcodeScanningResult) => {
    if (!scanned) {
      const { data, type } = result;
      setScanned(true);
      if (isValidQrCodeObject(data)) {
        const obj = JSON.parse(data);
        const params = `?filters[code][$eq]=${obj.code}&populate[persona][populate][0]=inscription`;
        getCredentials(params)
          .then(({ data: credentials }) => {
            if (!credentials || credentials.length === 0) {
              handleToastComponent(
                "No se encontraron credenciales registradas en el sistema con ese código."
              );
              setTimeout(() => setScanned(false), 3000);
            } else {
              navigateTrigger?.("/(tabs)/verify/person-screen", {
                credential: credentials[0],
              });
              setTimeout(() => setScanned(false), 3000);
            }
          })
          .catch((error) => {
            console.error("Failed to fetch credentials:", error);

            handleToastComponent("Ocurrió un error al buscar la credencial.");
            setTimeout(() => setScanned(false), 3000);
          });
      } else {
        handleToastComponent("El código QR escaneado no es válido.");
        setTimeout(() => setScanned(false), 3000);
      }
    }
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          {" Se requiere autorizacion para acceder a la cámara"}
        </Text>
        <Button
          mode="elevated"
          buttonColor="#041FAC"
          textColor="#FFFFFF"
          onPress={requestPermission}
        >
          {"Conceder permiso"}
        </Button>
      </View>
    );
  }

  /**
   *
   * @param textInfo Text to be shown in toast component. this notification starts and ends itself
   */
  const handleToastComponent = (textInfo: string) => {
    setTextToast(textInfo);
    setVisibleToast(true);
    setTimeout(function () {
      setVisibleToast(false);
    }, 3000);
  };

  return (
    <React.Fragment>
      <View style={styles.container}>
        {isFocused && (
          <CameraView
            style={styles.camera}
            facing={facing}
            ref={cameraRef}
            onCameraReady={() => {
              setIsCameraReady(true);
            }}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            onBarcodeScanned={handleScan}
            onMountError={() => {
              setCameraFail(true);
            }}
          >
            <View style={styles.buttonContainer}>
              <View style={styles.empty_button}></View>
              <View style={styles.overlay}>
                <View style={styles.scanArea}>
                  <View style={styles.cornerTopLeft} />
                  <View style={styles.cornerTopRight} />
                  <View style={styles.cornerBottomLeft} />
                  <View style={styles.cornerBottomRight} />
                </View>
              </View>
              <TouchableOpacity
                style={styles.flip_camera}
                onPress={toggleCameraFacing}
              >
                <Icon
                  source={"camera-flip"}
                  size={wp(10)}
                  color="#2c25beff"
                ></Icon>
              </TouchableOpacity>
            </View>
          </CameraView>
        )}

        {scanned && (
          <View style={styles.loadingOverlay}>
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#041FAC" />
              <Text style={styles.loadingText}>Procesando código QR...</Text>
            </View>
          </View>
        )}

        <Toast
          visible={visibleToast}
          position={Toast.positions.BOTTOM}
          shadow={true}
          animation={true}
          hideOnPress={false}
          duration={3000}
          keyboardAvoiding={true}
        >
          {textToast}
        </Toast>
      </View>
    </React.Fragment>
  );
};

export default QrScanner;
