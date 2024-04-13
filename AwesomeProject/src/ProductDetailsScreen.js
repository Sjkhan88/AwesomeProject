import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Image, FlatList } from 'react-native';

const ProductDetailsScreen = ({ route }) => {
    const { productId } = route.params;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProductDetails(productId);
    }, [productId]);

    const fetchProductDetails = async (productId) => {
        try {
            const response = await fetch(`https://dummyjson.com/products/${productId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch product details');
            }
            const data = await response.json();
            setProduct(data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    if (!product) {
        return <View><Text>Loading...</Text></View>;
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{product.title}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    style={{
                        height: 350, width: 350, borderRadius: 10, marginVertical: 10,
                        marginHorizontal: 15, resizeMode: 'contain'
                    }}
                    source={{ uri: product?.thumbnail }}
                />
                <View style={{ justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{"Name : "}</Text>
                        <Text>{product?.title}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{"Price : "}</Text>
                        <Text>$ {product?.price}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{"Brand : "}</Text>
                        <Text>{product?.brand}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>{"Discount : "}</Text>
                        <Text>{product?.discountPercentage}%</Text>
                    </View>
                </View>
            </View>
            <View style={{ margin: 20 }}>
                <Text>{product?.description}</Text>
            </View>
            <FlatList
                data={product.images}
                renderItem={({ item }) => (
                    <View>
                        <Image
                            style={{
                                height: 350, width: 350, borderRadius: 10, marginVertical: 10,
                                marginHorizontal: 15, resizeMode: 'contain'
                            }}
                            source={{ uri: item }}
                        />
                    </View>
                )}
                horizontal
            />
        </SafeAreaView>
    );
};

export default ProductDetailsScreen;
