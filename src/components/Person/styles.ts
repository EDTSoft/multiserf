import * as React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { hp, wp } from "../../helpers";

const PersonInfoStyles = StyleSheet.create({
  info_container: {
    backgroundColor: "#fffffff",
  },
  info_header: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "10%",
  },
  info_header_logo: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  info_header_text: {
    fontFamily: "Montserrat-Regular",
    fontSize: 18,
    marginLeft: "8%",
  },
  info_header_text_bold: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    marginLeft: "2%",
    color: "rgba(96, 93, 102, 1)",
  },
  info_text: {
    marginLeft: "6%",
    marginRight: "6%",
    marginTop: "4%",
    textAlign: "left",
  },
  edit_image: {
    position: "absolute",
    bottom: 0,
    paddingLeft: "30%",
    zIndex: 9999,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  message: {
    textAlign: "center",
    paddingBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});

export default PersonInfoStyles;
