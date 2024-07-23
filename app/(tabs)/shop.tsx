import React from 'react'
import { Text,  View, ScrollView, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Octicons } from '@expo/vector-icons';
import MapView from 'react-native-maps';
import Colors from "@constants/Colors"
import {Header, HeaderWhite} from '@components/Header';
import { SmallP } from '@components/Text';
import { MaterialIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import TabBar from '@/components/TabBar';


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
        <Text style={{
          color:"#1BAE80",
          fontSize:15,
          fontFamily:"PlusJakartaSans_600SemiBold",
        }}>
          Revive Point
        </Text>
        <Text style={{
          fontSize:40,
          fontFamily:"PlusJakartaSans_600SemiBold",
          color:Colors.primary,
          paddingTop:2
        }}>500.000
        </Text>
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
        <Text style={{
          color:"white",
          fontSize:15,
          fontFamily:"PlusJakartaSans_500Medium",
          
        }}>
          Pakaian Terkumpul
        </Text>
        <Text style={{
          fontSize:40,
          fontFamily:"PlusJakartaSans_600SemiBold",
          color:"white",
        }}>
          003
        </Text>
      </LinearGradient>
    </View>
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
          <Text style={{
            fontSize:25,
            fontWeight:'bold',
            color:'white'
          }}>Thrifting</Text>
          <Text style={{
            color:'white'
          }}>See all</Text>
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
                  <Text style={{
                    fontSize:16,
                    fontWeight:'bold',
                    color:'white'
                  }}>{formatter.format(product.price)}</Text>
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
        <Text style={{
          fontSize:20,
          fontWeight:'bold',
          color:'#0B7156'
        }}>Upcycle & Recycle Products</Text>
        <Text style={{
          color:'#0B7156'
        }}>See all</Text>
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
              <Text style={{
                fontSize:19,
                fontWeight:'bold',
                color:'#0B7156'
              }}>{formatter.format(product.price)}</Text>
            </View>
          </View>
        ))
      }
      </ScrollView>
  </View>
)
}


export default function shop() {
  return (
    <>
      <ScrollView>
        <Header />
          <ShopUpcyle />
          <ShopThrifting/>
          <ShopUpcyle />
      </ScrollView>
    </>
  )
}

