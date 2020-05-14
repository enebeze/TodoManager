import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { TaskListView } from '../../components';
import { readTasksFromFirebaseAsync } from '../../services/FirebaseApi';

import styles from './styles';

export default function DoneTasks({ navigation }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    readTasksFromFirebaseAsync(_fetchTasks);
  }, []);

  function _fetchTasks(_tasks) {
    const tasksDone = _tasks.filter(t => t.isDone);
    setTasks(tasksDone);
  }

  return (
    <View style={styles.container}>
      <TaskListView tasks={tasks} navigation={navigation} />
    </View>
  );
}
