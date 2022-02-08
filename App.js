import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, Alert, Button, Image } from 'react-native';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [reseptit, setReseptit] = useState([]);

  const getReseptit = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
    .then(response => response.json())
    .then(data => setReseptit(data.meals))
    .catch (error => {
      Alert.alert('Error', error.toString());
    });
  }

  return (
    <View style={styles.container}>
      <FlatList style={styles.list}
        data={reseptit}
        renderItem={({ item }) => 
          <View>
          <Text>{item.strMeal}</Text>
          <Image style={styles.image} source={{uri: (item.strMealThumb + '/preview')}} />
          </View> }  
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput onChangeText={text => setKeyword(text)}
      value={keyword}
      placeholder='Hakusana'/>
      <Button title="Etsi" onPress={getReseptit}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginTop: 100
  },
  image: {
    width: 100,
    height: 100
  }
});
