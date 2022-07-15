import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import AppIntroSlider from "react-native-app-intro-slider";

const slides = [
  {
    key: "one",
    title: "Title 1",
    image: require("../../images/house1.jpg"),
  },
  {
    key: "two",
    title: "Title 2",
    image: require("../../images/house2.jpg"),
  },
  {
    key: "three",
    title: "Rocket guy",
    image: require("../../images/house3.jpg"),
  },
];

const HomeScreen = ({navigation}) => {
  const [showRealApp, setShowRealApp] = useState(false);


  const onDone = () => {
    setShowRealApp(true);
  };
  const onSkip = () => {
    setShowRealApp(true);
  };
  const renderItem = ({ item }) => {
    return (
      <View style={styles.containerItem}>
        <Image style={styles.image} source={item.image} resizeMode='stretch' />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 3}}>
      <AppIntroSlider
        data={slides}
        renderItem={renderItem}
        onDone={onDone}
        onSkip={onSkip}
        showSkipButton={false}
        showNextButton={false}
        dotStyle={{ backgroundColor: "rgba(210, 210, 210, .9)" }}
        activeDotStyle={{ backgroundColor: "rgba(90, 90, 90, .5)" }}
      />
      </View>
      <View style={styles.footer}>
        <Text style={{ fontWeight: "bold", fontSize: 28 }}>
          Find your {"\n"}sweet home
        </Text>
        <Text style={{ color: "#c3c8ca", marginTop: 10 }}>
          Schedule visits in just a few clicks {"\n"}visits in just a few clicks
        </Text>
        <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={()=>navigation.navigate('Product')}>
            <Text style={{ color: '#fff'}}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingBottom: 70,
  },
  image: {
    width: 280,
    height: 340,
    flex: 1,
    borderBottomLeftRadius: 40,
  },
  footer: {
    paddingHorizontal: 25,
    flex: 2,
  },
  button: {
    width: 230,
    height: 50,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    borderRadius: 15
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
