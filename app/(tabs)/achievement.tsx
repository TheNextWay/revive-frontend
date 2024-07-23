import React from "react";
import { StrokeText } from "@charmy.tech/react-native-stroke-text";
import { View, Image, TouchableOpacity } from "react-native";
import { Header } from "@/components/Header";
import Colors from "@/constants/Colors";
import { SmallP, P, H1, LargeP } from "@/components/Text";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { captureScreen } from "react-native-view-shot";
import * as Sharing from 'expo-sharing';
import { getAuth } from "firebase/auth";

export default function achivement() {
  const { currentUser } = getAuth();

  const CaptureTheScreen = () => {
    const options = {
      mimeType: 'image/jpeg',
      dialogTitle: "messageText",
    };
    captureScreen({
      format: "jpg",
      quality: 0.8,
    }).then(
      (uri) => Sharing.shareAsync(`file://${uri}`, options),
      (error) => console.error("Oops, snapshot failed", error)
    )
  }
  return (
    <>

    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Header />
      <View
        style={{
          backgroundColor: Colors.primary,
          borderRadius: 18,
          width: 355,
          height: 545,
        }}
      >
        <View style={{ marginHorizontal: 30 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 15,
              alignItems: "center",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <SmallP style={{ color: Colors.white, fontSize: 12 }}>
                BERGABUNG
              </SmallP>
              <SmallP style={{ color: Colors.white }}>SEJAK 2024</SmallP>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: Colors.white,
                borderRadius: 99,
                width: 95,
                height: 20,
                backgroundColor: Colors.white,
              }}
            ></View>
            <View style={{ alignItems: "center" }}>
              <SmallP style={{ color: Colors.white, fontSize: 12 }}>
                BERGABUNG
              </SmallP>
              <SmallP style={{ color: Colors.white }}>SEJAK 2024</SmallP>
            </View>
          </View>
        </View>
        <View style={{ marginHorizontal: 15, paddingTop: 20, top: -80 }}>
          <View
            style={{
              backgroundColor: Colors.secondary,
              paddingVertical: 10,
              alignItems: "center",
              justifyContent: "center",
              top: 230,
              paddingTop: 50,
              borderRadius: 15,
            }}
          >
            <P style={{ color: "#0B7156", fontWeight: "700" }}>
              {currentUser?.displayName}
            </P>
          </View>
          <Image
            style={{ width: 325, borderRadius: 15 }}
            source={require("@assets/images/achivement-banner.png")}
          />
        </View>
        <View
          style={{
            backgroundColor: Colors.white,
            top: -25,
            borderRadius: 15,
            marginHorizontal: 15,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 5,
            padding: 20,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons
                name="checkroom"
                size={55}
                color={Colors.primary}
              />
              <View>
                <SmallP>Pakaian Terkumpul</SmallP>
                <LargeP
                  style={{
                    fontSize: 24,
                    fontFamily: "PlusJakartaSans_700Bold",
                  }}
                >
                  0
                </LargeP>
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <Image source={require("@assets/icons/paid.png")} />

              <P style={{ fontFamily: "PlusJakartaSans_700Bold" }}>0</P>

              <SmallP style={{ fontSize: 10 }}>Revive Poin</SmallP>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 10,
            }}
          >
            <View style={{ alignItems: "center" }}>
              <Image source={require("@assets/icons/co2.png")} />

              <P style={{ fontFamily: "PlusJakartaSans_700Bold" }}>0</P>

              <SmallP style={{ fontSize: 10 }}>gram jejak karbon</SmallP>
              <SmallP style={{ fontSize: 10 }}>dikurangi</SmallP>
            </View>
            <View style={{ alignItems: "center" }}>
              <Image source={require("@assets/icons/fabric.png")} />

              <P style={{ fontFamily: "PlusJakartaSans_700Bold" }}>Belum ada</P>

              <SmallP style={{ fontSize: 10 }}>Paling banyak</SmallP>
              <SmallP style={{ fontSize: 10 }}>disetor</SmallP>
            </View>
            <View style={{ alignItems: "center" }}>
              <Image source={require("@assets/icons/shopping.png")} />

              <P style={{ fontFamily: "PlusJakartaSans_700Bold" }}>0</P>

              <SmallP style={{ fontSize: 10 }}>Produk sustain</SmallP>
              <SmallP style={{ fontSize: 10 }}>dibeli</SmallP>
            </View>
          </View>
        </View>
      </View>
      
    </View>
      <View style={{marginTop:20, marginHorizontal: 30}}>
      <TouchableOpacity
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: Colors.primary,
                paddingVertical: 21,
                borderRadius: 30,
              }}
              onPress={() => CaptureTheScreen() }
            >
              <MaterialCommunityIcons name="share-variant-outline" color={Colors.white} size={20} />
              <P
                style={{
                  fontWeight: "600",
                  color: Colors.white,
                  paddingLeft: 5,
                }}
              >
                Bagikan
              </P>
              
            </TouchableOpacity>
      </View>
    </>
  );
}
