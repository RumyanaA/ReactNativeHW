/* eslint-disable react/style-prop-object */
/* eslint-disable import/no-extraneous-dependencies */
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet, Text, View, TextInput, Button,
} from 'react-native';
import React, { useState } from 'react';

const axios = require('axios');

export default function App() {
  const [city, setCity] = useState('');
  const [output, setOutput] = useState('');
  const [userEmail, setUserEmail] = useState('');
  async function getCityWeatherAndTime() {
    const cityInfo = await axios.get('http://localhost:3000/', {
      headers: {
        city,
        email: userEmail,
      },
    });
    setOutput(JSON.stringify(cityInfo.data));
    setCity('');
    setUserEmail('');
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  return (
    <View style={styles.container}>
      <Text>Enter a city</Text>
      <TextInput
        style={{
          height: 25,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        onChangeText={(newText) => setCity(newText)}
        value={city}
      />
      <Text>Enter your email</Text>
      <TextInput
        style={{
          height: 25,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        onChangeText={(mail) => setUserEmail(mail)}
        value={userEmail}
      />
      <Button
        onPress={() => {
          getCityWeatherAndTime();
        }}
        title="Enter"
      />
      <Text>{output}</Text>
      <StatusBar style="auto" />
    </View>
  );
}
