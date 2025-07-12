/* eslint-disable react-hooks/exhaustive-deps */
import { banners } from "@/assets/constant/auction";
import React, { useEffect, useState } from "react";
import { FlatList, Image, View } from "react-native";
import Heading from "../Heading";

interface bannerProp {
  image: string;
}

const Banner = () => {
  const [banner, setBanner] = useState<bannerProp[]>([]);
  const getBanner = async () => {
    setBanner(banners);
  };
  useEffect(() => {
    console.log(banner);
    getBanner();
  }, []);

  return (
    <View>
      <Heading subTitle="banner" textstyle={{ fontSize: 20 }} />
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ margin: 10 }}
        data={banner}
        renderItem={({ item: banner }) => (
          <View style={{ margin: 10 }}>
            <Image
              source={banner.image}
              style={{
                width: 400,
                height: 250,
                paddingBottom: 40,
                borderRadius: 30,
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Banner;
