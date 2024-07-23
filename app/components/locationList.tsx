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
  Linking,
} from "react-native";
import { getAuth, signOut, updateProfile } from "firebase/auth";

import { Header } from "@components/Header";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "@constants/Colors";
import { H1, H2, LargeP, MediumP, P, SmallP } from "@components/Text";
import { Link, Redirect, router } from 'expo-router';
import { FormErrorMessage } from "@/components/FormErrorMessage";
const locations = [
    {
      title:'SMK Telkom Malang',
      address:'Jl. Danau Ranau, Sawojajar, Kec. Kedungkandang, Kota Malang, Jawa Timur 65139 ',
      maps_url:'https://maps.app.goo.gl/wQcYvA4eMCLdKdMt5',
      coordinates:['-7.9769845857885135', '112.65874175490647']
    },
    {
        title:'Apartemen Begawan',
        address:'Jl. Raya Tlogomas No.1-3, Tlogomas, Kec. Lowokwaru, Kota Malang, Jawa Timur 65144 ',
        maps_url:'https://maps.app.goo.gl/FKVopMX61wb8ikhW9',
        coordinates:['-7.926794782839947', '112.60248455836108']
      }, 

  ]
export default function LocationsList() {
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
        <View
          style={{
            marginHorizontal: 15,
          }}
        >   
        <View>
            {
                locations.map((location,index) => (

                <View
                key={index}
                    style={{
                    backgroundColor: Colors.white,
                    borderRadius: 8,
                    shadowOffset: { width: 0, height: -3 },
                    paddingHorizontal: 18,
                    paddingVertical: 18,
                    marginTop:15
                    }}
                >
                    <View
                    style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                    }}
                    >
                    <View
                        style={{
                        borderRadius: 3,
                        borderWidth: 1,
                        borderColor: Colors.primary,
                        padding: 3,
                        }}
                    >
                        <SmallP
                        style={{
                            fontSize: 10,
                            fontWeight: "600",
                            color: Colors.primary,
                        }}
                        >
                        3.2 KM
                        </SmallP>
                    </View>
                    <TouchableOpacity onPress={() => Linking.openURL(location.maps_url)} style={{ flexDirection: "row", alignItems:'center' }}>
                        <SmallP
                        style={{
                            color: Colors.primary,
                            textDecorationLine: "underline",
                            fontWeight: "500",
                        }}
                        >
                        Buka di Google maps
                        </SmallP>
                        <Image style={{width:20}} source={require("@assets/icons/distance.png")}/>
                    </TouchableOpacity>
                    </View>
                    <View style={{marginTop:5}}>
                        <MediumP style={{fontWeight: "600",
                        }}>{location.title}</MediumP>
                        <P style={{fontWeight: "600",
                        color:Colors.gray
                        }}>{location.address}</P>
                    </View>
                </View>
                    
                ))
            }
            </View>
            <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 390,
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
              onPress={() => router.replace("/(tabs)")}
            >
              <Image source={require("@assets/icons/arrow_left_green.png")} />
            </TouchableOpacity>

          </View>
        </View>
        
      </LinearGradient>
    </>
  );
};

