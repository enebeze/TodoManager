import React, { useState } from 'react';
import { Input, Button } from 'react-native-elements';

import { KeyboardAvoidingView, View, Image, Text, Alert } from 'react-native';

import { signInOnFirebaseAsync } from '../../../services/FirebaseApi';

import styles from './styles';

const img = require('../../../assets/TodoList.png');

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signInAsync = async () => {
    setLoading(true);
    try {
      await signInOnFirebaseAsync(email, password);
    } catch (error) {
      Alert.alert('Login Failed', error.message);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.topView}>
        <Image style={styles.img} source={img} />
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
          value={email}
          onChangeText={text => setEmail(text)}
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
          value={password}
          onChangeText={value => setPassword(value)}
          secureTextEntry={true}
          style={styles.input}
          placeholder="Password"
        />

        <Button title="Sign In" onPress={signInAsync} loading={loading} />

        <View style={styles.textConteiner}>
          <Text>Not a member? Let's </Text>
          <Text
            style={styles.textRegister}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            Register
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
