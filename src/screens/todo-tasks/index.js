import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';

import { readTasksFromFirebaseAsync } from '../../services/FirebaseApi';

import { TaskListView } from '../../components';

import styles from './styles';

const imgAdd = require('../../assets/Add.png');

export default function ToDoTasks({ navigation }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    readTasksFromFirebaseAsync(_fetchTasks);
  }, []);

  function _fetchTasks(_tasks) {
    const tasksToDo = _tasks.filter(t => !t.isDone);
    setTasks(tasksToDo);
  }

  function _goToTask() {
    navigation.navigate('Task');
  }

  return (
    <View style={styles.container}>
      <TaskListView tasks={tasks} navigation={navigation} />
      <TouchableOpacity style={styles.floatButton} onPress={_goToTask}>
        <Image source={imgAdd} style={styles.img} />
      </TouchableOpacity>
    </View>
  );
}
