import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Avatar = () => {
  return (
    <View style={{ flex:1, marginLeft: 10, marginTop: 3}}>
      <Image style={styles.image} source={require('../../../images/avatar1.jpg')} />
    </View>
  )
}

export default Avatar

const styles = StyleSheet.create({
    image:{
        width: 50,
        height: 50,
        borderRadius: 40
    }
})