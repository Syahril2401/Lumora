import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
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
    <View className="flex-1 bg-[#F0F2F9]">
      <StatusBar style="dark" />
      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo & Header */}
        <View className="items-center mb-10">
          <TouchableOpacity 
            className="flex-row items-center gap-3 mb-4"
            onPress={() => router.push('/')}
          >
            <View className="w-10 h-10 bg-[#3D3ACE] rounded-xl items-center justify-center">
              <Text className="text-white text-lg font-black">✦</Text>
            </View>
            <Text className="text-2xl font-black text-[#1E1B4B] tracking-tight">Lumora</Text>
          </TouchableOpacity>
          <Text className="text-slate-500 font-medium">Return to your Intelligent Sanctuary</Text>
        </View>

        {/* Login Card */}
        <View className="bg-white rounded-[32px] p-8 border border-white/50" style={{ shadowColor: '#818CF8', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.08, shadowRadius: 24, elevation: 8 }}>
          
          {/* Email Field */}
          <View className="mb-6">
            <Text className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3">Email / Username</Text>
            <TextInput
              className="w-full bg-[#F3F4F6] rounded-2xl py-4 px-5 text-slate-700 font-medium"
              placeholder="student@lumora.edu"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.email && <Text className="text-xs text-red-500 ml-1 mt-1">{errors.email}</Text>}
          </View>

          {/* Password Field */}
          <View className="mb-2">
            <Text className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3">Password</Text>
            <View className="relative">
              <TextInput
                className="w-full bg-[#F3F4F6] rounded-2xl py-4 px-5 pr-14 text-slate-700 font-medium"
                placeholder="••••••••"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                className="absolute right-4 top-4"
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text className="text-slate-400 text-sm font-bold">{showPassword ? 'Hide' : 'Show'}</Text>
              </TouchableOpacity>
            </View>
            {errors.password && <Text className="text-xs text-red-500 ml-1 mt-1">{errors.password}</Text>}
          </View>

          {/* Forgot Password */}
          <TouchableOpacity className="self-end mb-8">
            <Text className="text-sm font-bold" style={{ color: '#3D3ACE' }}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            className="w-full py-4 rounded-2xl items-center justify-center mb-6"
            style={{ backgroundColor: isLoading ? '#7C7AE0' : '#3D3ACE' }}
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

          {/* Divider */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-[1px] bg-slate-100" />
            <Text className="px-4 text-[10px] font-black text-slate-300 uppercase tracking-[2px]">or continue with</Text>
            <View className="flex-1 h-[1px] bg-slate-100" />
          </View>

          {/* Google Login */}
          <TouchableOpacity className="w-full bg-[#F3F4F6] py-4 rounded-2xl flex-row items-center justify-center gap-3">
            <Text className="text-lg">🔵</Text>
            <Text className="text-slate-700 font-bold text-sm">Login with Google</Text>
          </TouchableOpacity>

          {/* Register Link */}
          <View className="flex-row justify-center mt-8">
            <Text className="text-[15px] font-medium text-slate-500">New to the sanctuary? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
              <Text className="text-[15px] font-bold" style={{ color: '#3D3ACE' }}>Join now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View className="flex-row justify-center gap-6 mt-10">
          <Text className="text-sm font-semibold text-slate-400">Privacy Policy</Text>
          <Text className="text-sm font-semibold text-slate-400">Terms of Service</Text>
        </View>
      </ScrollView>
    </View>
  );
}
