// import React, { useState } from "react";
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     StyleSheet,
//     Alert,
//     Dimensions
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { LinearGradient } from "expo-linear-gradient";
//
// type RootStackParamList = {
//     AuthScreen: undefined;
//     UploadPhotoScreen: undefined;
// };
//
// type AuthScreenNavigationProp = StackNavigationProp<RootStackParamList, "UploadPhotoScreen">;
//
// const { width, height } = Dimensions.get("window");
//
// export default function AuthScreen() {
//     const [isRegistering, setIsRegistering] = useState(false);
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [username, setUsername] = useState("");
//     const [isDarkTheme, setIsDarkTheme] = useState(true);
//
//     const navigation = useNavigation<AuthScreenNavigationProp>();
//
//     const handleRegister = () => {
//         if (!email || !password || !firstName || !lastName || !username) {
//             Alert.alert("Error", "Please fill in all fields.");
//             return;
//         }
//         Alert.alert("Success", "You have successfully registered!");
//         setIsRegistering(false);
//     };
//
//     const handleLogin = () => {
//         if (!username || !password) {
//             Alert.alert("Error", "Please fill in both fields.");
//             return;
//         }
//         Alert.alert("Success", "You have successfully logged in!");
//         navigation.navigate("UploadPhotoScreen");
//     };
//
//     const styles = StyleSheet.create({
//         container: {
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
//             padding: width * 0.05,
//         },
//         appTitle: {
//             fontWeight: "bold",
//             fontSize: width * 0.08,
//             textAlign: "center",
//             color: isDarkTheme ? "#99ddff" : "#007AFF",
//             paddingVertical: height * 0.03,
//             fontFamily: "Garamond",
//         },
//         input: {
//             width: "85%",
//             padding: width * 0.04,
//             borderWidth: 1,
//             borderRadius: 30,
//             marginBottom: 12,
//             borderColor: isDarkTheme ? "#99ddff" : "#007AFF",
//             backgroundColor: isDarkTheme ? "rgba(153, 221, 255, 0.2)" : "rgba(0, 122, 255, 0.1)",
//             color: isDarkTheme ? "white" : "black",
//             fontSize: width * 0.04,
//         },
//         buttonPrimary: {
//             width: "60%",
//             paddingVertical: height * 0.02,
//             backgroundColor: "#007AFF",
//             borderRadius: 30,
//             marginTop: height * 0.02,
//             alignItems: "center",
//             shadowColor: "#007AFF",
//             shadowOpacity: 0.4,
//             shadowRadius: 5,
//             elevation: 5,
//         },
//         buttonSecondary: {
//             width: "60%",
//             paddingVertical: height * 0.02,
//             backgroundColor: isDarkTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 122, 255, 0.1)",
//             borderRadius: 30,
//             marginTop: height * 0.02,
//             alignItems: "center",
//             borderWidth: 1,
//             borderColor: isDarkTheme ? "#99ddff" : "#007AFF",
//         },
//         buttonText: {
//             color: "white",
//             fontSize: width * 0.05,
//             fontWeight: "bold",
//         },
//         buttonTextSecondary: {
//             color: isDarkTheme ? "#99ddff" : "#007AFF",
//             fontSize: width * 0.05,
//         },
//         icon: {
//             fontSize: width * 0.25,
//             marginBottom: height * 0.03,
//             marginTop: height * 0.01,
//             color: isDarkTheme ? "#99ddff" : "#007AFF",
//         },
//         iconTheme: {
//             fontSize: width * 0.07,
//             color: isDarkTheme ? "white" : "black",
//             position: "absolute",
//             bottom: height * 0.038,
//             left: width * 0.35,
//         },
//     });
//
//     return (
//         <LinearGradient
//             colors={isDarkTheme ? ["#0f0c29", "#302b63", "#24243e"] : ["#ffffff", "#f2f2f2"]}
//             style={styles.container}
//         >
//             <Text style={styles.appTitle}>ATOPICARE</Text>
//
//             <TouchableOpacity onPress={() => setIsDarkTheme(!isDarkTheme)}>
//                 <Ionicons
//                     style={styles.iconTheme}
//                     name={isDarkTheme ? "contrast" : "contrast-outline"}
//                 />
//             </TouchableOpacity>
//
//             <Ionicons style={styles.icon} name="person-circle-outline" />
//
//             {isRegistering && (
//                 <>
//                     <TextInput
//                         style={styles.input}
//                         placeholder="First Name"
//                         placeholderTextColor={isDarkTheme ? "white" : "black"}
//                         value={firstName}
//                         onChangeText={setFirstName}
//                         keyboardType="default"
//                         autoCapitalize="words"
//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Last Name"
//                         placeholderTextColor={isDarkTheme ? "white" : "black"}
//                         value={lastName}
//                         onChangeText={setLastName}
//                         keyboardType="default"
//                         autoCapitalize="words"
//                     />
//                     <TextInput
//                         style={styles.input}
//                         placeholder="Email"
//                         placeholderTextColor={isDarkTheme ? "white" : "black"}
//                         value={email}
//                         onChangeText={setEmail}
//                         keyboardType="email-address"
//                         autoCapitalize="none"
//                     />
//                 </>
//             )}
//
//             <TextInput
//                 style={styles.input}
//                 placeholder="Username"
//                 placeholderTextColor={isDarkTheme ? "white" : "black"}
//                 value={username}
//                 onChangeText={setUsername}
//                 keyboardType="default"
//                 autoCapitalize="none"
//             />
//
//             <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 placeholderTextColor={isDarkTheme ? "white" : "black"}
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry
//             />
//
//             <TouchableOpacity
//                 style={styles.buttonPrimary}
//                 onPress={isRegistering ? handleRegister : handleLogin}
//             >
//                 <Text style={styles.buttonText}>
//                     {isRegistering ? "Sign Up" : "Sign In"}
//                 </Text>
//             </TouchableOpacity>
//
//             <TouchableOpacity
//                 style={styles.buttonSecondary}
//                 onPress={() => setIsRegistering(!isRegistering)}
//             >
//                 <Text style={styles.buttonTextSecondary}>
//                     {isRegistering ? "Sign In" : "Sign Up"}
//                 </Text>
//             </TouchableOpacity>
//         </LinearGradient>
//     );
// }
import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Modal, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";
import * as FileSystem from 'expo-file-system';

