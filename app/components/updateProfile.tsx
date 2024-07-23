import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Image,
  Text,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { getAuth, signOut, updateProfile } from "firebase/auth";

import { Header } from "@components/Header";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@constants/Colors";
import { H1, H2, LargeP, P, SmallP } from "@components/Text";
import { Link, Redirect, router } from 'expo-router';
import { FormErrorMessage } from "@/components/FormErrorMessage";

export default function update() {
  const { currentUser } = getAuth();
  const auth = getAuth();
  const user = auth.currentUser;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const email = user?.email;
  const displayName = user?.displayName;
  const [name, setName] = useState(displayName);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other  action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const updateDisplayname = () => {

    if (user) {
      updateProfile(user, {
        displayName: name,
      })
        .then(() => {
          console.log("User profile updated successfully");
          console.log("berhasl coy")
        })
        .catch((error) => {
          console.error("Error updating profile: ", error);
        });
    } else {
      console.log("No user is signed in."); 
    }
  };
  return (
    <>
      <LinearGradient
        style={{ height: 424 }}
        colors={[
          "rgba(27, 174, 128, 0.4)",
          "rgba(11, 113, 86, 0.32)",
          "rgba(255, 255, 255, 0.17)",
        ]}
      >
        <Header />
        <View style={{ marginHorizontal: 14 }}>
          <View style={{ marginTop: 55, marginBottom: 10 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: "#666666",
              }}
            >
              Email
            </Text>
            <TextInput
              style={{
                height: 48,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: Colors.gray,
                padding: 16,
                marginVertical: 4,
              }}
              inputMode="text"
              autoFocus={true}
              readOnly={true}
              value={`${email}`}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: "#666666",
              }}
            >
              Nama
            </Text>
            <TextInput
              style={{
                height: 48,
                borderWidth: 1,
                borderRadius: 8,
                borderColor: Colors.gray,
                padding: 16,
                marginVertical: 4,
              }}
              inputMode="text"
              placeholder="Asep Sudorsono"
              autoFocus={true}
              value={`${name}`}
              onChangeText={(values) => setName(values)}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: isKeyboardVisible ? 170 : 100,
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 25,
                backgroundColor: "#1BAE8033",
                paddingVertical: 25,
                borderRadius: 30,
                width: 60,
                height: 60,
              }}
              disabled={name ? false : true}
              onPress={() => router.replace("/(tabs)/profile")}
            >
              <Image source={require("@assets/icons/arrow_left_green.png")} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                paddingHorizontal: 20,
                backgroundColor: name ? Colors.primary : Colors.gray,
                paddingVertical: 21,
                borderRadius: 30,
              }}
              disabled={name ? false : true}
              onPress={() => updateDisplayname}
            >
              <P
                style={{
                  fontWeight: "600",
                  color: Colors.white,
                  paddingRight: 5,
                }}
              >
                Simpan
              </P>
              <Image source={require("@assets/icons/arrow_right.png")} />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
