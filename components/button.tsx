import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
}

type ButtonVariant = "block" | "white" | "regular" | "ghost";

const Button = ({
  title,
  onPress,
  variant = "block",
  style,
  textStyle,
  disabled,
}: ButtonProps) => {
  const getButtonStyle = () => {
    switch (variant) {
      case "block":
        return styles.block;
      case "white":
        return styles.white;
      case "regular":
        return styles.regular;
      case "ghost":
        return styles.ghost;
      default:
        return styles.block;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "block":
        return styles.textBlock;
      case "white":
        return styles.textWhite;
      case "regular":
        return styles.textRegular;
      case "ghost":
        return styles.textGhost;
      default:
        return styles.textBlock;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.base, getButtonStyle(), style]}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          getTextStyle(),
          textStyle,
          { fontFamily: "outfit" },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  block: {
    backgroundColor: "#659CF6",
  },
  white: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#659CF6",
  },
  regular: {
    backgroundColor: "#E5E7EB", // light gray
  },
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#ccc",
  },

  text: {
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "capitalize",
  },
  textBlock: {
    color: "#fff",
  },
  textWhite: {
    color: "#659CF6",
  },
  textRegular: {
    color: "#333",
  },
  textGhost: {
    color: "#666",
  },
});

export default Button;
