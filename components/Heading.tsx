import React from "react";
import { Pressable, Text, TextStyle, View, ViewStyle } from "react-native";

interface headerProp {
  style?: ViewStyle;
  onPress?: () => void;
  subTitle?: string;
  seemore?: boolean;
  textstyle?: TextStyle;
}

const Heading = ({
  style,
  onPress,
  subTitle,
  seemore,
  textstyle,
}: headerProp) => {
  return (
    <View
      style={[
        {
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
        style,
      ]}
    >
      <Text
        style={[
          textstyle,
          { fontFamily: "outfit-bold", textTransform: "capitalize" },
        ]}
      >
        {subTitle}
      </Text>
      {seemore && (
        <Pressable onPress={onPress}>
          <Text style={{ fontFamily: "outfit" }}>See more</Text>
        </Pressable>
      )}
    </View>
  );
};

export default Heading;
