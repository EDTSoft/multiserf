import { wp } from "../../helpers";
import React from "react";
import { View } from "react-native";
import { Icon, MD3Colors, Divider, Text } from "react-native-paper";
import styles from "./styles";
import {
  FontAwesome6,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { Inscription } from "@/src/models/Inscription";
import { formatDateCuba } from "@/src/helpers/date";
import { formatCurrency } from "@/src/helpers/money";

interface InscriptionInfoProps {
  inscription: Inscription | null;
  showIcon?: boolean;
}

const InscriptionInfo: React.FC<InscriptionInfoProps> = ({
  inscription,
  showIcon = false,
}) => {
  const inscriptionDate = formatDateCuba(inscription?.inscription_date);

  return (
    <View style={styles.info_container}>
      {showIcon && (
        <View style={styles.info_header}>
          <FontAwesome6 name="users-rectangle" size={100} color="black" />
        </View>
      )}

      <View style={styles.info_text}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="ballot-outline"
            size={22}
            color={MD3Colors.neutralVariant40}
          />
          <Text style={styles.info_header_text_bold}>{"Categoría: "}</Text>
        </View>
        <Text style={styles.info_header_text}>{inscription?.category}</Text>
        <Divider style={{ marginTop: "8%" }} />
      </View>

      <View style={styles.info_text}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <SimpleLineIcons
            name="speech"
            size={22}
            color={MD3Colors.neutralVariant40}
          />
          <Text style={styles.info_header_text_bold}>
            {"Interes de participación: "}
          </Text>
        </View>
        <Text style={styles.info_header_text}>
          {inscription?.participation_interest}
        </Text>
        <Divider style={{ marginTop: "8%" }} />
      </View>

      <View style={styles.info_text}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Fontisto name="date" size={22} color={MD3Colors.neutralVariant40} />
          <Text style={styles.info_header_text_bold}>
            {"Fecha de inscripción: "}
          </Text>
        </View>
        <Text style={styles.info_header_text}>{inscriptionDate}</Text>
        <Divider style={{ marginTop: "8%" }} />
      </View>

      {inscription?.inscription_paid && (
        <View style={styles.info_text}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons
              name="payments"
              size={22}
              color={MD3Colors.neutralVariant40}
            />
            <Text style={styles.info_header_text_bold}>
              {"Inscripción pagada: "}
            </Text>
          </View>
          <Text style={styles.info_header_text}>
            {inscription?.inscription_paid ? "Sí" : "No"}
          </Text>
          <Divider style={{ marginTop: "8%" }} />
        </View>
      )}

      {inscription?.inscription_fee !== undefined && (
        <View style={styles.info_text}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons
              name="paid"
              size={22}
              color={MD3Colors.neutralVariant40}
            />
            <Text style={styles.info_header_text_bold}>
              {"Tarifa de inscripción: "}
            </Text>
          </View>
          <Text style={styles.info_header_text}>
            {formatCurrency(inscription?.inscription_fee)}
          </Text>
          <Divider style={{ marginTop: "8%" }} />
        </View>
      )}
    </View>
  );
};

export default InscriptionInfo;
