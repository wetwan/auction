import { auction } from "@/assets/constant/auction";
import BiddingButton from "@/components/auction/BiddingButton";
import Sucess from "@/components/auction/sucess";
import Button from "@/components/button";
import Heading from "@/components/Heading";
import { useAuctionCreation } from "@/context/AuctionContex";
import { AuctionItem } from "@/types/type";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const AuctionId = () => {
  const { auctionId } = useLocalSearchParams();
  const router = useRouter();
  const { formatTime } = useAuctionCreation();
  const [auctions, setAuctions] = useState<AuctionItem>();
  const [bidding, setBidding] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAuctions((prev) =>
        prev
          ? {
              ...prev,
              timeLeft: prev.timeLeft > 0 ? prev.timeLeft - 1 : 0,
            }
          : undefined
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchAuction = async () => {
      if (!auctionId) {
        return null;
      }
      const data = auction?.find((doc) => doc?.id === auctionId);
      if (data) {
        setAuctions(data);
      }
    };
    fetchAuction();
  }, [auctionId]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white", position: "relative" }}
    >
      <Image
        source={auctions?.image}
        style={{ height: 400, width: "100%", objectFit: "cover" }}
      />
      <Pressable
        style={{
          position: "absolute",
          zIndex: 20,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 40,
        }}
        onPress={() => router.push("/(tabs)/auction")}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </Pressable>

      <View
        style={{
          backgroundColor: "white",
          marginTop: -30,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
          zIndex: 40,
          padding: 20,
        }}
      >
        <View style={[styles.basicView]}>
          <View>
            <Text
              style={[
                styles.basicText,
                {
                  fontFamily: "outfit-bold",
                  fontSize: 20,
                  textTransform: "uppercase",
                },
              ]}
            >
              {auctions?.name}
            </Text>
            <Text style={[styles.basicText, { textTransform: "capitalize" }]}>
              posted by {auctions?.by}
            </Text>
          </View>

          {auctions?.timeLeft > 0 && (
            <Text
              style={[
                styles.basicText,
                { padding: 10, backgroundColor: "#B6CA1B", borderRadius: 5 },
              ]}
            >
              {formatTime(auctions?.timeLeft)}
            </Text>
          )}
        </View>
        <View style={[styles.basicView]}>
          <View
            style={[
              styles.basicView,
              {
                padding: 10,
                backgroundColor: "#B6CA1B",
                borderRadius: 5,
                gap: 5,
                justifyContent: "flex-start",
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginTop: 10,
              },
            ]}
          >
            <MaterialIcons name="category" size={24} color="white" />
            <Text
              style={[
                styles.basicText,
                { fontSize: 20, textTransform: "capitalize" },
              ]}
            >
              {auctions?.category}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.basicView,
            {
              padding: 10,
              backgroundColor: "#B6CA1B",
              borderRadius: 5,
              gap: 5,

              paddingHorizontal: 10,
              paddingVertical: 5,
              marginTop: 10,
            },
          ]}
        >
          <Text
            style={[
              styles.basicText,
              { fontSize: 20, textTransform: "capitalize" },
            ]}
          >
            estimate
          </Text>
          <Text
            style={[
              styles.basicText,
              { fontSize: 20, textTransform: "capitalize" },
            ]}
          >
            $ {auctions?.estimatedPrice}
          </Text>
        </View>
        <View
          style={[
            styles.basicView,
            {
              padding: 10,
              backgroundColor: "#B6CA1B",
              borderRadius: 5,
              gap: 5,

              paddingHorizontal: 10,
              paddingVertical: 5,
              marginTop: 10,
            },
          ]}
        >
          <Text
            style={[
              styles.basicText,
              { fontSize: 20, textTransform: "capitalize" },
            ]}
          >
            start bid
          </Text>
          <Text
            style={[
              styles.basicText,
              { fontSize: 20, textTransform: "capitalize" },
            ]}
          >
            $ {auctions?.startingPrice}
          </Text>
        </View>
        <Heading
          subTitle="Description"
          textstyle={{ fontFamily: "outfit-bold", fontSize: 18, marginTop: 20 }}
        />
        <Text style={{ paddingInline: 13, fontFamily: "outfit-medium" }}>
          {auctions?.description}.
        </Text>
      </View>
      {bidding && (
        <BiddingButton
          bidding={bidding}
          setBidding={setBidding}
          auction={auctions}
          setSuccess={setSuccess}
        />
      )}
      {success && <Sucess setSuccess={setSuccess} auction={auctions} />}
      <View
        style={{
          position: "absolute",
          bottom: -150,
          width: "80%",
          left: 40,
          elevation: 10,
        }}
      >
        <Button
          title="bid"
          onPress={() => setBidding(true)}
          style={{ backgroundColor: "#B6CA1B" }}
          disabled={bidding}
        />
      </View>
    </ScrollView>
  );
};

export default AuctionId;

const styles = StyleSheet.create({
  basicText: { fontFamily: "outfit" },
  basicView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
