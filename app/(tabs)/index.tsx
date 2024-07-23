import React from 'react'
import { Text, View, ScrollView, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Octicons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import Colors from "@constants/Colors"
import {Header, HeaderWhite} from '@components/Header';
import { H1, SmallP, P} from '@components/Text';
import { MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';


const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
});

const carousel = [
  require('@assets/carousel/carousel-1.png'),
  require('@assets/carousel/carousel-2.png')
]

const thrifting = [
  {
    image:'https://images.tokopedia.net/img/cache/300-square/VqbcmM/2023/5/2/c85e4e4c-15f9-49b3-8689-42da7a5901b0.jpg',
    title:'Nike Hoddie',
    price:320000
  },
  {
    image:'https://images.tokopedia.net/img/cache/300-square/VqbcmM/2023/5/2/c85e4e4c-15f9-49b3-8689-42da7a5901b0.jpg',
    title:'Seragam SMA',
    price:320000
  },
  {
    image:'https://images.tokopedia.net/img/cache/300-square/VqbcmM/2023/5/2/c85e4e4c-15f9-49b3-8689-42da7a5901b0.jpg',
    title:'Baju Anak Kecil Lucu',
    price:320000
  },
  {
    image:'https://images.tokopedia.net/img/cache/300-square/VqbcmM/2023/5/2/c85e4e4c-15f9-49b3-8689-42da7a5901b0.jpg',
    title:'Outer perempuan',
    price:320000
  }
]

const upcyle = [
  {
    image:'https://images.tokopedia.net/img/cache/300-square/VqbcmM/2023/5/2/c85e4e4c-15f9-49b3-8689-42da7a5901b0.jpg',
    title:'Tas Laptop 15" - PlasticPay',
    price:320000
  },
  {
    image:'https://images.tokopedia.net/img/cache/300-square/VqbcmM/2023/5/2/c85e4e4c-15f9-49b3-8689-42da7a5901b0.jpg',
    title:'Bucket Hat - dbelel',
    price:320000
  },
  {
    image:'https://images.tokopedia.net/img/cache/300-square/VqbcmM/2023/5/2/c85e4e4c-15f9-49b3-8689-42da7a5901b0.jpg',
    title:'Loly Backpack -dbelel',
    price:320000
  },
  {
    image:'https://images.tokopedia.net/img/cache/300-square/VqbcmM/2023/5/2/c85e4e4c-15f9-49b3-8689-42da7a5901b0.jpg',
    title:'Wine Bag - PlasticPay',
    price:320000
  }
]

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
        }}>321.000
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
          003
        </H1>
      </LinearGradient>
    </View>
  );
}

function Location() {
  return (
    <LinearGradient 
      colors={["#1BAE80","#0B7156"]}
      style={{
        backgroundColor:"#FFCD29",
        borderRadius:15,
        marginTop:20,
      }}>

      <View style={{
      backgroundColor:"#FFCD29",
      borderTopEndRadius:15,
      borderTopStartRadius:15,
      padding:10,
      paddingTop:13,
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center"
    }}>
      <View style={{
        display:"flex",
        flexDirection:"row",
      }}>
      <Octicons style={{paddingHorizontal:7}} name="location" size={30} color="#0B7156" />
        <View>
          <P style={{
          fontFamily:"PlusJakartaSans_600SemiBold",
          color:"#0B7156",
          fontSize:10,
        }}>Lokasimu Saat ini</P>
          <P style={{
          fontFamily:"PlusJakartaSans_600SemiBold",
          color:"#0B7156",
          fontSize:13
        }}>Jalan Danau Ranau, Sawojajar</P>
        </View>
      </View>
        <TouchableOpacity
        onPress={() => router.push("/components/locationList")} 
        style={{
          backgroundColor:"white",
          paddingVertical:6,
          paddingHorizontal:20,
          borderRadius:35
        }}> 
          <P
          style={{
            fontWeight:"bold",
            fontSize:12,
            color:"#0B7156"
          }}>More info</P>
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{paddingLeft:20,
        marginVertical:13
        }}>
          <View 
          style={{
            display:"flex",
            flexDirection:"row",
            backgroundColor:"white",
            borderRadius:5,
            padding:10,
            marginRight:15
          }}>
             <Image 
                source={require("./../../assets/logo/logo-r.png")}
                style={{height:50, width:50, marginRight:10, resizeMode:"contain"}}
              />
            <View>
              <P style={{
                fontSize:18,
              }}>Apartement Suhat</P>
              <P style={{fontSize:13}}>1.5km away from you</P>
            </View>
            
          </View>
          <View 
          style={{
            display:"flex",
            flexDirection:"row",
            backgroundColor:"white",
            borderRadius:5,
            padding:10,
            marginRight:15
          }}>
             <Image 
                source={require("./../../assets/logo/logo-r.png")}
                style={{height:50, width:50, marginRight:10, resizeMode:"contain"}}
              />
            <View>
              <P style={{
                fontSize:18,
              }}>Apartement Suhat</P>
              <P style={{fontSize:13}}>1.5km away from you</P>
            </View>
            
          </View>
          <View 
          style={{
            display:"flex",
            flexDirection:"row",
            backgroundColor:"white",
            borderRadius:5,
            padding:10,
            marginRight:15
          }}>
             <Image 
                source={require("./../../assets/logo/logo-r.png")}
                style={{height:50, width:50, marginRight:10, resizeMode:"contain"}}
              />
            <View>
              <P style={{
                fontSize:18,
              }}>Apartement Suhat</P>
              <P style={{fontSize:13}}>1.5km away from you</P>
            </View>
            
          </View>
          <View 
          style={{
            display:'flex',
            flexDirection:'row',
            backgroundColor:'white',
            borderRadius:5,
            padding:10,
            marginRight:15
          }}>
             <Image 
                source={require('@assets/logo/logo-r.png')}
                style={{height:50, width:50, marginRight:10, resizeMode:'contain'}}
              />
            <View>
              <P style={{
                fontSize:18,
              }}>Apartement Suhat</P>
              <P style={{fontSize:13}}>1.5km away from you</P>
            </View>
            
          </View>
          
        </ScrollView>
        <View style={{
          alignItems:'center',
          display:'flex',
          paddingBottom:25,
        }}>
        <MapView
          style={{
            width:340,
            height:180  ,
          }}
        />
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
            thrifting.map((product,index) => (
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
        upcyle.map((product,index) => (
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
          <Location />
        </View>
          <ShopThrifting/>
          <ShopUpcyle />
      </ScrollView>
    </>
  )
}

