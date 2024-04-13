
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductListScreen from './src/ProductListScreen';
import AddProductScreen from './src/AddProductScreen';
import ProductDetailsScreen from './src/ProductDetailsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen name="ProductList" component={ProductListScreen} />
        <Stack.Screen name="AddProduct" component={AddProductScreen} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
