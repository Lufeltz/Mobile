import React from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";

const IMAGES = [
    {
        id: "1",
        image: require("./images/bandeira_brasil.png"),
        height: 350,
        width: 350,
    },
    {
        id: "2",
        image: require("./images/bandeira_italia.png"),
        height: 300,
        width: 300,
    },
    {
        id: "3",
        image: require("./images/bandeira_suiça.png"),
        height: 250,
        width: 250,
    },
    {
        id: "4",
        image: require("./images/bandeira_equador.png"),
        height: 200,
        width: 200,
    },
    {
        id: "5",
        image: require("./images/bandeira_EUA.png"),
        height: 150,
        width: 150,
    },
    {
        id: "6",
        image: require("./images/bandeira_canada.png"),
        height: 100,
        width: 100,
    },
];

const Gallery = () => {
    const renderItem = ({ item }) => (
        <View
            style={{ marginRight: 10, height: item.height, width: item.width }}
        >
            <Image source={item.image} style={styles.image} />
        </View>
    );

    return (
        <FlatList
            data={IMAGES}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        />
    );
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
    },
});

export default Gallery;
