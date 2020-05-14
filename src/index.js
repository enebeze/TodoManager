import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { initializeFirebaseApi } from './services/FirebaseApi';

import Routes from './routes/routes';

const wrappedRoutes = () => {
  initializeFirebaseApi();

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <Routes />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default wrappedRoutes;
