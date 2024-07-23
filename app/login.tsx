import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Button, TextInput, Keyboard, Image, ScrollView } from "react-native";
import { Formik } from "formik";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { FormErrorMessage } from "@components/FormErrorMessage";
import { loginValidationSchema } from "@/utils";
import Colors from "@constants/Colors";
import { H1, P } from "@components/Text";
import { router } from "expo-router";

export default function LoginScreen() {
  const [errorState, setErrorState] = useState("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleLogin = (values: { email: string; password: string; }) => {
    console.log("mencoba untuk login");
    signInWithEmailAndPassword(getAuth(), values.email, values.password)
      .then((user) => {
        console.log("berhasil login");
        if (user) router.replace("/(tabs)");
      })
      .catch((err) => {
        setErrorState(err?.message);
      });
  };
  

  return (
    <ScrollView>
      <View style={{ paddingHorizontal: 15, marginTop: 55 }}>
        <H1 style={{ fontWeight: "500", fontSize: 45 }}>Masuk</H1>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ paddingTop: 2 }}>Belum punya akun </Text>
          <TouchableOpacity
            onPress={() => router.push("/register")}
            style={{
              backgroundColor: "#1BAE8033",
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderRadius: 25,
            }}
          >
            <Text style={{ fontSize: 12, color: Colors.primary }}>Daftar</Text>
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
            marginVertical: 10,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: Colors.gray }} />
          <View>
            <Text style={{ width: 50, fontSize: 12, textAlign: "center" }}>
              Atau
            </Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: Colors.gray }} />
        </View>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}
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
              <View style={{ paddingVertical: 10 }}>
                <Text
                  style={{ fontSize: 15, fontWeight: "600", color: "#666666" }}
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
                  value={values.email}
                  inputMode="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  placeholder="email@address.com"
                  autoCapitalize="none"
                />
              <FormErrorMessage error={errors.email} visible={touched.email} />
              </View>
              <View style={{ paddingVertical: 10 }}>
                <Text
                  style={{ fontSize: 15, fontWeight: "600", color: "#666666" }}
                >
                  Kata Sandi
                </Text>
                <TextInput
                  style={{
                    height: 48,
                    borderWidth: 1,
                    borderRadius: 8,
                    borderColor: errors.password ? Colors.red  : Colors.gray ,
                    padding: 16,
                    marginVertical: 4,
                  }}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={true}
                  textContentType="password"
                  autoCapitalize="none"
                  placeholder="******"
                  autoCorrect={false}
                />
              <FormErrorMessage error={errors.password} visible={touched.password} />
              </View>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: isKeyboardVisible ? 5 : 290,
                  }}
                >
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.push("/landing")}
                  >
                    <Image
                      source={require("@assets/icons/arrow_left_green.png")}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.loginButton,
                      {
                        backgroundColor:
                          values.password && values.email
                            ? Colors.primary
                            : Colors.gray,
                      },
                    ]}
                    disabled={!values.password || !values.email}
                    onPress={() => handleSubmit()} // Wrap handleSubmit in an arrow function
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
                    <Image source={require("@assets/icons/arrow_right.png")} />
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  errorText: {
    fontSize: 12,
    fontWeight: "400",
    color: "red",
    paddingLeft: 4,
  },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 25,
    backgroundColor: "#1BAE8033",
    paddingVertical: 25,
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  loginButton: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 21,
    borderRadius: 30,
  },
});
