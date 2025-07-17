import Welcome from "@/components/category/welcome";
import Empty from "@/components/empty";
import { db } from "@/config/firebase";
import { AuctionItem } from "@/types/type";
import { useUser } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Transaction = () => {
  const [auction, setAuction] = useState<AuctionItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const getUserBids = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "auction"));
      const userBidAuctions: AuctionItem[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();

        const bids = Array.isArray(data.bids) ? data.bids : [];

        const userHasBid = bids.some((bid: any) => bid.userId === user?.id);

        if (userHasBid) {
          const newItem: AuctionItem = {
            id: doc.id,
            name: data.name,
            image: data.image,
            category: data.category,
            startingPrice: data.startingPrice,
            estimatedPrice: data.estimatedPrice,
            description: data.description,
            timeLeft: Number(data.timeLeft),
            by: data.by || "anonymous",
            bids: bids.map((bid: any) => ({
              bid: bid.bid,
              time: bid.time,
              userId: bid.userId,
              userName: bid.userName,
            })),
          };

          userBidAuctions.push(newItem);
        }
      });

      setAuction(userBidAuctions);
    } catch (error) {
      console.error("❌ Error getting user bid auctions:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserBids();
  }, [user?.id]);

  return (
    <View>
      <View>
        <Welcome title="my auction" onpress={() => router.back()} />
        <View style={{ padding: 20 }}>
          <Text
            style={{
              color: "gray",
              fontFamily: "outfit-medium",
              fontSize: 18,
              textTransform: "uppercase",
            }}
          >
            List of auctions I have bid on
          </Text>

          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="large" color="#e74c3c" />
            </View>
          ) : (
            <FlatList
              data={auction}
              numColumns={2}
              contentContainerStyle={{ padding: 10 }}
              refreshing={loading}
              onRefresh={getUserBids}
              renderItem={({ item }) => (
                <Pressable
                  style={{ margin: 10, borderRadius: 9, overflow: "hidden" }}
                  onPress={() => {
                    router.push({
                      pathname: "/(auction)/[auctionId]",
                      params: { auctionId: item.id as string },
                    });
                  }}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 160, height: 150 }}
                  />
                  <View style={{ backgroundColor: "white", padding: 10 }}>
                    <Text style={[styles.basictext]}>{item.name}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      {item?.bids?.map((item, i) => (
                        <Text
                          key={i}
                          style={{
                            margin: 2,
                            borderWidth: 1,
                            borderRadius: 3,
                            padding: 4,
                            color: "#c172cc",
                            borderColor: "#dbccba",
                          }}
                        >
                          ${item.bid}
                        </Text>
                      ))}
                    </View>
                    <Text
                      style={[
                        styles.basictext,
                        {
                          padding: 5,
                          backgroundColor: "green",
                          width: "70%",
                          marginTop: 5,
                          color: "white",
                          borderRadius: 3,
                          fontSize: 13,
                        },
                      ]}
                    >
                      {item.category}
                    </Text>
                  </View>
                </Pressable>
              )}
              ListEmptyComponent={<Empty />}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  basictext: {
    fontFamily: "outfit",
    fontSize: 15,
    textTransform: "capitalize",
  },
});

export default Transaction;
