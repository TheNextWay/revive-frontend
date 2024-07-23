import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  TextInput,
  Button,
  View,
  TouchableOpacity,
  Keyboard,
  Alert,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  validatePassword,
} from "firebase/auth";
import { FormErrorMessage } from "@components/FormErrorMessage";
import Colors from "@constants/Colors";
import { signupValidationSchema } from "@/utils";
import { H1, P, LargeP } from "@components/Text";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

export default function SignupScreen() {
  const [errorState, setErrorState] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [page, setPage] = useState("email");
  const [name, setName] = useState("");  
  const [isChecked, setChecked] = useState(false);
  // const auth = getAuth();

  // const user = auth.currentUser;
  // const newPassword = getASecureRandomPassword();

  // updatePassword(user, newPassword).then(() => {
  //   // Update successful.
  // }).catch((error) => {
  //   // An error ocurred
  //   // ...
  // });
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
  // const {
  //   passwordVisibility,
  //   handlePasswordVisibility,
  //   rightIcon,
  //   handleConfirmPasswordVisibility,
  //   confirmPasswordIcon,
  //   confirmPasswordVisibility,
  // } = useTogglePasswordVisibility();

  const handleSignup = async (values: { email: string; password: string }) => {
    const { email, password } = values;

    createUserWithEmailAndPassword(getAuth(), email, password)
      .then((user) => {
        console.log("Coba registrasi");

        sendEmailVerification(user.user)
        .then(() => {
          console.log('Email verification sent!');
        })
        .catch((error) => {
          console.error('Error sending email verification:', error);
        });
        // if (user) router.replace("/(tabs)");
        if (user) setPage('email-verification');
      })
      .catch((err) => {
        alert(err?.message);
      });
  };
  if (page ==  "email-verification") {
    const user = getAuth();
    const intervalId = setInterval(() => {
      user.currentUser?.reload()
        .then(() => {
          if (user.currentUser?.emailVerified) {
            console.log('Email has been verified!');
              clearInterval(intervalId);
              setPage("detail")
          } else {
            console.log('Email is not verified yet.');
          }
        })
        .catch((error) => {
          console.error('Error reloading user:', error);
          clearInterval(intervalId); // Stop checking on error
        });
    }, 2000)
  }

  const updateDisplayname = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      updateProfile(user, {
        displayName: name,
      })
        .then(() => {
          console.log("User profile updated successfully");
          setPage("terms-condition")
        })
        .catch((error) => {
          console.error("Error updating profile: ", error);
        });
    } else {
      console.log("No user is signed in."); 
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.white,
      paddingHorizontal: 12,
    },
    logoContainer: {
      alignItems: "center",
    },
    screenTitle: {
      fontSize: 32,
      fontWeight: "700",
      color: Colors.black,
      paddingTop: 20,
    },
    button: {
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 8,
      backgroundColor: Colors.primary,
      padding: 10,
      borderRadius: 8,
    },
    buttonText: {
      fontSize: 20,
      color: Colors.white,
      fontWeight: "700",
    },
    borderlessButtonContainer: {
      marginTop: 16,
      alignItems: "center",
      justifyContent: "center",
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

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={signupValidationSchema}
        onSubmit={(values) => handleSignup(values)}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleSubmit,
          handleBlur,
        }) => (
          <>
            <ScrollView style={{ opacity: modalVisible ? 0.5 : undefined }}>
              <View
                style={{
                  paddingHorizontal: 15,
                  marginTop: 55,
                }}
              >
                {(() => {
                  switch (page) {
                    case "email":
                      return (
                        <>
                          <H1 style={{ fontWeight: "500", fontSize: 45 }}>
                            Daftar
                          </H1>

                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ paddingTop: 2 }}>
                              Sudah punya akun?
                            </Text>
                            <TouchableOpacity
                              onPress={() => router.push("/login")}
                              style={{
                                backgroundColor: "#1BAE8033",
                                paddingHorizontal: 15,
                                paddingVertical: 5,
                                borderRadius: 25,
                                marginHorizontal:10
                              }}
                            >
                              <Text
                                style={{ fontSize: 12, color: Colors.primary }}
                              >
                                Masuk
                              </Text>
                            </TouchableOpacity>
                          </View>
                          <TouchableOpacity
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "center",
                              paddingHorizontal: 32,
                              paddingVertical: 16,
                              borderWidth: 1,
                              borderRadius: 6,
                              borderColor: Colors.gray,
                              marginTop: 60,
                            }}
                            onPress={() => console.log("Login Pake Google")}
                          >
                            <Image
                              style={{ marginRight: 10 }}
                              source={require("@assets/icons/google.png")}
                            />
                            <P
                              style={{
                                textAlign: "center",
                                fontWeight: "600",
                              }}
                            >
                              Lanjutkan pake Google
                            </P>
                          </TouchableOpacity>

                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginVertical: 15,
                            }}
                          >
                            <View
                              style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: Colors.gray,
                              }}
                            />
                            <View>
                              <Text
                                style={{
                                  width: 50,
                                  fontSize: 12,
                                  textAlign: "center",
                                }}
                              >
                                atau
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                height: 1,
                                backgroundColor: Colors.gray,
                              }}
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
                              Alamat Email
                            </Text>
                            <TextInput
                              style={{
                                height: 48,
                                borderWidth: 1,
                                borderRadius: 8,
                                borderColor: errors.email ? Colors.red  : Colors.gray ,
                                padding: 16,
                                marginVertical: 4,
                              }}
                              inputMode="email"
                              placeholder="work@gmail.com"
                              keyboardType="email-address"
                              autoCapitalize={"none"}
                              autoFocus={true}
                              value={values.email}
                              onChangeText={handleChange("email")}
                              onBlur={handleBlur("email")}
                            />
                            <FormErrorMessage
                              error={errors.email}
                              visible={touched.email}
                            />
                          </View>
                          <View>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: isKeyboardVisible ? 100 : 380,
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
                                onPress={() => router.push("/landing")}
                              >
                                <Image
                                  source={require("@assets/icons/arrow_left_green.png")}
                                />
                              </TouchableOpacity>

                              <TouchableOpacity
                                style={{
                                  alignItems: "center",
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  paddingHorizontal: 20,
                                  backgroundColor: values.email && !errors.email
                                    ? Colors.primary
                                    : Colors.gray,
                                  paddingVertical: 21,
                                  borderRadius: 30,
                                }}
                                disabled={values.email && !errors.email ? false : true}
                                onPress={() => setPage("password")}
                              >
                                <P
                                  style={{
                                    fontWeight: "600",
                                    color: Colors.white,
                                    paddingRight: 5,
                                  }}
                                >
                                  Lanjutkan
                                </P>
                                <Image
                                  source={require("@assets/icons/arrow_right.png")}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </>
                      );
                      break;
                    case "password":
                      return (
                        <>
                          <H1
                            style={{
                              fontWeight: "500",
                              fontSize: 30,
                              marginTop: 40,
                            }}
                          >
                            Masukkin Kata Sandi
                          </H1>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ paddingTop: 2, width: 293 }}>
                              Isi kata sandi yang sulit ditebak, tambahin angka
                              sama huruf besar
                            </Text>
                          </View>

                          <View style={{ marginTop: 45, paddingVertical: 5 }}>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: "600",
                                color: "#666666",
                                paddingBottom: 5,
                              }}
                            >
                              Kata Sandi
                            </Text>
                            <TextInput
                              style={{
                                height: 48,
                                borderWidth: 1,
                                borderRadius: 8,
                                borderColor:errors.password ? Colors.red  : Colors.gray ,
                                padding: 16,
                              }}
                              value={values.password}
                              onChangeText={handleChange("password")}
                              onBlur={handleBlur("password")}
                              secureTextEntry={true}
                              autoCapitalize={"none"}
                              placeholder="******"
                            />
                            <FormErrorMessage
                              error={errors.password}
                              visible={touched.password}
                            />
                          </View>
                          <View style={{ marginTop: 10 }}>
                            <Text
                              style={{
                                fontSize: 15,
                                fontWeight: "600",
                                color: "#666666",
                                paddingBottom: 5,
                              }}
                            >
                              Konfirmasi Kata Sandi
                            </Text>
                            <TextInput
                              style={{
                                height: 48,
                                borderWidth: 1,
                                borderRadius: 8,
                                borderColor:errors.confirmPassword ? Colors.red  : Colors.gray ,
                                padding: 16,
                              }}
                              value={values.confirmPassword}
                              onChangeText={handleChange("confirmPassword")}
                              onBlur={handleBlur("confirmPassword")}
                              secureTextEntry={true}
                              autoCapitalize={"none"}
                              placeholder="******"
                              textContentType="password"
                            />
                            <FormErrorMessage
                              error={errors.confirmPassword}
                              visible={touched.confirmPassword}
                            />
                          </View>

                          <View>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: isKeyboardVisible ? 100 : 400,
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
                                onPress={() => setPage("email")}
                              >
                                <Image
                                  source={require("@assets/icons/arrow_left_green.png")}
                                />
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={{
                                  alignItems: "center",
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  paddingHorizontal: 20,
                                  backgroundColor:
                                    values.confirmPassword && values.password
                                      ? Colors.primary
                                      : Colors.gray,
                                  paddingVertical: 21,
                                  borderRadius: 30,
                                }}
                                disabled={
                                  values.confirmPassword && values.password
                                    ? false
                                    : true
                                }
                                onPress={() => handleSubmit()}
                              >
                                <P
                                  style={{
                                    fontWeight: "600",
                                    color: Colors.white,
                                    paddingRight: 5,
                                  }}
                                >
                                  Lanjutkan
                                </P>
                                <Image
                                  source={require("@assets/icons/arrow_right.png")}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </>
                      );
                      break;
                    case "detail":
                      return (
                        <>
                          <H1
                            style={{
                              fontWeight: "500",
                              fontSize: 30,
                              marginTop: 40,
                            }}
                          >
                            Detail Tentangmu
                          </H1>
                          <View style={{ flexDirection: "row" }}>
                            <Text style={{ paddingTop: 2, width: 293 }}>
                              isi nama lengkapmu, jadi kita lebih gampang
                              kenalan
                            </Text>
                          </View>

                          <View style={{ marginTop: 55 }}>
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
                              value={name}
                              onChangeText={(values) => setName(values)}
                            />
                            <FormErrorMessage
                              error={errors.email}
                              visible={touched.email}
                            />
                          </View>
                          <View>
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                marginTop: isKeyboardVisible ? 170 : 480,
                              }}
                            >
                             

                              <TouchableOpacity
                                style={{
                                  alignItems: "center",
                                  flexDirection: "row",
                                  justifyContent: "center",
                                  paddingHorizontal: 20,
                                  backgroundColor: values.email
                                    ? Colors.primary
                                    : Colors.gray,
                                  paddingVertical: 21,
                                  borderRadius: 30,
                                }}
                                disabled={values.email ? false : true}
                                onPress={updateDisplayname}
                              >
                                <P
                                  style={{
                                    fontWeight: "600",
                                    color: Colors.white,
                                    paddingRight: 5,
                                  }}
                                >
                                  Lanjutkan
                                </P>
                                <Image
                                  source={require("@assets/icons/arrow_right.png")}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </>
                      );
                      break;
                    case "terms-condition":
                     return (
                      <>
                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: 50,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Image
                          source={require("@assets/icons/shield-person.png")}
                          style={{ marginHorizontal: 20 }}
                        />
                        <H1
                          style={{
                            fontWeight: "500",
                            fontSize: 24,
                            width: 233,
                          }}
                        >
                          Terima Persyaratan Revive & Kebijakan Privasi
                        </H1>
                      </View>

                      <View style={{ marginTop: 54, alignItems: "center" }}>
                        <P style={{ width: 343 }}>
                          Dengan memilih "Setuju" di bawah, saya telah
                          meninjau dan menyetujui
                          <P style={{ color: Colors.primary }}>
                            Syarat dan Ketentuan
                          </P>
                          dan
                          <P style={{ color: Colors.primary }}>
                            Kebijakan Privasi.
                          </P>
                        </P>
                      </View>

                      <View style={{ marginTop: isKeyboardVisible ? 170 : 360,marginHorizontal:10}}>
                      <View
                          style={{
                            flex: 1,
                            height: 1,
                            backgroundColor: Colors.gray,
                          }}
                        />
                        <View style={{marginVertical:30, justifyContent:'space-between', flexDirection:'row'}}>
                          <P style={{fontSize: 16,fontFamily:"PlusJakartaSans_600SemiBold"}}>Saya Setuju</P>
                          <Checkbox
                            style={{borderRadius:5,padding:10}}
                            value={isChecked}
                            onValueChange={setChecked}
                            color={isChecked ? Colors.primary : undefined}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems:'center'
                           
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
                            onPress={() => setPage("details")}
                          >
                            <Image
                              source={require("@assets/icons/arrow_left_green.png")}
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={{
                              alignItems: "center",
                              flexDirection: "row",
                              justifyContent: "center",
                              paddingHorizontal: 20,
                              backgroundColor: isChecked
                                ? Colors.primary
                                : Colors.gray,
                              paddingVertical: 21,
                              borderRadius: 30,
                            }}
                            disabled={isChecked ? false : true}
                            onPress={() => router.replace("/(tabs)")}
                          >
                            <P
                              style={{
                                fontWeight: "600",
                                color: Colors.white,
                                paddingRight: 5,
                              }}
                            >
                              Lanjutkan
                            </P>
                            <Image
                              source={require("@assets/icons/arrow_right.png")}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      </>
                     );
                      break;
                    case "email-verification" :
                      return (
                        <>
                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: 50,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Image
                            source={require("@assets/icons/drafts.png")}
                            style={{ marginHorizontal: 35 }}
                          />
                          <H1
                            style={{
                              fontWeight: "500",
                              fontSize: 32,
                              width: 233,
                            }}
                          >
                            Cek Emailmu terus Verifikasi
                          </H1>
                        </View>

                        <View style={{ marginTop: 30, alignItems: "center" }}>
                          <P style={{ width: 343 }}>
                            Klik tombol/link yang kami kirimkan ke email <P style={{textDecorationLine:'underline'}}>{getAuth().currentUser?.email}</P> untuk verifikasi emailmu
                          </P>
                        </View>

                        <View style={{flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems:'center',
                              marginHorizontal:12,
                              marginTop:35
                             }}>
                          <P style={{fontWeight: "500"}}>Belum dapet Email?</P>
                          <View
                            style={{
                              flex: 1,
                              height: 2,
                              backgroundColor: Colors.gray,
                              marginHorizontal:10
                            }}
                          />
                          <P style={{fontWeight: "500"}}>00:32</P>
                          <TouchableOpacity
                            onPress={() => router.push("/login")}
                            style={{
                              backgroundColor: "#1BAE8033",
                              paddingHorizontal: 15,
                              paddingVertical: 5,
                              borderRadius: 25,
                              marginHorizontal:5
                            }}
                          >
                            <Text
                              style={{ fontSize: 12, color: Colors.primary }}
                            >
                              Kirim Ulang
                            </Text>
                          </TouchableOpacity>
                        </View>

                        <View style={{ marginTop: isKeyboardVisible ? 170 : 450, marginHorizontal:10}}>

                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems:'center'
                             
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
                              onPress={() => setPage("email")}
                            >
                              <Image
                                source={require("@assets/icons/arrow_left_green.png")}
                              />
                            </TouchableOpacity>

                            
                          </View>
                        </View>
                      </>
                      ) ;
                      break; 
                  }
                })()}
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Image
                        style={{ bottom: 60, marginBottom: -40 }}
                        source={require("@assets/icons/email-verif.png")}
                      />
                      <LargeP
                        style={{
                          width: 155,
                          fontWeight: "500",
                          textAlign: "center",
                        }}
                      >
                        Email Verifikasi berhasil dikirim
                      </LargeP>
                      <P
                        style={{
                          textAlign: "center",
                          width: 200,
                          marginTop: 10,
                        }}
                      >
                        Tekan tombol verifikasi dan kembali Masuk (login)
                      </P>
                      <TouchableOpacity
                        style={{
                          alignItems: "center",
                          flexDirection: "row",
                          justifyContent: "center",
                          paddingHorizontal: 20,
                          backgroundColor: Colors.primary,
                          paddingVertical: 21,
                          borderRadius: 30,
                          top: 60,
                          marginTop: -40,
                        }}
                        onPress={() => console.log()}
                      >
                        <P
                          style={{
                            fontWeight: "600",
                            color: Colors.white,
                            paddingRight: 5,
                          }}
                        >
                          Masuk
                        </P>
                        <Image
                          source={require("@assets/icons/arrow_right.png")}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
            </ScrollView>
          </>
        )}
      </Formik>
    </>
  );
}
