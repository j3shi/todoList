import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { useState, useEffect } from 'react';
import InputRow from './components/InputRow';
import TaskRow from './components/TaskRow';
import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

let nextId = 0;

export default function App() {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState<{ id: string; text: string; done: boolean }[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === '') return
    setTasks([...tasks, {id: uuidv4(), text: newTask, done: false}])
    setNewTask('');
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => task.id === id ? {...task, done: !task.done } : task))
  }

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('@tasks', JSON.stringify(tasks))
    } catch (e) {
      console.error("Failed to save tasks.", e)
    }
  }

  const loadTasks = async () => {
    try {
      const json = await AsyncStorage.getItem('@tasks')
      if (json != null) {
        setTasks(JSON.parse(json))
      }
  } catch (e) {
      console.error("Failed to load tasks.", e)
  }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo list</Text>
      <InputRow value={newTask} onChange={setNewTask} onAdd={addTask} />
      <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({item}) => <TaskRow item={item} onToggle={() => toggleTask(item.id)}/>}
      style={styles.list}
      />
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
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    position: 'absolute',
    top: 100,
  },
  list: {
    position: 'absolute',
    top: 250,
  }
});