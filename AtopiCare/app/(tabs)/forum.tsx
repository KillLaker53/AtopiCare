import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView } from 'react-native';

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
  };

  const handlePostReply = () => {
    const updatedThreads = threads.map(thread => {
      if (thread.id === selectedThread?.id) {
        return {
          ...thread,
          replies: [...thread.replies, { content: replyContent, user: 'User1', date: new Date().toLocaleString() }],
        };
      }
      return thread;
    });
    setThreads(updatedThreads);
    setReplyContent('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={threads}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.newThreadContainer}>
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
            <TouchableOpacity style={styles.button} onPress={handlePostThread}>
              <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedThread(item)}>
            <View style={styles.threadItem}>
              <Text style={styles.threadTitle}>{item.title}</Text>
              <Text style={styles.threadInfo}>{item.user} - {item.date}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {selectedThread && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedThread}
          onRequestClose={() => setSelectedThread(null)}
        >
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.closeButtonTopRight} onPress={() => setSelectedThread(null)}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>{selectedThread.title}</Text>
            <Text style={styles.modalContent}>{selectedThread.content}</Text>
            <Text style={styles.modalInfo}>{selectedThread.user} - {selectedThread.date}</Text>
            <FlatList
              data={selectedThread.replies}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.replyItem}>
                  <Text>{item.content}</Text>
                  <Text style={styles.replyInfo}>{item.user} - {item.date}</Text>
                </View>
              )}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Write a reply..."
              value={replyContent}
              onChangeText={setReplyContent}
              multiline={true}
              numberOfLines={2}
            />
            <TouchableOpacity style={styles.button} onPress={handlePostReply}>
              <Text style={styles.buttonText}>Post Reply</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={() => setSelectedThread(null)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
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
  textArea: {
    height: 100, 
    textAlignVertical: 'top', 
  },
  
  threadItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  threadTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  threadInfo: {
    fontSize: 14,
    color: 'gray',
  },
  modalView: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  replyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  replyInfo: {
    fontSize: 12,
    color: 'gray',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#6c757d',
  },
  closeButtonTopRight: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'red',
  },
});

export default Forum;