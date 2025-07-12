import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Platform,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface InputProps extends TextInputProps {
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  label?: string;
  labelStye?: TextStyle;
}

const Input = ({
  inputStyle,
  containerStyle,
  label,
  value,
  onFocus,
  secureTextEntry,

  labelStye,
  ...prop
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus && onFocus(e);
  };

  return (
    <View style={[{ paddingTop: 18, marginTop: 10 }, containerStyle]}>
      {label && (
        <Text
          style={[
            labelStye,
            { textTransform: "capitalize", fontFamily: "outfit-bold" },
          ]}
        >
          {label}
        </Text>
      )}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          style={[
            { flex: 1 },
            inputStyle,
            {
              outline: Platform.OS === "web" ? "none" : undefined,
              fontFamily: "outfit-medium",
              borderColor: isFocused ? "#B6CA1B" : "#aaa",
              color: isFocused ? "#000" : "#aaa",
            },
          ]}
          onFocus={handleFocus}
          secureTextEntry={secureTextEntry && !showPassword}
          {...prop}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword((prev) => !prev)}
            style={{ marginLeft: 8, padding: 4 }}
          >
            {showPassword ? (
              <Feather name="eye-off" size={20} color={"red"} />
            ) : (
              <Feather name="eye" size={20} color={"blue"} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;
