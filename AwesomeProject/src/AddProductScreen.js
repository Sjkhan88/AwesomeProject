import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const AddProductScreen = ({ navigation, route }) => {
    const { products, setProducts } = route.params;
    const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '' });

    const handleSubmit = () => {
        setProducts(prevProducts => [...prevProducts, newProduct]);
        navigation.goBack();
    };
    const findMaxId = (products) => {
        let maxId = -Infinity;
        for (const product of products) {
            if (product.id > maxId) {
                maxId = product.id;
            }
        }
        return maxId;
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Add New Product</Text>
            <TextInput
                placeholder="Name"
                value={newProduct.title}
                onChangeText={text => setNewProduct({ ...newProduct, title: text })}
            />
            <TextInput
                placeholder="Price"
                value={newProduct.price}
                onChangeText={text => setNewProduct({ ...newProduct, price: text })}
            />
            <TextInput
                placeholder="Description"
                value={newProduct.description}
                onChangeText={text => setNewProduct({ ...newProduct, description: text })}
            />
            <Button title="Add Product" onPress={() => {
                const maxId = findMaxId(products);
                setNewProduct({ ...newProduct, id: maxId+1 })
                handleSubmit()
            }} />
        </View>
    );
};

export default AddProductScreen;
