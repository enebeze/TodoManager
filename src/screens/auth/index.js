import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Auth({ navigation }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator style={styles.loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    width: 50,
    height: 50,
  },
});
