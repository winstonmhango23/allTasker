import React, { useState } from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Notification from './components/Notification';
import TaskList from './components/TaskList';
import Header from './components/Header';
import Overlay from './components/Overlay';
import CreateTask from './components/CreateTask'; // Import the CreateTask component

export default function App() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [notificationMessage, setNotificationMessage] = useState<string>('');
  const [showCreateTask, setShowCreateTask] = useState<boolean>(false); // State to handle the overlay opening

  const handleAddTask = (newTask: string) => {
    setTasks([...tasks, newTask]);
    setNotificationMessage('Task added successfully!');
    setTimeout(() => {
      setNotificationMessage('');
    }, 6000);
  };

  const handleDeleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
    setNotificationMessage('Task deleted successfully!');
    setTimeout(() => {
      setNotificationMessage('');
    }, 6000);
  };

  const handleAddTaskPress = () => {
    // Open the overlay when the add task button is pressed
    setShowCreateTask(true);
  };

  const handleCreateTaskClose = () => {
    // Close the overlay when the create task component is closed
    setShowCreateTask(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#007bff" />
      <Header
        title="Task List"
        onBackPress={() => console.log('Back button pressed')}
        onAddTaskPress={handleAddTaskPress} // Pass the function to handle add task button press
      />
      {notificationMessage !== '' && <Notification message={notificationMessage} onClose={() => setNotificationMessage('')} />}
      <TaskList tasks={tasks} onDeleteTask={handleDeleteTask} />

      {/* Render the CreateTask component inside the Overlay */}
      {showCreateTask && (
        <Overlay onClose={handleCreateTaskClose}>
          <CreateTask onAddTask={handleAddTask} onClose={handleCreateTaskClose} />
        </Overlay>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

