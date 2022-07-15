import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import ProductScreen from "./src/screens/ProductScreen";
import CountriesScreen from "./src/screens/CountriesScreen";
import DetailsHouse from "./src/screens/DetailsHouse";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer initialRouteName="Product">
      <Stack.Navigator>
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Country"
          component={CountriesScreen}
          options={({ route }) => ({
            title: route.params.name,
            headerTitleStyle: { fontSize: 'bold' }
          })}
        />
        <Stack.Screen
          name="Details"
          component={DetailsHouse}
          options={{ headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
