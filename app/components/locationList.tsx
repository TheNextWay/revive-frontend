import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Image,  FlatList, Text, TouchableOpacity, Linking, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { locations } from "@app/components/data";
import Colors from '@/constants/Colors';
import { MediumP, P, SmallP } from '@/components/Text';
import haversine from 'haversine';
import * as Location from 'expo-location';
import { router } from 'expo-router';

export default function App() {
  const mapRef = useRef<MapView | null>(null); // Reference ke MapView
  const initialRegion = {
    latitude: -7.966620,
    longitude: 112.632632,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number; } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        // Mendapatkan lokasi
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        // Menghitung jarak
        const userLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        };
        setUserLocation(userLocation);
      } catch (error) {
        console.error('Error fetching location or calculating distance:', error);
        setErrorMsg('Something went wrong while fetching location');
      }
    })();
  }, [])

  // Fungsi untuk pindah ke lokasi yang dipilih
  const goToLocation = (location: { id?: number; title?: string; description?: string; coordinates: any; }) => {
    const region = {
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude,
      latitudeDelta: 0.01, // Zoom level yang lebih detail
      longitudeDelta: 0.01,
    };
    
    if (mapRef.current) {
      (mapRef.current as MapView).animateToRegion(region, 1000); // Animasi ke lokasi dalam 1 detik
    }
  };
        
              return (
                <View style={styles.container}>
                  <MapView
                    ref={mapRef} // Refrensi ke MapView
                    style={styles.map}
                    initialRegion={initialRegion}
                  >
                    {locations.map((location) => (
                      <Marker
                        key={location.id}
                        coordinate={location.coordinates}
                        title={location.title}
                        description={location.details}
                      />
                    ))}
                  </MapView>
              
                  <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  paddingHorizontal: 25,
                  backgroundColor: Colors.primary,
                  paddingVertical: 8,
                  borderRadius: 30,
                  width: 150,
                  top: 40, // Sesuaikan dengan jarak dari atas
                  left: 15, // Jarak dari kiri layar
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
                  {/* ScrollView ditempatkan di atas MapView dengan absolute positioning */}
                  <View style={styles.overlayContainer}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {locations.map((location, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() => goToLocation(location)} // Pindah ke lokasi ketika item dipencet
                          style={{ marginLeft: 15 }}
                        >
                          <View
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.9)', // Transparansi background
                              borderRadius: 8,
                              shadowOffset: { width: 0, height: -3 },
                              paddingHorizontal: 18,
                              paddingVertical: 18,
                              marginTop: 15,
                              height: 150,

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
                                  {userLocation &&
                                    haversine(
                                      userLocation,
                                      {
                                        latitude: location.coordinates.latitude,
                                        longitude: location.coordinates.longitude,
                                      },
                                      { unit: "km" }
                                    ).toFixed(1)}{" "}
                                  KM
                                </SmallP>
                              </View>
                              <TouchableOpacity
                                onPress={() => Linking.openURL(location.maps_url)}
                                style={{ flexDirection: "row", alignItems: "center" }}
                              >
                                <SmallP
                                  style={{
                                    color: Colors.primary,
                                    textDecorationLine: "underline",
                                    fontWeight: "500",
                                  }}
                                >
                                  Buka di Google maps
                                </SmallP>
                                <Image
                                  style={{ width: 20 }}
                                  source={require("@assets/icons/distance.png")}
                                />
                              </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 15 }}>
                              <MediumP style={{ fontWeight: "600" }}>
                                {location.title}
                              </MediumP>
                              <SmallP style={{ fontWeight: "600" }}>
                                {location.details}
                              </SmallP>
                              <Text
                                numberOfLines={2}
                                style={{
                                  fontFamily: "PlusJakartaSans_400Regular",
                                  fontSize: 12,
                                  fontWeight: "600",
                                  color: Colors.gray,
                                  width: 250,
                                }}
                              >
                                {location.address}
                              </Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                </View>
              );
              
              
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  listItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  listDescription: {
    fontSize: 12,
    color: '#666',
  },
});
