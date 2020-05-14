import React, { useEffect, useState } from 'react';

import { currentFirebaseUser, signOut } from '../services/FirebaseApi';

import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { Login, Register, TodoTasks, DoneTasks, Auth, Task } from '../screens';

import { Icon } from 'react-native-elements';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

export const TaskTab = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        showIcon: true,
      }}>
      <Tab.Screen
        name="To Do"
        component={TodoTasks}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon type="font-awesome" name="list" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Done"
        component={DoneTasks}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon type="font-awesome" name="check-square" color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Routes = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    async function checkUser() {
      const _user = await currentFirebaseUser(onChange);
      setUser(_user);
      setLoading(false);
    }

    checkUser();
  }, []);

  function onChange(_user) {
    setUser(_user);
  }

  if (loading) return <Auth />;

  return user ? (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="TaskList"
        component={TaskTab}
        options={{
          headerRight: () => (
            <Icon
              type="font-awesome"
              name="sign-out"
              style={{ paddingRight: 10 }}
              color="#495058"
              onPress={signOut}
            />
          ),
        }}
      />
      <Stack.Screen name="Task" component={Task} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default Routes;
