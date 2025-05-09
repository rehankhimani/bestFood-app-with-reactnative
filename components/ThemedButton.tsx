import {
  TouchableOpacity,
  type TouchableOpacityProps,
  StyleSheet,
} from "react-native";
import { ThemedText } from "./ThemedText";
import React from "react";

export type ThemedButtonProps = TouchableOpacityProps & {
  txt: string;
  bgColor?: string;
  txtColor?: string;
  my?: number;
};

export default function ThemeButton({
  txt,
  style,
  bgColor,
  txtColor,
  my = 0,
  ...rest
}: ThemedButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.default,
        bgColor && { backgroundColor: bgColor },
        my ? { marginVertical: my } : null,
        style,
      ]}
      {...rest}
    >
      <ThemedText
        type="defaultSemiBold"
        align="center"
        style={{ color: txtColor ? txtColor : "#fff" }}
      >
        {txt}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  default: {
    height: 50,
    backgroundColor: "#eb144c",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 8,
    alignItems: "center",
  },
});