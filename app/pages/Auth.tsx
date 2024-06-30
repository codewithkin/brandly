import React, { useState } from 'react'
import Checkbox from 'expo-checkbox'
import { Alert, StyleSheet, View, TextInput, Pressable, Text, ActivityIndicator } from 'react-native'
import { supabase } from '../lib/supabase'
import { useRouter } from "expo-router";

export default function Auth() {
  // For redirects
  const router = useRouter();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) Alert.alert(error.message) 
    else {
      setLoading(false);
      router.replace("(tabs)");
    }
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: 'https://wyveninc.com',
      },
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>
            Welcome to Brandly
        </Text>
        <Text style={styles.description}>
            Join Brandly and get this, this and this today for a reasonable price. 
        </Text>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        style={[styles.input]}
        selectionColor={'gray'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          onChangeText={setPassword}
          value={password}
          secureTextEntry={!showPassword}
          placeholder="Password"
          style={[styles.input]}
          selectionColor={'gray'}
          autoCapitalize={'none'}
        />
        <View
        style={styles.flex}>
         <Checkbox
          value={showPassword}
          onValueChange={setShowPassword}
          color={showPassword ? '#4630EB' : undefined}
        />
        <Text>Show Password</Text>
        </View>
        <Text
        style={{ fontSize: 16 }}
        >By signing up you agree to our <Text style={{ color: "blue", fontWeight: "500" }}>Terms of Service</Text> and <Text style={{ color: "blue", fontWeight: "500" }} >Privacy Policy</Text> </Text>
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Pressable
        style={[styles.btn]}
        disabled={loading}
        onPress={signInWithEmail}>
            <Text
            style={styles.btnText}
            >
            
            Sign In
            { loading && 
            
            <ActivityIndicator size={15} /> }
            </Text>
        </Pressable>
      </View>
      <View style={styles.verticallySpaced}>
        <Pressable 
        style={[styles.btn, { backgroundColor: "red" }]}
        disabled={loading}
        onPress={signUpWithEmail}>
            <Text
            style={styles.btnText}
            >
              Sign Up
              { loading && 
              
              <ActivityIndicator size={15} /> }
            </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    padding: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
  },
  btn: {
    borderRadius: 10,
    backgroundColor: "black",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 16
  },
  btnText: {
    flexDirection: "row",
    justifyContent: "center",
    fontWeight: '500',
    alignItems: "center",
    color: "white",
    gap: 5,
    fontSize: 16,
  },
  description: {
    color: "gray",
    fontSize: 16,
    fontWeight: '400'
  },
  flex: {
    alignSelf: "flex-start",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    marginVertical: 10,
  }
})