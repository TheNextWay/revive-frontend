import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Octicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import Colors from "@constants/Colors"
import {Header, HeaderWhite} from '@components/Header';
import { H1, SmallP, P} from '@components/Text';
import { MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import * as Location from 'expo-location';
import axios from 'axios';
import { carousel, locations, marketplace } from "@app/components/data";
import haversine from 'haversine'; 

const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
});


function Carousel() {
  return (
    
    <View style={{ height:200, width:450}}>
      <ScrollView 
      pagingEnabled 
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{height:200, width:450}}
      >
      {
        carousel.map((item, index) => (
            <Image 
            key={index}
            source={item}
            style={{height:139,borderRadius:9, width:360,marginLeft:13, resizeMode:'contain',}}
          />
          ))
      }
      
    </ScrollView>
    </View>
  );
}

function Point() {
  return (
    <View style={{
      display:"flex" ,
      flexDirection:'row',
      alignItems:'center',
      paddingHorizontal:5
    }}>
      <View style={{
        width:'50%',
      }}>
        <H1 style={{
          color:"#1BAE80",
          fontSize:15,
          fontFamily:"PlusJakartaSans_600SemiBold",
        }}>
          Revive Point
        </H1>
        <H1 style={{
          fontSize:40,
          fontFamily:'PlusJakartaSans_700Bold',
          color:Colors.primary,
          paddingTop:2
        }}>15.000
        </H1>
      </View>
      <LinearGradient 
      colors={["#1BAE80","#0B7156"]}
      // angle={45}
      style={{
        width:"50%",
        paddingHorizontal:15,
        paddingTop:8,
        paddingBottom:5,
        backgroundColor:"#1BAE80",
        borderRadius:8,
        
      }}>
        <H1 style={{
          color:"white",
          fontSize:15,
          fontFamily:"PlusJakartaSans_500Medium",
          
        }}>
          Pakaian Terkumpul
        </H1>
        <H1 style={{
          fontSize:40,
          fontFamily:'PlusJakartaSans_700Bold',
          color:"white",
        }}>
          3
        </H1>
      </LinearGradient>
    </View>
  );
}

function LocationSection() {

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number; }>({ latitude: 0, longitude: 0 });
  const [address, setAddress] = useState('Fetching address...');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        const userLocation = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setUserLocation(userLocation);
        // Menggunakan Nominatim untuk reverse geocoding
        const { latitude, longitude } = location.coords;
        // setUserLocation(location.coords.altitude);
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );

        if (response.data && response.data.display_name) {
          setAddress(response.data.display_name);
        } else {
          setAddress('Address not found');
        }
      } catch (error) {
        setErrorMsg('Something went wrong while fetching location');
      }
    })();
  }, []); 
  const initialRegion = {
    latitude: -7.966620,
    longitude: 112.632632,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };
  

  return (
    <LinearGradient
      colors={["#1BAE80", "#0B7156"]}
      style={{
        backgroundColor: "#FFCD29",
        borderRadius: 15,
        marginTop: 20,
      }}
    >
      <View
        style={{
          backgroundColor: "#FFCD29",
          borderTopEndRadius: 15,
          borderTopStartRadius: 15,
          padding: 10,
          paddingTop: 13,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Octicons
            style={{ paddingHorizontal: 7 }}
            name="location"
            size={30}
            color="#0B7156"
          />
          <View>
            <P
              style={{
                fontFamily: "PlusJakartaSans_600SemiBold",
                color: "#0B7156",
                fontSize: 10,
              }}
            >
              Lokasimu Saat ini
            </P>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: "PlusJakartaSans_600SemiBold",
                color: "#0B7156",
                fontSize: 13,
                width: 230,
              }}
            >
              {address}{" "}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => router.push("/components/locationList")}
          style={{
            backgroundColor: "white",
            paddingVertical: 6,
            paddingHorizontal: 20,
            borderRadius: 35,
          }}
        >
          <P
            style={{
              fontWeight: "bold",
              fontSize: 12,
              color: "#0B7156",
            }}
          >
            More info
          </P>
        </TouchableOpacity>
      </View>

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingLeft: 20, marginVertical: 13 }}
        >
          {locations
  .sort((a, b) => {
    const distanceA = userLocation ? haversine(userLocation, {
      latitude: a.coordinates.latitude,
      longitude: a.coordinates.longitude,
    }, { unit: "km" }) : 0;

    const distanceB = haversine(userLocation, {
      latitude: b.coordinates.latitude,
      longitude: b.coordinates.longitude,
    }, { unit: "km" });

    return distanceA - distanceB; // Ascending order
  })
  .map((item, index) => (
    <View
      key={index}
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "white",
        borderRadius: 5,
        padding: 10,
        marginRight: 15,
      }}
    >
      <Image
        source={require("@assets/logo/logo-r.png")}
        style={{
          height: 50,
          width: 50,
          marginRight: 10,
          resizeMode: "contain",
        }}
      />
      <View>
        <P
          style={{
            fontSize: 18,
          }}
        >
          {item.title}
        </P>
        <Text style={{ fontSize: 13 }}>
          {userLocation &&
            haversine(
              userLocation,
              {
                latitude: item.coordinates.latitude,
                longitude: item.coordinates.longitude,
              },
              { unit: "km" }
            ).toFixed(1)}{" "}
          KM Away from you
        </Text>
      </View>
    </View>
  ))}

        </ScrollView>
        <View
          style={{
            alignItems: "center",
            display: "flex",
            paddingBottom: 25,
          }}
        >
          <MapView
            style={{
              width: 340,
              height: 180,
            }}
            initialRegion={ initialRegion}
          >
            {locations.map((item, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: item.coordinates.latitude,
                  longitude: item.coordinates.longitude,
                }}
                title={item.title}
                description={item.details}
              />
            ))}
          </MapView>
        </View>
      </View>
    </LinearGradient>
  );
}

