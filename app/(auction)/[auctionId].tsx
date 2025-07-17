import BiddingButton from "@/components/auction/BiddingButton";
import Sucess from "@/components/auction/sucess";
import Button from "@/components/button";
import Heading from "@/components/Heading";
import { db } from "@/config/firebase";
import { useAuctionCreation } from "@/context/AuctionContex";
import { AuctionItem } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
  const [auction, setAuction] = useState<AuctionItem>();
  const [bidding, setBidding] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useUser();

  useEffect(() => {
    const interval = setInterval(() => {
      setAuction((prev) =>
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
      setLoading(true);
      try {
        const docRef = doc(db, "auction", auctionId as string);
        const auction = await getDoc(docRef);

        const data = auction.data();

        const newItem: AuctionItem = {
          id: auction?.id,
          name: data?.name,
          image: data?.image,
          category: data?.category,
          startingPrice: data?.startingPrice,
          estimatedPrice: data?.estimatedPrice,
          description: data?.description,
          timeLeft: Number(data?.timeLeft),
          by: data?.by || "anonymous",
          userId: data?.userId,
        };

        setAuction(newItem);
      } catch (error) {
        console.log("error loading", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAuction();
  }, [auctionId]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#e74c3c" />
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white", position: "relative" }}
    >
      <Image
        source={{ uri: auction?.image }}
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
              {auction?.name}
            </Text>
            <Text style={[styles.basicText, { textTransform: "capitalize" }]}>
              posted by {auction?.by}
            </Text>
          </View>

          {typeof auction?.timeLeft === "number" && auction.timeLeft > 0 && (
            <Text
              style={[
                styles.basicText,
                { padding: 10, backgroundColor: "#B6CA1B", borderRadius: 5 },
              ]}
            >
              {formatTime(auction?.timeLeft)}
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
              {auction?.category}
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
            $ {auction?.estimatedPrice}
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
            $ {auction?.startingPrice}
          </Text>
        </View>
        <Heading
          subTitle="Description"
          textstyle={{ fontFamily: "outfit-bold", fontSize: 18, marginTop: 20 }}
        />
        <Text style={{ paddingInline: 13, fontFamily: "outfit-medium" }}>
          {auction?.description}.
        </Text>
      </View>
      {bidding && (
        <BiddingButton
          bidding={bidding}
          setBidding={setBidding}
          auction={auction}
          setSuccess={setSuccess}
        />
      )}
      {success && auction && (
        <Sucess setSuccess={setSuccess} auction={auction} />
      )}

      {auction?.userId !== user?.id && (
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
      )}
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
