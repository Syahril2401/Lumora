import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { authApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
  const router = useRouter();
  const { setToken } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleRegister = async () => {
    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== passwordConfirmation) newErrors.passwordConfirmation = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    try {
      const res = await authApi.register(name, email, password);
      if (res.data?.token) {
        setToken(res.data.token);
        router.replace('/(dashboard)');
      }
    } catch (error: any) {
      Alert.alert('Registration Failed', error.message || 'Something went wrong. Please try again.');
      setPassword('');
      setPasswordConfirmation('');
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
        <View className="items-center mb-8">
          <TouchableOpacity 
            className="flex-row items-center gap-3 mb-4"
            onPress={() => router.push('/')}
          >
            <View className="w-10 h-10 bg-[#3D3ACE] rounded-xl items-center justify-center">
              <Text className="text-white text-lg font-black">✦</Text>
            </View>
            <Text className="text-2xl font-black text-[#1E1B4B] tracking-tight">Lumora</Text>
          </TouchableOpacity>
          <Text className="text-slate-500 font-medium">Create your account to start your journey.</Text>
        </View>

        {/* Register Card */}
        <View className="bg-white rounded-[32px] p-8 border border-white/50" style={{ shadowColor: '#818CF8', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.08, shadowRadius: 24, elevation: 8 }}>
          
          {/* Full Name Field */}
          <View className="mb-5">
            <Text className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3">Full Name</Text>
            <TextInput
              className="w-full bg-[#F3F4F6] rounded-2xl py-4 px-5 text-slate-700 font-medium"
              placeholder="Enter your name"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
            {errors.name && <Text className="text-xs text-red-500 ml-1 mt-1">{errors.name}</Text>}
          </View>

          {/* Email Field */}
          <View className="mb-5">
            <Text className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3">Email Address</Text>
            <TextInput
              className="w-full bg-[#F3F4F6] rounded-2xl py-4 px-5 text-slate-700 font-medium"
              placeholder="example@lumora.edu"
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
          <View className="mb-5">
            <Text className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3">Password</Text>
            <TextInput
              className="w-full bg-[#F3F4F6] rounded-2xl py-4 px-5 text-slate-700 font-medium"
              placeholder="Create a password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
            {errors.password && <Text className="text-xs text-red-500 ml-1 mt-1">{errors.password}</Text>}
          </View>

          {/* Confirm Password Field */}
          <View className="mb-5">
            <Text className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-3">Confirm Password</Text>
            <TextInput
              className="w-full bg-[#F3F4F6] rounded-2xl py-4 px-5 text-slate-700 font-medium"
              placeholder="Repeat your password"
              placeholderTextColor="#9CA3AF"
              value={passwordConfirmation}
              onChangeText={setPasswordConfirmation}
              secureTextEntry
              autoCapitalize="none"
            />
            {errors.passwordConfirmation && <Text className="text-xs text-red-500 ml-1 mt-1">{errors.passwordConfirmation}</Text>}
          </View>

          {/* Terms */}
          <Text className="text-center text-xs text-slate-400 leading-relaxed px-4 mb-6">
            By registering, you agree to our{' '}
            <Text className="font-bold" style={{ color: '#3D3ACE' }}>Terms of Service</Text> and{' '}
            <Text className="font-bold" style={{ color: '#3D3ACE' }}>Privacy Policy</Text>.
          </Text>

          {/* Register Button */}
          <TouchableOpacity
            className="w-full py-4 rounded-2xl items-center justify-center"
            style={{ backgroundColor: isLoading ? '#7C7AE0' : '#3D3ACE' }}
            activeOpacity={0.8}
            onPress={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-white font-bold text-[15px]">Register</Text>
            )}
          </TouchableOpacity>

          {/* Login Link */}
          <View className="flex-row justify-center mt-8">
            <Text className="text-[15px] font-medium text-slate-500">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text className="text-[15px] font-bold" style={{ color: '#3D3ACE' }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Decorative */}
        <View className="items-center mt-10 opacity-20">
          <Text className="text-5xl" style={{ color: '#3D3ACE' }}>✦</Text>
        </View>
      </ScrollView>
    </View>
  );
}
