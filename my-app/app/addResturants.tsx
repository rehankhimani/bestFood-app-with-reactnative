import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  Image,
  TouchableOpacity,
  Modal,
  View,
  Text,
  Button,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import ThemeButton from "@/components/ThemedButton";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import * as Crypto from "expo-crypto";
import React from "react";

export default function AddRestaurant() {
  const [image, setImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const link = await uploadImageToCloudinary(result.assets[0]);
      setImage(link);
    }
  };

  const pickImageFromCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result);

      if (!result.canceled) {
        const link = await uploadImageToCloudinary(result.assets[0]);
        setImage(link);
      }
    }
  };

  const uploadImageToCloudinary = async (obj: any) => {
    const cloudName = "dxc9gtsl2";
    const apiKey = "425621276711985";
    const apiSecret = "-BBUPHUpD0ylxw0nF1Jwfuw52as";

    const timestamp = Math.floor(Date.now() / 1000);
    const signature = generateSignature(timestamp, apiSecret);

    const formData = new FormData();
    console.log("obj=>", obj);

    formData.append("file", {
      uri: obj.uri,
      name: obj.fileName,
      type: obj.mimeType,
    });

    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", await signature);

    console.log("formData=>", formData);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log("data=>", data.secure_url);
      return data.secure_url;
    } else {
      console.log("error=>", data.error.message);
      return data.error.message;
    }
  };
  async function generateSignature(timestamp: any, apiSecret: any) {
    const signatureString = `timestamp=${timestamp}${apiSecret}`;
    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      signatureString
    );

    return digest;
  }

  return (
    <ThemedView>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          height: 220,
          margin: 12,
          borderStyle: "dotted",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
        }}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ height: "100%", width: "100%", resizeMode: "cover" }}
          />
        ) : (
          <Entypo name="image" size={60} color="#ccc" />
        )}
      </TouchableOpacity>

      <ThemeButton style={{ margin: 10 }} txt="Upload to cloudinary" />

      {/* Modal for selecting camera or library */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              width: 300,
              padding: 20,
              backgroundColor: "white",
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ marginBottom: 20, fontSize: 18 }}>
              Choose an option:
            </Text>
            <Button
              title="Open Camera"
              onPress={() => {
                pickImageFromCamera();
                setModalVisible(false); // Close modal after selecting
              }}
            />
            <Button
              title="Open Library"
              onPress={() => {
                pickImage();
                setModalVisible(false); // Close modal after selecting
              }}
            />
            <Button
              title="Cancel"
              onPress={() => setModalVisible(false)} // Close modal
            />
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}