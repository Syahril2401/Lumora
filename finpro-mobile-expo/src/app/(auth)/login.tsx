import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { authApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen() {
  const router = useRouter();
  const { setToken } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleLogin = async () => {
    // Basic validation
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    try {
      const res = await authApi.login(email, password);
      if (res.data?.token) {
        setToken(res.data.token);
        router.replace('/(dashboard)');
      }
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'Invalid credentials. Please try again.');
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      className="flex-1 bg-[#FAFAF9]" 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />

      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo & Header */}
        <View className="items-center mb-10">
          <TouchableOpacity 
            className="flex-row items-center gap-2 mb-4"
            onPress={() => router.push('/')}
          >
            <Image 
              source={require('../../../assets/images/lumora_icon.svg')} 
              style={{ width: 32, height: 32 }} 
              contentFit="contain" 
            />
            <Text className="text-2xl font-black tracking-tight" style={{ color: '#F97316' }}>Lumora</Text>
          </TouchableOpacity>
          <Text className="text-[#627D98] font-medium text-sm">Return to your Intelligent Sanctuary</Text>
        </View>

        {/* Login Card */}
        <View className="bg-white rounded-3xl p-6 md:p-8 border border-[#E8EDF2]" style={{ shadowColor: '#94A3B8', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 30, elevation: 5 }}>
          
          {/* Email Field */}
          <View className="mb-5">
            <Text className="text-[10px] font-bold text-[#829AB1] uppercase tracking-widest mb-2">Email / Username</Text>
            <View className="relative justify-center">
              <View className="absolute left-4 z-10">
                <Text className="text-[#9CA3AF] text-lg">@</Text>
              </View>
              <TextInput
                className="w-full bg-[#FAFAF9] border border-[#E8EDF2] rounded-xl py-3.5 pl-12 pr-4 text-[#102A43] font-medium"
                placeholder="student@lumora.edu"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {errors.email && <Text className="text-xs text-red-500 mt-1">{errors.email}</Text>}
          </View>

          {/* Password Field */}
          <View className="mb-8">
            <Text className="text-[10px] font-bold text-[#829AB1] uppercase tracking-widest mb-2">Password</Text>
            <View className="relative justify-center">
              <View className="absolute left-4 z-10">
                <Text className="text-[#9CA3AF] text-sm">🔒</Text>
              </View>
              <TextInput
                className="w-full bg-[#FAFAF9] border border-[#E8EDF2] rounded-xl py-3.5 pl-12 pr-12 text-[#102A43] font-medium"
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                className="absolute right-4 z-10"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text className="text-[#9CA3AF] text-sm">{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>
            {errors.password && <Text className="text-xs text-red-500 mt-1">{errors.password}</Text>}
          </View>

          {/* Login Button */}
          <TouchableOpacity
            className="w-full py-4 rounded-xl items-center justify-center mb-6"
            style={{ backgroundColor: isLoading ? '#FDBA74' : '#F97316' }}
            activeOpacity={0.8}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-white font-bold text-[15px]">Login</Text>
            )}
          </TouchableOpacity>

          {/* Register Link */}
          <View className="flex-row justify-center mt-2">
            <Text className="text-[13px] font-medium text-[#627D98]">New to the sanctuary? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text className="text-[13px] font-bold" style={{ color: '#F97316' }}>Join now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center gap-6 mt-10">
          <Text className="text-xs font-medium text-[#829AB1]">Privacy Policy</Text>
          <Text className="text-xs font-medium text-[#829AB1]">Terms of Service</Text>
          <Text className="text-xs font-medium text-[#829AB1]">Contact Support</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
