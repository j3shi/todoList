import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import React from 'react'

type Props = {
    value: string
    onChange: (v: string) => void
    onAdd: () => void
}

export default function InputRow({ value, onChange, onAdd }: Props) {
  return (
     <View style={styles.inputRow}>
      <TextInput
        style={styles.input}
        placeholder="Enter a new task"
        value={value}
        onChangeText={onChange}
      />
      <View style={styles.addButton}>
      <Button
        title="Add"
        onPress={onAdd}
      />
      </View>
      </View>
  )
}

const styles = StyleSheet.create({
    inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    position: 'absolute',
    top: 200,
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    flex: 1,
    borderRadius: 5,
  },
  addButton: {
    marginLeft: 10,
    width: 80,
  },
})