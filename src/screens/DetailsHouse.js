import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import Colors from '../constants/Colors';

// const InteriorList = ({ item, index }) => {
//   console.log('interior: ', item);
//   console.log('Image: ', item.interior[index].image);
//   return (
//     <View>
//       {/* <Image
//         source={item.interior[index].image}
//         style={{ width: 150, height: 150, resizeMode: 'cover', borderRadius: 15 }} /> */}
//         <Text>abc</Text>
//     </View>
//   )
// }

const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = useState(visible)
  useEffect(() => {
    toggleModal()
  }, [visible])
  const toggleModal = () => {
    if (visible) {
      setShowModal(true)
    } else {
      setShowModal(false)
    }
  }
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackImage}>
        <View style={styles.modalContainer}>{children}</View>
      </View>
    </Modal>
  )
}



const DetailsHouse = ({ route }) => {
  const navigation = useNavigation();
  const { ImageHouse, Title, Address, Bed, Bath, Itema, Price } = route.params;
  const onPressHandle = () => {
    navigation.goBack();
  }
  const [visible, setVisible] = useState(false)

  const renderItemInterior = (item, index) => {
    console.log(item.image);
    return (
      <View style={styles.interior}>
        <ModalPoup visible={visible}>
          <View style={styles.modalpoup}>
            <Image source={item.image} style={styles.imageModal} resizeMode='center' />
          </View>
          <View style={styles.iconClose}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Icon name='close' size={35} color='white' />
            </TouchableOpacity>
          </View>
        </ModalPoup>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Image
            source={item.image}
            style={styles.imageInterior}
          />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Image source={ImageHouse} style={styles.image} resizeMode='cover' />
        <TouchableOpacity style={styles.icon} onPress={onPressHandle} activeOpacity={0.5}>
          <Icon name='angle-left' size={20} style={{ fontWeight: '900' }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconHeart} activeOpacity={0.5}>
          <Icon name='heart' size={20} color='red' />
        </TouchableOpacity>
        <View style={styles.virtual}>
          <Text style={{ color: 'white', fontSize: 16 }}>Virtual tour</Text>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 25, fontWeight: '600' }}>{Title}</Text>
          <View style={{
            width: 40,
            height: 30,
            marginLeft: 20,
            backgroundColor: '#718cd6',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            marginTop: 5
          }}>
            <Text style={{ color: 'white', fontSize: 15 }}>4.8</Text>
          </View>
          <Text style={{ fontSize: 18, marginTop: 7, marginLeft: 3 }}>155 ratings</Text>
        </View>
        <Text style={{ marginTop: 20, fontSize: 18, color: '#c3c8ca' }}>{Address}</Text>
        <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
          <Icon name="bed" size={15} />
          <Text style={{ marginLeft: 10 }}>{Bed} Beds</Text>
          <Icon name="bath" size={15} style={{ marginLeft: 10 }} />
          <Text style={{ marginLeft: 10 }}>{Bath} Baths</Text>
          <Icon name="clone" size={15} style={{ marginLeft: 10 }} />
          <Text style={{ marginLeft: 10 }}>100m area</Text>
        </View>
        <View style={{ marginTop: 15 }}>
          <Text style={{ fontSize: 18, color: '#c3c8ca' }}>This building is located in the Oliver area, within walking distance of shops...</Text>
        </View>
        <View>
          <FlatList
            data={Itema.item.interior}
            horizontal
            keyExtractor={item => item.key}
            // renderItem={({ item, index }) => (<InteriorList item={item} index={index} />)} />
            renderItem={({ item, index }) => renderItemInterior(item, index)} />
        </View>
        <View style={styles.boxPrice}>
          <View style={[styles.flex1, styles.boxTotal]}>
            <Text style={styles.textPrice}>${Price}</Text>
            <Text style={styles.total}>Total Price</Text>
          </View>
          <View style={[styles.flex1, styles.boxBook]}>
            <Text style={styles.total}>Book Now</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default DetailsHouse

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white'
  },
  flex1: {
    flex: 1
  },
  mt10: {
    marginTop: 10
  },
  image: {
    width: 350,
    height: 370,
    borderRadius: 30
  },
  icon: {
    position: 'absolute',
    top: 25,
    left: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10
  },
  iconHeart: {
    position: 'absolute',
    top: 25,
    right: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10
  },
  virtual: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 50,
    backgroundColor: 'black',
    position: 'absolute',
    borderRadius: 40,
    bottom: 5,
    left: 110
  },
  interior: {
    marginTop: 20,
    justifyContent: 'space-between',
    width: 115
  },
  imageInterior: {
    width: 100,
    height: 90,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  modalBackImage: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  modalpoup: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageModal: {
    width: 300,
    height: 300,
  },
  iconClose: {
    position: 'absolute',
    top: 40,
    right: 20
  },
  textPrice: {
    color: Colors.BLUE,
    fontSize: 25
  },
  total: {
    fontSize: 25,
    color: Colors.WHITE
  },
  boxPrice: {
    width: 340,
    height: 80,
    flexDirection: 'row',
    backgroundColor: Colors.GRAY,
    borderRadius: 15,
    padding: 15,
    marginTop: 20
  },
  boxTotal: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  boxBook: {
    // flex: 1,
    // margin: 5,
    backgroundColor: Colors.BLACK_BACKGROUDL,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30
  }
})