import React, { useEffect, useState } from "react";
import { CameraView, useCameraPermissions } from 'expo-camera';
import {  Button, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { H1, H2, LargeP, P, SmallP } from "@components/Text";
import Colors from "@constants/Colors";
import {HeaderWhite} from "@components/Header";
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { router } from "expo-router";
import { captureScreen } from "react-native-view-shot";
import * as Sharing from 'expo-sharing';

function Success() {
  return (
    <View style={{backgroundColor:Colors.primary, flex:1, justifyContent:"center"}}>
        <Image style={{alignSelf:'center',marginBottom:20}} source={require('@assets/images/success-icon.png')} />
        <LargeP style={{textAlign:"center", color:Colors.white}}>Yeay, Berhasil</LargeP>
        <P style={{textAlign:"center", color:Colors.white, fontWeight:'500'}}>Kami sudah menerima pakaianmu!</P>
      </View>
  );
}
function Result() {
  return (
    <View
        style={{
          flex: 1,
          backgroundColor: Colors.primary,
          borderRadius: 60,
          paddingTop: 430,
          bottom: 430,
        }}
      >
        <HeaderWhite />
        <Image
          style={{
            alignSelf: "center",
            marginBottom: 10,
            marginTop: 50,
            width: 150,
            height: 150,
          }}
          source={require("@assets/images/success-icon.png")}
        />
        <H2 style={{ textAlign: "center", color: Colors.white }}>Berhasil</H2>
              
        <View style={{alignItems:'center' }}>
          <View
            style={{
              flexDirection: "row",
              marginTop: 150,
            }}
          >
            <View>
              <P style={{ color: Colors.primary }}>Revive Point ditambahkan</P>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <H1
                  style={{
                    fontSize: 50,
                    fontWeight: "bold",
                    color: Colors.primary,
                  }}
                >
                  32.000
                </H1>
              </View>
            </View>
            <View
              style={{
                height: "100%",
                width: 1,
                marginHorizontal: 30,
                backgroundColor: Colors.gray,
              }}
            />
            <View>
              <P style={{ color: Colors.secondary }}>Pakaian</P>
              <H1
                style={{
                  fontSize: 50,
                  fontWeight: "bold",
                  color: Colors.secondary,
                }}
              >
                2
              </H1>
            </View>
          </View>

          <View style={{ flexDirection: "row", paddingTop:30 }}>
            <View style={{ flexDirection: "row", marginRight: 20, justifyContent:'center'}}>
            <Image
              source={require("@assets/icons/calendar-month.png")}
            />
              <View>
                <SmallP style={{ color: Colors.primary, fontSize: 8 }}>
                  12:32
                </SmallP>
                <SmallP
                  style={{
                    color: Colors.primary,
                    fontWeight: "600",
                    fontSize: 10,
                  }}
                >
                  24 November 2024
                </SmallP>
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={{ marginRight: 0 }}
                source={require("@assets/icons/location-on.png")}
              />
              <View>
                <SmallP style={{ color: Colors.primary, fontSize: 8 }}>
                  Textile Shorting Machine
                </SmallP>
                <SmallP
                  style={{
                    color: Colors.primary,
                    fontWeight: "600",
                    fontSize: 10,
                  }}
                >
                  Mall Olympic Garden - Malang
                </SmallP>
              </View>
            </View>
          </View>
        </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop:70,
              marginHorizontal:30
            }}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "center",
                paddingHorizontal: 25,
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

            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 22,
                paddingVertical: 22,
                backgroundColor: "#1BAE8033",
                borderRadius: 99,
              }}
              onPress={() => router.push("/(tabs)/")}
            >
              <Feather name="home" color={Colors.primary} size={25} />

            </TouchableOpacity>

            
          </View>

      </View> 
  );
}


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

export default function qr() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [success, setSuccess] = useState(false);
  const [result, setResult] = useState(false);
  const [error, setError] = useState(true);
  const [flashToggle, setFlashToggle] = useState(false);
  const toggleSwitch = () => setFlashToggle(previousState => !previousState);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  if (success) { 
    return (
      <Success />
    )
  }else if (result) { 
    return (
      <Result />
    );
  }


  const handleBarCodeScanned = (data: any) => {
    setScanned(false);
    if (true) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 4000); 
     setResult(true)
    }else {
      setError(true)
    }
    setScanned(false);
  };
  
  return (
    <>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={error}
          onRequestClose={() => {
            setError(!error);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{backgroundColor:Colors.red, bottom:70, marginBottom: -45,borderWidth:1, borderColor:Colors.white, borderRadius:9999}}>
                <MaterialIcons  style={{color:Colors.white, padding:18,}} name="report-gmailerrorred" size={46} />
              </View>
              <LargeP
                style={{
                  width: 155,
                  fontWeight: "500",
                  textAlign: "center",
                }}
              >
                Gagal memindai
              </LargeP>
              <SmallP
                style={{
                  textAlign: "center",
                  width: 200,
                  marginTop: 10,
                }}
              >
                Kode QR sudah kadaluarsa atau tidak valid, mohon coba lagi 
              </SmallP>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingHorizontal: 25,
                  backgroundColor: Colors.red,
                  paddingVertical: 21,
                  borderRadius: 30,
                  top: 60,
                  marginTop: -40,
                }}
                onPress={() => setError(false)}
              >
                <P
                  style={{
                    fontWeight: "600",
                    color: Colors.white,
                    paddingRight: 5,
                  }}
                >
                  Tutup
                </P>
                <MaterialIcons  style={{color:Colors.white}} name="close" size={24} />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <CameraView
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          style={{ flex: 1, flexDirection: "column" }}
          onBarcodeScanned={(data) =>
            scanned ? undefined : handleBarCodeScanned(data)
          }
          flash={flashToggle ? "on" : "off"}
        >
          <View style={{}}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 12,
                paddingVertical: 50,
              }}
            >
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingHorizontal: 25,
                  backgroundColor: Colors.primary,
                  paddingVertical: 5,
                  borderRadius: 30,
                }}
                onPress={() => router.back()}
              >
                <Image source={require("@assets/icons/arrow_left.png")} />

                <P
                  style={{
                    fontWeight: "600",
                    color: Colors.white,
                    paddingRight: 5,
                  }}
                >
                  Kembali
                </P>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingHorizontal: 15,
                  backgroundColor: Colors.white,
                  paddingVertical: 15,
                  borderRadius: 30,
                }}
                onPress={toggleSwitch}
              >
                <Image
                  source={
                    flashToggle
                      ? require("@assets/icons/flash_on.png")
                      : require("@assets/icons/flash_off.png")
                  }
                />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: "center", marginTop: 580 }}>
              <Image
                style={{ width: 222 }}
                source={require("@assets/images/scan-qr-text.png")}
              />
            </View>
          </View>
        </CameraView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 30,
    backgroundColor: 'transparent',
    margin: 32,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: 350,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

});
