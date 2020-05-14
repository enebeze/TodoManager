import React, { useState } from 'react';

import { Input, Button } from 'react-native-elements';
import { KeyboardAvoidingView, View, Image, Text, Alert } from 'react-native';
import { createUserOnFirebaseAsync } from '../../../services/FirebaseApi';

import styles from './styles';

const img = require('../../../assets/TodoList.png');

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function _createUserAsync() {
    setLoading(true);
    try {
      await createUserOnFirebaseAsync(email, password);
    } catch (error) {
      Alert.alert('Create User Failed!', error.message);
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.topView}>
        <Image style={styles.img} source={img} />

        <Text style={styles.title}>Registering new user</Text>
      </View>

      <View style={styles.bottomView}>
        <Input
          label="Email"
          leftIcon={{
            type: 'font-awesome',
            name: 'envelope',
            size: 20,
            color: '#7B8894',
            style: { paddingRight: 6 },
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={value => setEmail(value)}
          inputStyle={styles.input}
          placeholder="email@address.com"
        />

        <Input
          label="Password"
          leftIcon={{
            type: 'font-awesome',
            name: 'lock',
            size: 28,
            color: '#7B8894',
            style: { paddingRight: 6 },
          }}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={value => setPassword(value)}
          secureTextEntry={true}
          style={styles.input}
          placeholder="Password"
        />

        <Button
          title="Register User"
          loading={loading}
          onPress={_createUserAsync}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
