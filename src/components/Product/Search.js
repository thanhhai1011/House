import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import locationAPI from "../../apis/LocationsAPI";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import Tabs from "./Tabs";

const Search = () => {

  const navigation = useNavigation();
  const [filterCountry, setFilterCountry] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(false);
  function FilterLocationAPI() {
    locationAPI
      .get("countries")
      .then(function (response) {
        const country = Object.values(response.data.data);
        setFilterCountry(country);
        setData(country);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  useEffect(() => {
    FilterLocationAPI();
  }, []);
  if (!location) {
    return null;
  }

  const ItemView = ({ item }) => {
    return (<View>
      <TouchableOpacity onPress={() => navigation.navigate('Country', { name: `${item.country}` })}>
        <Text>{item.country.toUpperCase()}</Text>
      </TouchableOpacity>
    </View>);
  };
  const ItemSeparatorComponent = () => {
    return (
      <View
        style={{ height: 0.5, width: "100%", backgroundColor: "#c8c8c8" }}
      ></View>
    );
  };
  const searchFilter = (text) => {
    if (text) {
      const newData = data.filter((item) => {
        const itemData = item.country ? item.country.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      setFilterCountry(newData);
      setSearch(text)
    } else {
      setFilterCountry(data);
      setSearch(text)
    }
  }

  return (
    <View style={{flex: 1}}>
      <View style={{ flexDirection: 'row', flex: 1}}>
        <View style={styles.box}>
          <Icon name="search" size={15} />
          <TextInput
            style={styles.textInput}
            value={search}
            placeholder="Seach address, city, location"
            underlineColorAndroid="transparent"
            onChangeText={(text) => searchFilter(text)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </View>
        <View style={{
          width: 50,
          height: 50,
          backgroundColor: 'black',
          borderRadius: 15,
          marginLeft: 32
        }}></View>
      </View>
      <View style={{flex: 8}}>
        {focus ? (<FlatList
          data={filterCountry}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorComponent}
          renderItem={ItemView}
        />) :
          (<View style={{ marginTop: 20, flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, flex: 3}}>
              <TouchableOpacity style={styles.buy}>
                <Image source={require('../../../images/house4.jpeg')}
                  style={{ width: 120, height: 120, borderRadius: 20, marginBottom: 15 }}
                  resizeMode='cover' />
                <Text style={{ fontWeight: '600' }}>Buy a Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buy}>
                <Image source={require('../../../images/house5.jpg')}
                  style={{ width: 120, height: 120, borderRadius: 20, marginBottom: 15 }}
                  resizeMode='cover' />
                <Text style={{ fontWeight: '600' }}>Rent a Home</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 5}}>
              <Tabs />
            </View>
          </View>)}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  box: {
    width: 250,
    height: 50,
    // backgroundColor: "#f5f5f5",
    borderRadius: 15,
    flexDirection: 'row',
    backgroundColor: '#f6f6f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  textInput: {
    width: 180,
    height: 40,
    marginLeft: 10
  },
  buy: {
    width: 140,
    height: 190,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    shadowRadius: 20,
    borderRadius: 10,
    shadowColor: '#c4c0c0'
  }
});
