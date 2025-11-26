import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

type Props = {
    item: { id: string; text: string; done: boolean }
    onToggle: () => void
}

export default function TaskRow({ item, onToggle }: Props) {
  return (
    <TouchableOpacity onPress={onToggle} style={styles.taskItem}>
        <Text style={item.done ? styles.doneText : undefined}>{item.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  doneText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  }
})