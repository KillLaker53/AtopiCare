import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

type Thread = {
  id: number;
  title: string;
  content: string;
  user: string;
  date: string;
  replies: { content: string; user: string; date: string }[];
};

const Forum: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [newThreadTitle, setNewThreadTitle] = useState('');
  const [newThreadContent, setNewThreadContent] = useState('');
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handlePostThread = () => {
    const newThread: Thread = {
      id: threads.length + 1,
      title: newThreadTitle,
      content: newThreadContent,
      user: 'User1',
      date: new Date().toLocaleString(),
      replies: [],
    };
    setThreads([...threads, newThread]);
    setNewThreadTitle('');
    setNewThreadContent('');
    setImages([]);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  return (
      <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Thread Title"
            value={newThreadTitle}
            onChangeText={setNewThreadTitle}
        />
        <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Thread Content"
            value={newThreadContent}
            onChangeText={setNewThreadContent}
            multiline={true}
            numberOfLines={4}
        />
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          <Text style={styles.imagePickerText}>+</Text>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          {images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.imagePreview} />
          ))}
        </View>
        <Button title="Post Thread" onPress={handlePostThread} />
        <FlatList
            data={threads}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity onPress={() => setSelectedThread(item)}>
                  <View style={styles.threadItem}>
                    <Text style={styles.threadTitle}>{item.title}</Text>
                    <Text style={styles.threadInfo}>{item.user} - {item.date}</Text>
                  </View>
                </TouchableOpacity>
            )}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
  },
  newThreadContainer: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  textAreaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  textArea: {
    flex: 1,
    textAlignVertical: 'top',
  },
  imagePicker: {
    marginLeft: 10,
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  imagePickerText: {
    fontSize: 20,
    color: '#555',
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  threadItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  threadTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  threadInfo: {
    fontSize: 12,
    color: '#555',
  },
  threadImage: {
    width: 100,
    height: 100,
    marginTop: 10,
    borderRadius: 5,
  },
  modalView: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButtonTopRight: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: '#007BFF',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 16,
    marginBottom: 10,
  },
  modalInfo: {
    fontSize: 12,
    color: '#555',
    marginBottom: 10,
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 5,
  },
  replyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  replyInfo: {
    fontSize: 12,
    color: '#555',
  },
  closeButton: {
    marginTop: 10,
  },
});

export default Forum;