import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    FlatList,
    Animated,
    Image,
    findNodeHandle,
    TouchableOpacity
} from "react-native";
import React, { createRef, forwardRef, useCallback, useEffect, useRef, useState } from "react";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import Colors from "../../constants/Colors";

const { width, height } = Dimensions.get('screen')

const data = [
    {
        id: 1,
        image: require("../../../images/house6.jpg"),
        title: "Central Edmon",
        addRess: "118 Street, West Edmonton, Alberta",
        bedroom: 2,
        bathroom: 2,
        category: "Popular",
        price: '15,00,00',
        ref: createRef(),
        interior: [
            {
                key: 1,
                image: require("../../../images/interior1.jpg")
            },
            {
                key: 2,
                image: require("../../../images/interior2.jpg")
            },
            {
                key: 3,
                image: require("../../../images/interior3.jpg")
            }
        ]
    },
    {
        id: 2,
        image: require("../../../images/house7.jpg"),
        title: "Central Weston",
        addRess: "252 Street, West Edmonton, New York",
        bedroom: 3,
        bathroom: 2,
        category: "Recommended",
        price: '13,00,00',
        ref: createRef(),
        interior: [
            {
                key: 4,
                image: require("../../../images/interior4.jpg")
            },
            {
                key: 5,
                image: require("../../../images/interior5.jpg")
            },
            {
                key: 6,
                image: require("../../../images/interior6.jpg")
            }
        ]
    },
    {
        id: 3,
        image: require("../../../images/house8.jpg"),
        title: "Central California",
        addRess: "454 Street, West Edmonton, California",
        bedroom: 2,
        bathroom: 3,
        category: "Nearest",
        price: '14,00,00',
        ref: createRef(),
        interior: [
            {
                key: 7,
                image: require("../../../images/interior7.jpg")
            },
            {
                key: 8,
                image: require("../../../images/interior8.jpg")
            },
            {
                key: 9,
                image: require("../../../images/interior9.jpg")
            }
        ]
    },
];

const Tab = forwardRef(({ item, onItemPress }, ref) => {
    return (
        <TouchableOpacity onPress={onItemPress}>
            <View ref={ref}>
                <Text style={{ fontWeight: '600', fontSize: 20 }}>{item.category}</Text>
            </View>
        </TouchableOpacity>
    )
})

const Indicator = ({ measures, scrollX }) => {
    const inputRange = data.map((_, i) => i * width);
    const indicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange: measures.map((measure) => measure.width)
    });
    const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measures.map((measure) => measure.x)
    })
    return (
        <Animated.View style={{
            position: 'absolute',
            height: 5,
            width: indicatorWidth,
            backgroundColor: '#aaaaaa',
            bottom: -10,
            left: 0,
            transform: [{
                translateX
            }]
        }}
        />
    )
}

const TabView = ({ scrollX, data, onItemPress }) => {
    const [measures, setMeasures] = useState([])
    const containerRef = useRef()
    useEffect(() => {
        const m = []
        data.forEach(item => {
            item.ref.current.measureLayout(
                containerRef.current,
                (x, y, width, height) => {
                    m.push({
                        x, y, width, height
                    });
                    if (m.length === data.length) {
                        setMeasures(m)
                    }
                })
        })
    }, [])

    return (
        <View style={{ position: 'absolute', top: 5, width, right: -20 }}>
            <View ref={containerRef} style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                {data.map((item, index) => {
                    return <Tab key={item.id} item={item} ref={item.ref} onItemPress={() => onItemPress(index)} />
                })}
            </View>
            {measures.length > 0 && <Indicator measures={measures} scrollX={scrollX} />}
        </View>
    )
}


