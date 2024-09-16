import { Button, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";

import { LargeP, MediumP } from "@/components/Text";
import Colors from "@/constants/Colors";

export default function LandingScreen() {
  return (
    <>
    <View style={styles.container}>
      <Image source={require("@assets/images/shirt.png")} />
      <LargeP style={{width:280, textAlign:"center", fontFamily:"PlusJakartaSans_600SemiBold"}}>Ubah pakaian bekasmu menjadi lebih berarti</LargeP>

    </View>
      <View style={{marginBottom:40, marginHorizontal:15}}>
        <TouchableOpacity style={{
          backgroundColor:Colors.primary,
          paddingVertical:16,
          alignItems:'center',
          borderRadius:99
        }}onPress={() => router.push("/register")}>
          <MediumP style={{fontWeight: "700",color:Colors.white, }}>Daftar</MediumP>
        </TouchableOpacity>
        <TouchableOpacity style={{
          paddingVertical:16,
          alignItems:'center',
          borderRadius:99,
          borderWidth:2,
          marginTop:10,
          borderColor:Colors.primary
        }} onPress={() => router.push("/login")} >
          <MediumP style={{fontWeight: "700",color:Colors.primary, }}>Masuk</MediumP>
        </TouchableOpacity>
        
      </View>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
