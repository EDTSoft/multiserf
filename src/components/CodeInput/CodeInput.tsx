import React, { FC, ReactElement, useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  LogBox,
  ViewStyle,
  TouchableHighlight,
  Keyboard,
} from "react-native";
import {
  TextInput,
  TextInputIconProps,
  Text,
  Button,
  Divider,
  Icon,
  MD3Colors,
  IconButton,
  MD2Colors,
  ActivityIndicator,
  Modal,
  Portal,
} from "react-native-paper";
import {
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { getCredentialWithPersonByCode } from "@/src/api/credentialApi";
import { hp, wp } from "@/src/helpers";
import { useSnackbar } from "@/src/components/SnackbarProvider";

type Errors = {
  code?: string;
};

// Ignore log notification by message:
LogBox.ignoreLogs([
  "Warning: TextInput.Icon: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.",
]);

interface InputCodeProps {
  verifyingOperation?: (operation: boolean) => void;
  navigateTrigger?: (url: string, data: any) => void;
}

export const CodeInput: FC<InputCodeProps> = ({
  verifyingOperation,
  navigateTrigger,
}): ReactElement => {
  const [code, setCode] = useState<string>("");
  const [errors, setErrors] = useState<any>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [processing, setProcessing] = React.useState(false);
  const { showSnackbar } = useSnackbar();
  const [touched, setTouched] = useState<boolean>(false);

  React.useEffect(() => {
    verifyingOperation?.(processing);
    validateForm();
  }, [code, processing]);

  const validateForm = (): void => {
    const newErrors: Errors = {};

    if (!code || code.trim().length === 0) {
      newErrors.code = "* El código es requerido";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleSubmit = async () => {
    setTouched(true);
    validateForm();

    if (isFormValid) {
      setProcessing(true);
      if (code !== null && code.length > 0) {
        getCredentialWithPersonByCode(code)
          .then(({ data: credentials }) => {
            if (!credentials || credentials.length === 0) {
              showSnackbar(
                "No se encontraron credenciales registradas en el sistema con ese código."
              );
              setTimeout(() => setProcessing(false), 3000);
            } else {
              navigateTrigger?.("/(tabs)/verify/person-screen", {
                credential: credentials[0],
              });
              setTimeout(() => setProcessing(false), 3000);
            }
          })
          .catch((error) => {
            console.error("Failed to fetch credentials:", error);

            showSnackbar("Ocurrió un error al buscar la credencial.");
            setTimeout(() => setProcessing(false), 3000);
          });
      } else {
        showSnackbar("El formato del código no es válido.");
        setTimeout(() => setProcessing(false), 3000);
      }
    } else {
      showSnackbar("El código es requerido.");
      setTimeout(() => setProcessing(false), 3000);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        label="Código"
        value={code}
        mode="outlined"
        placeholder="Escriba el código"
        left={<TextInput.Icon icon="qrcode" size={24} />}
        onChangeText={setCode}
        autoCapitalize={"none"}
        disabled={processing}
        onBlur={() => setTouched(true)}
      />
      <Text style={styles.info}>{touched && errors ? errors.code : ""}</Text>

      <Button
        style={{ marginTop: "4%", borderRadius: 25, padding: "1%" }}
        mode="contained"
        buttonColor={"#041FAC"}
        theme={{ roundness: 1 }}
        disabled={!isFormValid || processing}
        onPress={() => handleSubmit()}
      >
        {processing ? (
          <ActivityIndicator
            animating={true}
            color={MD2Colors.white}
            size={18}
          />
        ) : (
          "Verificar"
        )}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "auto",
    marginLeft: "5%",
    marginRight: "5%",
  },
  input: {
    fontFamily: "Montserrat-Regular",
    backgroundColor: "#fff",
  },
  info: {
    fontFamily: "Montserrat-Bold",
    color: MD3Colors.error50,
    fontSize: 14,
    textAlign: "left",
    marginTop: "1%",
    marginBottom: "3%",
  },
});
