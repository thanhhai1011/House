import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import Location from "../components/Product/Location";
import Avatar from "../components/Product/Avatar";
import Search from "../components/Product/Search";

const ProductScreen = ({ navigation }) => {
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.location}>
          <Location />
          <Avatar />
        </View>
        <View style={{marginTop: 20, flex: 8}}>
          <Search />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
  },
  location: {
    flexDirection: 'row',
    flex: 1,
  }
});
