import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import locationAPI from "../../apis/LocationsAPI";
import DropDownPicker from "react-native-dropdown-picker";

const Location = ({ navigation }) => {
  const [location, setLocation] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  // const [items, setItems] = useState(location)

  // useEffect(() => {
  //   getLocationAPI();
  // }, []);

  // function getLocationAPI() {
  //   locationAPI
  //     .get("countries")
  //     .then(function (response) {
  //       const country = Object.values(response.data.data);
  //       const data = country.map((item) => {
  //         return {
  //           country: item.country,
  //         };
  //       });
  //       console.log(data);
  //       setLocation(data);
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //     });
  // }
  function getLocationAPI() {
    locationAPI
      .get("countries")
      .then(function (response) {
        const country = Object.values(response.data.data);
        const data = country.map((item) => {
          return {
            label: item.country,
            value: item.country,
          };
        });
        const values = country.map((item) => item.country);
        setValue(values);
        setLocation(data);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  useEffect(() => {
    getLocationAPI();
  }, []);
  if (!location) {
    return null;
  }

  return (
    <View style={{ flex: 4}}>
      <Text style={styles.text}>Location</Text>
      <DropDownPicker
        placeholder="Country"
        open={open}
        value={value}
        items={location}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setLocation}
        maxHeight={100}
        disableBorderRadius={true}
        placeholderStyle={{fontWeight: 'bold', fontSize: 16}}
        style={{borderColor: '#fff'}}
        showTickIcon={false}
        autoScroll={true}
        labelStyle={{fontWeight: 'bold', fontSize: 16}}
        theme="LIGHT"
        listParentContainerStyle={{
          marginLeft: 5
        }}
      />
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  text: {
    fontWeight: '200',
    fontSize: 12,
    color: '##c3c8ca'
  }
});
