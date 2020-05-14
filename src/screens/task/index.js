import React, { useState, useEffect } from 'react';
import { View, Switch, Text, Alert } from 'react-native';

import { Input, Button } from 'react-native-elements';

import { writeTaskOnFirebaseAsync } from '../../services/FirebaseApi';

import { useRoute, useNavigation } from '@react-navigation/native';

import styles from './styles';

export default function Task() {
  const { goBack } = useNavigation();
  const [task, setTask] = useState({ priority: true });
  const [loading, setLoading] = useState(false);

  const { params: param } = useRoute(({ params }) => params);

  useEffect(() => {
    if (param) {
      const { task: _taskEdit } = param;
      if (_taskEdit) setTask(_taskEdit);
    }
  }, []);

  async function _saveTaskAsync() {
    setLoading(true);
    try {
      await writeTaskOnFirebaseAsync(task);
      goBack();
    } catch (error) {
      setLoading(false);
      Alert.alert('Erro Saving', error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Input
        label="Title"
        placeholder="Buy lemon"
        value={task.title}
        onChangeText={title => setTask({ ...task, title })}
        inputStyle={styles.input}
      />

      <Input
        label="Resume"
        placeholder="Resume"
        value={task.resume}
        onChangeText={resume => setTask({ ...task, resume })}
        inputStyle={[styles.input, { height: 100 }]}
        numberOfLines={4}
        multiline
      />

      <View style={styles.switchContainer}>
        <Switch
          value={task.priority}
          onValueChange={priority => setTask({ ...task, priority })}
        />
        <Text style={styles.switchText}>Hight Priority</Text>
      </View>
      <View style={styles.switchContainer}>
        <Switch
          value={task.isDone}
          onValueChange={isDone => setTask({ ...task, isDone })}
        />
        <Text style={styles.switchText}>Is Done?</Text>
      </View>
      <Button
        style={styles.button}
        title="Save"
        onPress={_saveTaskAsync}
        loading={loading}
      />
    </View>
  );
}