type Thread = {
    id: string;
    title: string;
    content: string;
    ownerUsername: string;
    date: string;
    replies: { content: string; ownerUsername: string; date: string }[];
};

// const uploadImageToS3 = async (imageUri: any) => {
//     const base64 = await FileSystem.readAsStringAsync(imageUri, {
//         encoding: FileSystem.EncodingType.Base64
//     });
//
//     const formData = new FormData();
//     formData.append('file', `data:image/jpeg;base64,${base64}`);
//
//     await axios.post('http://10.0.2.2:3000/upload', formData, {
//         headers: {'Content-Type': 'multipart/form-data'}
//     });
// }

export default function forum () {
    const [threads, setThreads] = useState<Thread[]>([]);
    const [newThreadTitle, setNewThreadTitle] = useState('');
    const [newThreadContent, setNewThreadContent] = useState('');
    const [newThreadUser, setNewThreadUser] = useState();
    const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
    const [replyContent, setReplyContent] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [ownerUsername, setOwnerUsername] = useState();

    useEffect(() => {
        const userAccessToken = AsyncStorage.getItem('accessToken').then(userAccessToken => {
            
            if (userAccessToken == null) {
                return null;
            }

            const decodedToken = JSON.stringify(jwtDecode(userAccessToken));

            const ownerUsername = JSON.parse(decodedToken).username

            setOwnerUsername(ownerUsername);
        });

        axios.get('http://localhost:3000/forum/threads').then(
            response => {
                setThreads(response.data);
            }
        )
    }, []);

    const handlePostThread = async () => {
        const newThread = {
                    title: newThreadTitle,
                    content: newThreadContent,
                    ownerUsername: ownerUsername,
                };

        //await uploadImageToS3(images[0]);

        axios.post("http://localhost:3000/forum/threads/add", newThread).then((response) => {
            const returnedThread: Thread = {
                id: response.data.id,
                title: response.data.title,
                content: response.data.content,
                ownerUsername: response.data.ownerUsername,
                date: response.data.date,
                replies: response.data.replies,
            }

            setThreads([...threads, returnedThread]);
        });
    }

    const handlePostReply = () => {
        console.log(selectedThread);
        if (selectedThread) {
            const newReply = {
                threadId: selectedThread.id,
                content: replyContent,
                ownerUsername: ownerUsername,
            };

            axios.post("http://localhost:3000/forum/threads/reply/add", newReply).then(response => {
                const updatedThreads = threads.map(thread => {
                    console.log(response.data);
                    if (thread.id === selectedThread.id) {
                        if (!thread.replies) {
                            setSelectedThread({
                                ...selectedThread,
                                replies: [response.data]
                            })

                            return {
                                ...thread,
                                replies: [response.data],
                            };
                        } else {
                            setSelectedThread({
                                ...selectedThread,
                                replies: [...(thread.replies), response.data]
                            })

                            return {
                                ...thread,
                                replies: [...(thread.replies), response.data],
                            };
                        }
                    }
                    return thread;
                });
                setThreads(updatedThreads);

            });
        }
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
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedThread(item)}>
                        <View style={styles.threadItem}>
                            <Text style={styles.threadTitle}>{item.title}</Text>
                            <Text style={styles.threadInfo}>{item.ownerUsername} - {item.date}</Text>
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
                    onShow={() => {
                axios.get(`http://localhost:3000/forum/threads/${selectedThread.id}`).then(
                            response => setSelectedThread(response.data)
                        )
                    }}
                >
                    <View style={styles.modalView}>
                        <TouchableOpacity style={styles.closeButtonTopRight} onPress={() => setSelectedThread(null)}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>{selectedThread.title}</Text>
                        <Text style={styles.modalContent}>{selectedThread.content}</Text>
                        <Text style={styles.modalInfo}>{selectedThread.ownerUsername} - {selectedThread.date}</Text>
                        <FlatList
                            data={selectedThread.replies}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.replyItem}>
                                    <Text>{item.content}</Text>
                                    <Text style={styles.replyInfo}>{item.ownerUsername} - {item.date}</Text>
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
}

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
        textAlign: 'center',
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
    threadContent: {
        fontSize: 14,
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