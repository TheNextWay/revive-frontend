import { View, Pressable, Linking } from 'react-native'
import React from 'react'
import Svg, { Path } from "react-native-svg"
import { MaterialIcons } from '@expo/vector-icons';


export default function Header() {
  return (
    <View 
      style={{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems: 'center',
        width:'100%',
        marginTop:30,
        paddingHorizontal:20,
        height:70
      }}
    >
      <View>
      <Svg width="140" height="41" viewBox="0 0 140 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M0 5C0 2.23858 2.23858 0 5 0H134.155C136.916 0 139.155 2.23858 139.155 5V35.4651C139.155 38.2265 136.916 40.4651 134.155 40.4651H5C2.23857 40.4651 0 38.2265 0 35.4651V5Z" fill="#1BAE80"/>
        <Path d="M27 30.1407V10H34.8355C36.2687 10 37.5321 10.2523 38.6259 10.757C39.7385 11.2436 40.606 11.9645 41.2283 12.9197C41.8506 13.8569 42.1617 15.0014 42.1617 16.3531C42.1617 17.7409 41.8129 18.9214 41.1151 19.8946C40.4363 20.8679 39.5122 21.5888 38.343 22.0574L42.6997 30.1407L30.847 22.7062V30.1407H27ZM30.847 19.4621L27 20.219L27 21.6799C27.6977 21.6799 36.1932 19.3359 36.7024 19.0836C37.2116 18.8132 37.6076 18.4438 37.8904 17.9752C38.1733 17.5066 38.3147 16.9659 38.3147 16.3531C38.3147 15.7223 38.1733 15.1816 37.8904 14.731C37.6076 14.2624 37.2116 13.902 36.7024 13.6497C36.1932 13.3793 35.5898 13.2441 34.892 13.2441H30.847V19.4621ZM51.2661 30.4651C49.682 30.4651 48.296 30.1227 47.1079 29.4378C45.9199 28.7529 44.9959 27.8247 44.3359 26.6533C43.6758 25.4818 43.3458 24.1841 43.3458 22.7603C43.3458 21.2824 43.6758 19.9757 44.3359 18.8403C45.0147 17.6868 45.9293 16.7766 47.0796 16.1098C48.2488 15.4429 49.55 15.1095 50.9832 15.1095C52.1901 15.1095 53.2462 15.2988 54.1514 15.6772C55.0754 16.0557 55.858 16.5784 56.4992 17.2452C57.1403 17.9121 57.6306 18.6781 57.9701 19.5432C58.3095 20.3903 58.4792 21.3094 58.4792 22.3007C58.4792 22.553 58.4604 22.8144 58.4227 23.0847C58.4038 23.355 58.3567 23.5893 58.2812 23.7876H46.4008L45.5283 22.9316L45.6774 22.3548H54.4342C54.6039 21.5257 54.5568 20.7868 54.2928 20.1379C54.2928 20.1379 53.6328 18.9755 53.0482 18.597C52.4824 18.2185 51.7941 18.0292 50.9832 18.0292C50.2101 18.0292 49.5217 18.2185 48.9183 18.597C48.3148 18.9574 47.8528 19.4981 47.5322 20.219C47.2305 20.9219 47.1174 21.778 47.1928 22.7873C47.1174 23.6885 47.2399 24.4905 47.5605 25.1934C47.9 25.8783 48.3903 26.4099 49.0314 26.7884C49.6915 27.1669 50.4458 27.3561 51.2944 27.3561C52.143 27.3561 52.8596 27.1849 53.4442 26.8425C54.0476 26.5001 54.5191 26.0405 54.8585 25.4637L57.8569 26.8695C57.5552 27.5724 57.0838 28.1942 56.4426 28.7349C55.8014 29.2756 55.0377 29.6991 54.1514 30.0055C53.2839 30.3119 52.3221 30.4651 51.2661 30.4651ZM65.0853 30.1407L59.032 15.4339H63.077L67.4614 27.0047H65.9622L70.375 15.4339H74.42L68.3666 30.1407H65.0853ZM75.9024 30.1407V15.4339H79.608V30.1407H75.9024ZM75.9024 13.7848V10H79.608V13.7848H75.9024ZM87.1027 30.1407L81.0493 15.4339H85.0943L89.4788 27.0047H87.9796L92.3923 15.4339H96.4373L90.3839 30.1407H87.1027ZM104.941 30.4651C103.357 30.4651 101.971 30.1227 100.783 29.4378C99.5953 28.7529 98.6712 27.8247 98.0112 26.6533C97.3512 25.4818 97.0212 24.1841 97.0212 22.7603C97.0212 21.2824 97.3512 19.9757 98.0112 18.8403C98.6901 17.6868 99.6047 16.7766 100.755 16.1098C101.924 15.4429 103.225 15.1095 104.659 15.1095C105.866 15.1095 106.922 15.2988 107.827 15.6772C108.751 16.0557 109.533 16.5784 110.175 17.2452C110.816 17.9121 111.306 18.6781 111.645 19.5432C111.985 20.3903 112.155 21.3094 112.155 22.3007C112.155 22.553 112.136 22.8144 112.098 23.0847C112.079 23.355 112.032 23.5893 111.957 23.7876H100.076V21.0841H109.863L108.11 22.3548C108.279 21.5257 108.232 20.7868 107.968 20.1379C107.723 19.4891 107.308 18.9755 106.724 18.597C106.158 18.2185 105.47 18.0292 104.659 18.0292C103.885 18.0292 103.197 18.2185 102.594 18.597C101.99 18.9574 101.528 19.4981 101.208 20.219C100.906 20.9219 100.793 21.778 100.868 22.7873C100.793 23.6885 100.915 24.4905 101.236 25.1934C101.575 25.8783 102.066 26.4099 102.707 26.7884C103.367 27.1669 104.121 27.3561 104.97 27.3561C105.818 27.3561 106.535 27.1849 107.12 26.8425C107.723 26.5001 108.194 26.0405 108.534 25.4637L111.532 26.8695C111.231 27.5724 110.759 28.1942 110.118 28.7349C109.477 29.2756 108.713 29.6991 107.827 30.0055C106.959 30.3119 105.998 30.4651 104.941 30.4651Z" fill="#F5F5F5"/>
      </Svg>


      </View>
      <View>
        <Pressable onPress={() => Linking.openURL('https://thenextway.tech')}>
          <MaterialIcons  style={{color:'#0B7156'}} name="support-agent" size={30} color="black" />
         </Pressable>
      </View>
    </View>
  )
}