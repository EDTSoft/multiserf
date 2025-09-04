import { wp } from "../../helpers";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Icon, MD3Colors, Divider, Text } from "react-native-paper";
import styles from "./styles";
import { FontAwesome, Fontisto, MaterialIcons } from "@expo/vector-icons";
import { Credential } from "@/src/models/Credential";
import { getCredentialValidity } from "@/src/helpers/validator";
import { getCredentialValidityTranslation } from "@/src/helpers/translation";
import { formatDateCuba } from "@/src/helpers/date";

interface CredentialInfoProps {
  credential: Credential | null;
  showIcon?: boolean;
}

const CredentialInfo: React.FC<CredentialInfoProps> = ({
  credential,
  showIcon = false,
}) => {
  const validity = getCredentialValidity(credential);
  const validityText = getCredentialValidityTranslation(validity);
  const dateText = formatDateCuba(credential?.valid_until);

  return (
    <View style={styles.info_container}>
      {showIcon && (
        <View style={styles.info_header}>
          <FontAwesome name="id-card-o" size={100} color="black" />
        </View>
      )}

      <View style={styles.info_text}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome name="check" size={22} color="black" />
          <Text style={styles.info_header_text_bold}>{"Estado: "}</Text>
        </View>
        <Text style={styles.info_header_text}>{validityText}</Text>
        <Divider style={{ marginTop: "8%" }} />
      </View>

      <View style={styles.info_text}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Fontisto name="date" size={24} color="black" />
          <Text style={styles.info_header_text_bold}>
            {"Fecha de expiración: "}
          </Text>
        </View>
        <Text style={styles.info_header_text}>{dateText}</Text>
        <Divider style={{ marginTop: "8%" }} />
      </View>
    </View>
  );
};

export default CredentialInfo;
