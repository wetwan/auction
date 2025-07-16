import { useAuctionCreation } from "@/context/AuctionContex";
import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import Button from "../button";

const AddAuction = () => {
  const { formatTime } = useAuctionCreation();
  const [inputDate, setInputDate] = useState<string>(""); // format: YYYY-MM-DD HH:mm:ss
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0); // in seconds

  const startCountdown = () => {
    const selectedDate = new Date(inputDate); // e.g. "2025-07-20 15:00:00"

    if (selectedDate > new Date()) {
      setEndTime(selectedDate);
    } else {
      alert("Please select a future date and time");
    }
  };

  useEffect(() => {
    if (!endTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.floor((endTime.getTime() - now.getTime()) / 1000); // in seconds

      if (diff <= 0) {
        setTimeLeft(0);
        setEndTime(null); // remove the item
        clearInterval(interval);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <View>
      <Text>AddAuction</Text>
      <View style={{ padding: 20 }}>
        <TextInput
          value={inputDate}
          onChangeText={setInputDate}
          placeholder="Enter end date e.g. 2025-07-20 15:00:00"
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        />
        <Button title="Start Auction Countdown" onPress={startCountdown} />

        {endTime && timeLeft > 0 && (
          <Text style={{ fontSize: 24, marginTop: 20 }}>
            Time Left: {formatTime(timeLeft)}
          </Text>
        )}

        {!endTime && (
          <Text style={{ fontSize: 18, marginTop: 20 }}>Auction ended</Text>
        )}
      </View>
    </View>
  );
};

export default AddAuction;
