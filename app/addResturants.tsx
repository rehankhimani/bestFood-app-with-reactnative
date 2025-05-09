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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const link = await uploadImageToCloudinary(result.assets[0]);
      setImage(link);
    }
  };

  const pickImageFromCamera = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const link = await uploadImageToCloudinary(result.assets[0]);
        setImage(link);
      }
    }
  };

  const uploadImageToCloudinary = async (asset: any) => {
    const cloudName = "dxc9gtsl2";
    const apiKey = "425621276711985";
    const apiSecret = "-BBUPHUpD0ylxw0nF1Jwfuw52as";
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = await generateSignature(timestamp, apiSecret);

    const formData = new FormData();

    formData.append("file", {
      uri: asset.uri,
      name: asset.fileName || `upload_${Date.now()}.jpg`,
      type: asset.mimeType || "image/jpeg",
    } as any);

    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      return data.secure_url;
    } else {
      console.log("Upload Error:", data.error.message);
      return null;
    }
  };

  const generateSignature = async (timestamp: number, apiSecret: string) => {
    const signatureString = `timestamp=${timestamp}${apiSecret}`;
    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      signatureString
    );
    return digest;
  };

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
                setModalVisible(false);
              }}
            />
            <Button
              title="Open Library"
              onPress={() => {
                pickImage();
                setModalVisible(false);
              }}
            />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ThemedView>
  );
}
