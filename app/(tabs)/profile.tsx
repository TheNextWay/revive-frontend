import React from "react";
import {
  View,
  StyleSheet,
  Button,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getAuth, signOut } from "firebase/auth";

import { Header } from "@components/Header";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@constants/Colors";
import { H1, H2, LargeP, P, SmallP } from "@components/Text";
import { Link, Redirect, router } from 'expo-router';

export default function profile() {
  const { currentUser } = getAuth();
  return (
    <>

        <Header />

        <ScrollView>
        <View style={{ paddingHorizontal: 20 }}>

          <View style={{ flexDirection: "row", marginTop: 25 }}>
            <View
              style={{
                backgroundColor: Colors.primary,
                borderWidth: 1,
                borderColor: Colors.white,
                borderRadius: 999,
                padding: 10,
                marginRight: 20,
              }}
            >
              <MaterialIcons name="person" size={60} color="white" />
            </View>
            <TouchableOpacity onPress={() => router.push("/components/updateProfile")} style={{ justifyContent: "center" }}>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  width: 250,
                }}
              >
                <LargeP style={{ fontWeight: "700", fontSize: 20 }}>
                  {currentUser?.displayName}
                </LargeP>
                <MaterialIcons
                  name="chevron-right"
                  size={28}
                  color={Colors.primary}
                />
              </View>
              <SmallP>{currentUser?.email}</SmallP>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: Colors.white,
              borderRadius: 12,
              flexDirection: "row",
              marginTop: 30,
              paddingHorizontal: 33,
              paddingVertical: 13,
              justifyContent: "center",
            }}
          >
            <View style={{ alignItems: "center" }}>
              <MaterialIcons name="paid" size={30} color={Colors.primary} />
              <P style={{ fontSize: 15, fontWeight: "700" }}>15.000</P>
              <SmallP style={{ fontSize: 10, fontWeight: "400" }}>
                Revive Point
              </SmallP>
            </View>
            <View
              style={{
                width: 1,
                marginHorizontal: 30,
                backgroundColor: Colors.gray,
              }}
            />
            <View style={{ alignItems: "center" }}>
              <MaterialIcons name="checkroom" size={30} color={Colors.primary} />
              <P style={{ fontSize: 15, fontWeight: "700" }}>32</P>
              <SmallP style={{ fontSize: 10, fontWeight: "400" }}>
                Pakaian
              </SmallP>
            </View>
            <View
              style={{
                width: 1,
                marginHorizontal: 30,
                backgroundColor: Colors.gray,
              }}
            />
            <TouchableWithoutFeedback
              onPress={() => router.push("/achievement")}
            >
              <View style={{ alignItems: "center" }}>
                <Image
                  style={{ width: 35, height: 35 }}
                  source={require("@assets/icons/editor-choice.png")}
                />
                <P style={{ fontSize: 15, fontWeight: "700" }}>Pencapaian</P>
                <SmallP
                  style={{
                    fontSize: 10,
                    fontWeight: "400",
                    textDecorationLine: "underline",
                  }}
                >
                  Lihat di sini
                </SmallP>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{backgroundColor:Colors.white, borderRadius:12, marginTop:12, padding:13,justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
              <Image style={{width:30,height:19}} source={require("@assets/logo/revive-light.png")} />
              <SmallP style={{marginLeft:5, fontWeight: "600"}}>Tentang Revive</SmallP>
            </View>
            <SmallP style={{fontSize:10, color:Colors.gray, textDecorationLine:"underline"}}>Cari Tau?</SmallP>
          </View>
            <View style={{marginTop:30, marginLeft:15}}>
              <SmallP style={{fontWeight: "600"}}>INFORMASI</SmallP>
              <TouchableWithoutFeedback >
                <View style={{flexDirection:'row', alignItems:'center', marginTop:14}}>
                  <MaterialIcons name="history" size={35} color="black" />
                  <LargeP style={{fontWeight: "400", marginLeft:10}}>Riwayat</LargeP>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback >
                <View style={{flexDirection:'row', alignItems:'center', marginTop:14}}>
                  <MaterialIcons name="security" size={35} color="black" />
                  <LargeP style={{fontWeight: "400", marginLeft:10}}>Syarat dan Ketentuan</LargeP>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback >
                <View style={{flexDirection:'row', alignItems:'center', marginTop:14}}>
                  <MaterialIcons name="lock-outline" size={35} color="black" />
                  <LargeP style={{fontWeight: "400", marginLeft:10}}>Kebijakan Privasi</LargeP>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback >
                <View style={{flexDirection:'row', alignItems:'center', marginTop:14}}>
                  <MaterialIcons name="help-outline" size={35} color="black" />
                  <LargeP style={{fontWeight: "400", marginLeft:10}}>Pertanyaan Umum</LargeP>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={{marginTop:30, marginLeft:15}}>
              <SmallP style={{fontWeight: "600"}}>AKUN</SmallP>
              <TouchableWithoutFeedback onPress={() => signOut(getAuth())} >
                <View style={{flexDirection:'row', alignItems:'center', marginTop:14}}>
                  <MaterialIcons name="logout" size={35} color="red" />
                  <LargeP style={{fontWeight: "400", marginLeft:10, color:'red'}}>Log Out</LargeP>
                </View>
              </TouchableWithoutFeedback>
            </View>
        </View>
        </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
