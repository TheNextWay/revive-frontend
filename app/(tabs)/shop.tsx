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
import { marketplace } from "@app/components/data";


const formatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
});



function ShopThrifting() {
    return (
    <LinearGradient 
      colors={['#1BAE80','#0B7156']}
      style={{
        marginTop:10,
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
            fontSize:20,
            fontWeight:'bold',
            color:'white'
          }}>Produk Recycle</Text>
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
            marketplace.recommendations.map((product,index) => (
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
      marginTop:15,
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
        }}>Rekomendasi Produk</Text>
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
        marketplace.recommendations.map((product,index) => (
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

function ShopSection2() {
  return (
  <View 
    style={{
      marginTop:15,
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
        }}>Produk Upcycle</Text>
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
        marketplace.upcycle.map((product,index) => (
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
          <ShopSection2 />
      </ScrollView>
    </>
  )
}