// const HouseList = ({ item, onPress, index }) => {
//     // console.log('data: ', item.interior);
//     // console.log('interior: ', item.interior[0]);
//     return (
//         <TouchableOpacity style={{ width, height, marginTop: 50 }} onPress={onPress} activeOpacity={0.6}>
//             <View style={styles.houseList}>
//                 <Image
//                     source={item.image}
//                     style={{ width: '100%', height: 150, resizeMode: 'cover', borderRadius: 15 }}
//                 />
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, alignItems: 'flex-end' }}>
//                     <Text style={styles.titleHouseList}>{item.title}</Text>
//                     <Text style={[styles.titleHouseList, styles.textGreen]}>${item.price}</Text>
//                 </View>
//                 <Text style={{ marginTop: 10, fontWeight: '200' }}>{item.addRess}</Text>
//                 <View style={{ flexDirection: 'row', marginTop: 10 }}>
//                     <Icon name="bed" size={15} />
//                     <Text style={{ marginLeft: 10 }}>{item.bedroom}</Text>
//                     <Icon name="bath" size={15} style={{ marginLeft: 10 }} />
//                     <Text style={{ marginLeft: 10 }}>{item.bathroom}</Text>
//                     <Icon name="clone" size={15} style={{ marginLeft: 10 }} />
//                     <Text style={{ marginLeft: 10 }}>100m</Text>
//                 </View>
//             </View>
//         </TouchableOpacity>
//     )
// }
// const NewList = ({ item, index }) => {
//     console.log('interior: ', item.interior[index].image);
//     return (
//         <View>
//             <Image
//                 source={item.interior[index].image}
//                 style={{ width: 150, height: 150, resizeMode: 'cover', borderRadius: 15 }} />
//         </View>
//     )
// }

const Tabs = () => {
    const navigation = useNavigation();
    const scrollX = useRef(new Animated.Value(0)).current;
    const ref = useRef();
    const onItemPress = useCallback((itemIndex) => {
        ref?.current?.scrollToOffset({
            offset: itemIndex * width,
        })
    })
    // const handleSubmit = (item, index) => {
    //     navigation.navigate('Details', {
    //         ImageHouse: `${item.image}`,
    //         Title: `${item.title}`,
    //         Address: `${item.addRess}`,
    //         Bed: `${item.bedroom}`,
    //         Bath: `${item.bathroom}`,
    //         ImageInterior: `${item.interior}`,
    //         Itema: { item }
    //     });
    // }
    const renderItemHouse = (item) => {
        const onPress = () => {
            navigation.navigate('Details', {
                ImageHouse: `${item.image}`,
                Title: `${item.title}`,
                Address: `${item.addRess}`,
                Bed: `${item.bedroom}`,
                Bath: `${item.bathroom}`,
                ImageInterior: `${item.interior}`,
                Itema: { item },
                Price: `${item.price}`
            });
        }
    
        return (
            <TouchableOpacity style={{ width, height, marginTop: 50 }} onPress={onPress} activeOpacity={0.6}>
                <View style={styles.houseList}>
                    <Image
                        source={item.image}
                        style={{ width: '100%', height: 150, resizeMode: 'cover', borderRadius: 15 }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, alignItems: 'flex-end' }}>
                        <Text style={styles.titleHouseList}>{item.title}</Text>
                        <Text style={[styles.titleHouseList, styles.textGreen]}>${item.price}</Text>
                    </View>
                    <Text style={{ marginTop: 10, fontWeight: '200' }}>{item.addRess}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Icon name="bed" size={15} />
                        <Text style={{ marginLeft: 10 }}>{item.bedroom}</Text>
                        <Icon name="bath" size={15} style={{ marginLeft: 10 }} />
                        <Text style={{ marginLeft: 10 }}>{item.bathroom}</Text>
                        <Icon name="clone" size={15} style={{ marginLeft: 10 }} />
                        <Text style={{ marginLeft: 10 }}>100m</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={styles.container}>
            <Animated.FlatList
                data={data}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                bounces={false}
                // renderItem={({ item, index }) => (<HouseList item={item} index={index} onPress={() => handleSubmit(item, index)} />)}
                renderItem={({ item }) => renderItemHouse(item)}
            />
            <TabView scrollX={scrollX} data={data} onItemPress={onItemPress} />
            {/* <FlatList data={data} keyExtractor={item => item.id}
                renderItem={({ item, index }) => (<NewList item={item} index={index} />)} /> */}
        </View>
    );
};

export default Tabs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    houseList: {
        width: 340,
        height: 300,
        borderRadius: 15,
        shadowRadius: 20,
        shadowColor: Colors.GRAY,
        padding: 20,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5
    },
    titleHouseList: {
        fontSize: 20,
        fontWeight: '700',
    },
    textGreen: {
        color: Colors.BLUE
    },
});