function ShopThrifting() {
    return (
    <LinearGradient 
      colors={['#1BAE80','#0B7156']}
      style={{
        marginTop:30,
        paddingVertical:10
      }}>
        <View style={{
          display:'flex',
          flexDirection:'row',
          justifyContent:'space-between',
          alignItems:'center',
          paddingHorizontal:25,
          paddingTop:10
        }}>
          <P style={{
            fontSize:25,
            fontWeight:'bold',
            color:'white'
          }}>Thrifting</P>
          <P style={{
            color:'white'
          }}>See all</P>
        </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginTop:8,
          padding:10,
          paddingHorizontal:30
        }}>
          {
            marketplace.recommendations.map((product,index) => (
              <View key={index} style={{marginHorizontal:8}}>
                 <Image 
                    source={{uri: product.image}}
                    style={{height:110, width:110, borderRadius:5, resizeMode:'contain'}}
                  />
                <View style={{marginTop:10}}>
                  <Text numberOfLines={1} style={{fontSize:12,color:'white',width:110 }}>{product.title}</Text>
                  <P style={{
                    fontSize:16,
                    fontWeight:'bold',
                    color:'white'
                  }}>{formatter.format(product.price)}</P>
                </View>
              </View>
            ))
          }
        </ScrollView>
    </LinearGradient>
  )
}

function ShopUpcyle() {
  return (
  <View 
    style={{
      marginTop:30,
    }}>
      <View style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:25,
        paddingTop:10
      }}>
        <P style={{
          fontSize:20,
          fontWeight:'bold',
          color:'#0B7156'
        }}>Upcycle & Recycle Products</P>
        <P style={{
          color:'#0B7156'
        }}>See all</P>
      </View>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{
        marginTop:8,
        padding:10,
        paddingLeft:30
      }}>
      {
        marketplace.upcycle.map((product,index) => (
          <View key={index} style={{marginHorizontal:8}}>
            <Image 
                source={{uri: product.image}}
                style={{height:110, width:110, borderRadius:5, resizeMode:'contain'}}
              />
            <View style={{marginTop:10}}>
              <Text numberOfLines={1} style={{fontSize:12,color:'#0B7156',width:110 }}>{product.title}</Text>
              <P style={{
                fontSize:19,
                fontWeight:'bold',
                color:'#0B7156'
              }}>{formatter.format(product.price)}</P>
            </View>
          </View>
        ))
      }
      </ScrollView>
  </View>
)
}

function LocationsList() {
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
      </ LinearGradient>
    </>
  )
}
export default function index() {
  return (
    <>
      <ScrollView>
        <LinearGradient style={{borderRadius:20, bottom:90, marginBottom:5}} colors={["#1BAE80","#0B7156",]}>
            <View style={{top:100}}>
                <HeaderWhite  /> 
              <View style={{paddingTop:20}}>
              <Carousel />
              </View>
            </View>
        </LinearGradient>
        <View style={{
          marginHorizontal:15,
          marginTop:-30
        }}>
          <Point />
          <View style={{backgroundColor:Colors.white, borderRadius:12, marginTop:12, padding:13,justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <MaterialIcons
                  name="currency-exchange"
                  size={25}
                  color={Colors.primary}
                />
              <SmallP style={{marginLeft:10, fontWeight: "600"}}>Tukar Poinmu disini!!</SmallP>
            </View>
            <MaterialIcons
                  name="chevron-right"
                  size={25}
                  color={Colors.primary}
                />
          </View>
          <LocationSection />
        </View>
          <ShopThrifting/>
          <ShopUpcyle />
      </ScrollView>
    </>
  )
}

