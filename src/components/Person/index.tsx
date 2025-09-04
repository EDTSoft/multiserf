import { wp } from "../../helpers";
import React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Icon, MD3Colors, Divider, Text } from "react-native-paper";
import styles from "./styles";
import { Person } from "@/src/models/Person";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

interface PersonInfoProps {
  person: Person | null;
  showIcon?: boolean;
}

const PersonInfo: React.FC<PersonInfoProps> = ({
  person,
  showIcon = false,
}) => {
  return (
    <View style={styles.info_container}>
      {showIcon && (
        <View style={styles.info_header}>
          <FontAwesome name="user" size={100} color="black" />
        </View>
      )}

      <View style={styles.info_text}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon source="account" size={22} color={MD3Colors.neutralVariant40} />
          <Text style={styles.info_header_text_bold}>{"Nombre: "}</Text>
        </View>
        <Text style={styles.info_header_text}>{person?.name_lastname}</Text>
        <Divider style={{ marginTop: "8%" }} />
      </View>

      <View style={styles.info_text}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon source="email" size={22} color={MD3Colors.neutralVariant40} />
          <Text style={styles.info_header_text_bold}>{"Correo: "}</Text>
        </View>
        <Text style={styles.info_header_text}>{person?.email}</Text>
        <Divider style={{ marginTop: "8%" }} />
      </View>

      <View style={styles.info_text}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon source="phone" size={22} color={MD3Colors.neutralVariant40} />
          <Text style={styles.info_header_text_bold}>{"Teléfono: "}</Text>
        </View>
        <Text style={styles.info_header_text}>{person?.phone ?? "-"}</Text>
        <Divider style={{ marginTop: "8%" }} />
      </View>

      <View style={styles.info_text}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/*<Icon source="place" size={22} color={MD3Colors.neutralVariant40} />*/}
          <MaterialIcons
            name="place"
            size={24}
            color={MD3Colors.neutralVariant40}
          />
          <Text style={styles.info_header_text_bold}>{"País: "}</Text>
        </View>
        <Text style={styles.info_header_text}>{person?.country ?? "-"}</Text>
        <Divider style={{ marginTop: "8%" }} />
      </View>
    </View>
  );
};

export default PersonInfo;
