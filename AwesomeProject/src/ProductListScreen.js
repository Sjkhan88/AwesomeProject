import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, SafeAreaView, Dimensions } from 'react-native';

const ProductListScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProductData();
    }, []);

    const fetchProductData = async () => {
        try {
            const response = await fetch('https://dummyjson.com/products');
            if (!response.ok) {
                throw new Error('Failed to fetch product data');
            }
            const data = await response.json();
            setProducts(data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#D3D3D3' }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginBottom: 90 }}>
                <Text>Product List</Text>
                <FlatList
                    data={products}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}>
                            <View style={{ marginTop: 10, height: 'auto', width: windowWidth - 50, backgroundColor: '#ffff', borderRadius: 10 }}>
                                <View style={{ flexDirection: 'row', borderWidth: 1, borderRadius: 10 }}>
                                    <Image
                                        style={{
                                            height: 100, width: 100, borderRadius: 10,
                                            marginVertical: 10, marginHorizontal: 15,
                                            resizeMode: 'contain'
                                        }}
                                        source={{ uri: item?.thumbnail }}
                                    />
                                    <View style={{ justifyContent: 'center' }}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text>{"Name : "}</Text>
                                            <Text>{item?.title}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text>{"Price : "}</Text>
                                            <Text>$ {item?.price}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text>{"Brand : "}</Text>
                                            <Text>{item?.brand}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Text>{"Discount : "}</Text>
                                            <Text>{item?.discountPercentage}%</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
            <View style={{
                bottom: 10, position: 'absolute',
                justifyContent: 'center', zIndex: 100,
                height: 60, width: "100%", borderWidth: 1,
                backgroundColor: '#adaba5'
            }}>
                <TouchableOpacity
                    style={{ justifyContent: 'center', alignSelf: 'center' }}
                    onPress={() => navigation.navigate('AddProduct', {
                        products: products,
                        setProducts: setProducts
                    })}
                >
                    <Text>Add New Product</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default ProductListScreen;
