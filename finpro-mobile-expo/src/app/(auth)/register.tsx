import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { authApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function RegisterScreen() {
  const router = useRouter();
  const { setToken } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        // After register, redirect to the onboarding sanctuary screen
        router.replace('/(auth)/sanctuary');
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
    <KeyboardAvoidingView 
      className="flex-1 bg-[#FAFAF9]" 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar style="dark" />

      {/* Back Arrow */}
      <TouchableOpacity
        className="absolute top-14 left-5 z-10 w-10 h-10 bg-white rounded-full items-center justify-center"
        style={{ shadowColor: '#94A3B8', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 }}
        onPress={() => {
          if (router.canGoBack()) {
            router.back();
          } else {
            router.replace('/');
          }
        }}
      >
        <Text className="text-xl text-[#102A43] font-bold" style={{ transform: [{ translateY: -1 }] }}>←</Text>
      </TouchableOpacity>

      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48, marginTop: 40 }}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo & Header */}
        <View className="items-center mb-8">
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
          <Text className="text-[#627D98] font-medium text-sm">Create your account to start your journey.</Text>
        </View>

        {/* Register Card */}
        <View className="bg-white rounded-3xl p-6 md:p-8 border border-[#E8EDF2]" style={{ shadowColor: '#94A3B8', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 30, elevation: 5 }}>
          
          {/* Full Name Field */}
          <View className="mb-5">
            <Text className="text-[10px] font-bold text-[#829AB1] uppercase tracking-widest mb-2">Full Name</Text>
            <View className="relative justify-center">
              <View className="absolute left-4 z-10">
                <Text className="text-[#9CA3AF] text-sm">👤</Text>
              </View>
              <TextInput
                className="w-full bg-[#FAFAF9] border border-[#E8EDF2] rounded-xl py-3.5 pl-12 pr-4 text-[#102A43] font-medium"
                placeholder="Enter your name"
                placeholderTextColor="#9CA3AF"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>
            {errors.name && <Text className="text-xs text-red-500 mt-1">{errors.name}</Text>}
          </View>

          {/* Email Field */}
          <View className="mb-5">
            <Text className="text-[10px] font-bold text-[#829AB1] uppercase tracking-widest mb-2">Email Address</Text>
            <View className="relative justify-center">
              <View className="absolute left-4 z-10">
                <Text className="text-[#9CA3AF] text-sm">✉️</Text>
              </View>
              <TextInput
                className="w-full bg-[#FAFAF9] border border-[#E8EDF2] rounded-xl py-3.5 pl-12 pr-4 text-[#102A43] font-medium"
                placeholder="example@lumora.edu"
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
          <View className="mb-5">
            <Text className="text-[10px] font-bold text-[#829AB1] uppercase tracking-widest mb-2">Password</Text>
            <View className="relative justify-center">
              <View className="absolute left-4 z-10">
                <Text className="text-[#9CA3AF] text-sm">🔒</Text>
              </View>
              <TextInput
                className="w-full bg-[#FAFAF9] border border-[#E8EDF2] rounded-xl py-3.5 pl-12 pr-12 text-[#102A43] font-medium"
                placeholder="Create a password"
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

          {/* Confirm Password Field */}
          <View className="mb-6">
            <Text className="text-[10px] font-bold text-[#829AB1] uppercase tracking-widest mb-2">Confirm Password</Text>
            <View className="relative justify-center">
              <View className="absolute left-4 z-10">
                <Text className="text-[#9CA3AF] text-sm">🛡️</Text>
              </View>
              <TextInput
                className="w-full bg-[#FAFAF9] border border-[#E8EDF2] rounded-xl py-3.5 pl-12 pr-12 text-[#102A43] font-medium"
                placeholder="Repeat your password"
                placeholderTextColor="#9CA3AF"
                value={passwordConfirmation}
                onChangeText={setPasswordConfirmation}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity 
                className="absolute right-4 z-10"
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Text className="text-[#9CA3AF] text-sm">{showConfirmPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>
            {errors.passwordConfirmation && <Text className="text-xs text-red-500 mt-1">{errors.passwordConfirmation}</Text>}
          </View>

          {/* Terms */}
          <Text className="text-center text-[11px] text-[#829AB1] leading-relaxed px-2 mb-6">
            By registering, you agree to our{' '}
            <Text className="font-bold" style={{ color: '#F97316' }}>Terms of Service</Text> and{' '}
            <Text className="font-bold" style={{ color: '#F97316' }}>Privacy Policy</Text>.
          </Text>

          {/* Register Button */}
          <TouchableOpacity
            className="w-full py-4 rounded-xl items-center justify-center mb-2"
            style={{ backgroundColor: isLoading ? '#FDBA74' : '#F97316' }}
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
          <View className="flex-row justify-center mt-6">
            <Text className="text-[13px] font-medium text-[#627D98]">Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text className="text-[13px] font-bold" style={{ color: '#F97316' }}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}
