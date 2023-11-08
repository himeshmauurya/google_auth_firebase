
import {View, Text, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GoogleSignin
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'; 
const App = () => {
  
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      setUserInfo({ user: null }); // Remember to remove the user from your app's state as well
      console.log("signoput" )
    } catch (error) {
      console.error(error);
    }
  };
  const [userInfo1, setUserInfo] = useState();
  
  const signIn = async () => {
    try {
      GoogleSignin.configure({
        offlineAccess: false,
        webClientId: '792729661782-fpk420htnv091t196u9a8ajndopc68uu.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //  console.log(userInfo.user)
      const {idToken} = await GoogleSignin.signIn();
      const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
      console.log(googleCredentials)
      auth().signInWithCredential(googleCredentials);
      return userInfo;
      
    } catch (error) {
      Alert.alert(JSON.stringify(error))
      console.log('=> Google Sign In', error);
      return null;
    }
  };
  return (
    <View style={{height: 500, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{padding: 20, borderWidth: 1}}
        onPress={() => {
          signIn();
        }}>
        Signin
      </Text>
      <Text style={{padding: 20, borderWidth: 1}} onPress={() => {
          signOut();
        }}>
        Signout
      </Text>
    </View>
  );
};

export default App;
