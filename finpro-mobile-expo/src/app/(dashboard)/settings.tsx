import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, Alert,
  ActivityIndicator, Image, Modal, TextInput, Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useColorScheme } from 'nativewind';
import * as ImagePicker from 'expo-image-picker';
import { authApi, getAvatarUrl, plannerApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { colorScheme, setColorScheme } = useColorScheme();
  const { logout } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editAvatarUri, setEditAvatarUri] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await authApi.getMe();
      const user = res.data?.user || res.data;
      setUserData(user);
      setEditName(user?.name || '');
      setEditRole(user?.role || '');

      try {
        const statusRes = await plannerApi.getGoogleStatus();
        setIsGoogleConnected(statusRes.data?.connected || false);
      } catch (err) {
        console.error('Failed to get google status', err);
      }
    } catch (e) {
      console.error('Failed to load profile', e);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnectGoogle = () => {
    Alert.alert('Disconnect Calendar', 'Are you sure you want to disconnect Google Calendar?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Disconnect', style: 'destructive', onPress: async () => {
        try {
          await plannerApi.disconnectGoogle();
          setIsGoogleConnected(false);
          Alert.alert('Success', 'Google Calendar disconnected.');
        } catch (e) {
          Alert.alert('Error', 'Failed to disconnect Google Calendar.');
        }
      }}
    ]);
  };

  const handleLogout = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out of Lumora?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  const openEditModal = () => {
    setEditName(userData?.name || '');
    setEditRole(userData?.role || '');
    setEditAvatarUri(null);
    setShowEditModal(true);
  };

  const pickImage = async () => {
    const permResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permResult.granted) {
      Alert.alert('Permission Required', 'Please allow access to your photos to change your avatar.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setEditAvatarUri(result.assets[0].uri);
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('name', editName);
      formData.append('role', editRole);

      if (editAvatarUri) {
        const filename = editAvatarUri.split('/').pop() || 'avatar.jpg';
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image/jpeg';

        formData.append('avatar', {
          uri: editAvatarUri,
          name: filename,
          type,
        } as any);
      }

      const res = await authApi.updateProfile(formData);
      if (res.success) {
        const user = res.data?.user || res.data;
        setUserData(user);
        setShowEditModal(false);
        Alert.alert('Success', 'Profile updated successfully!');
      } else {
        Alert.alert('Error', res.message || 'Failed to update profile');
      }
    } catch (e) {
      console.error('Save profile error:', e);
      Alert.alert('Error', 'Something went wrong while saving your profile.');
    } finally {
      setSaving(false);
    }
  };

  const avatarSource = userData?.avatar ? getAvatarUrl(userData.avatar) : null;

  return (
    <View className="flex-1 bg-surface-warm dark:bg-dark-bg">
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 32 }}>

        {/* Header */}
        <View className="px-6 pt-16 pb-6 border-b border-navy-100 dark:border-dark-border">
          <Text className="text-3xl font-black text-navy-900 dark:text-text-primary mb-2">Settings</Text>
          <Text className="text-navy-500 dark:text-text-muted font-medium text-xs">
            Manage your intelligent workspace and learning preferences.
          </Text>
        </View>

        {/* Profile Card */}
        <View className="px-6 mt-6 mb-6">
          <View className="bg-white dark:bg-dark-panel border border-navy-100 dark:border-dark-border p-6 rounded-3xl items-center shadow-sm relative">

            {loading ? (
              <ActivityIndicator size="small" color="#F97316" />
            ) : (
              <>
                <View className="w-24 h-24 rounded-full items-center justify-center mb-4 border-4 border-brand-500 overflow-hidden">
                  {avatarSource ? (
                    <Image
                      source={{ uri: avatarSource }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  ) : (
                    <Text className="text-4xl">👨🏽‍🎓</Text>
                  )}
                </View>
                <Text className="text-navy-900 dark:text-text-primary text-xl font-black mb-1">
                  {userData?.name || 'User'}
                </Text>
                <Text className="text-navy-500 dark:text-text-muted text-xs font-medium mb-6 text-center px-4">
                  {userData?.role || 'Member'}
                </Text>
              </>
            )}

            <View className="w-full h-px bg-navy-50 dark:bg-dark-surface mb-6" />

            <View className="flex-row items-center w-full justify-around mb-8">
              <View className="items-center">
                <Text className="text-navy-900 dark:text-text-primary text-2xl font-black mb-1">124</Text>
                <Text className="text-navy-500 dark:text-text-muted text-[9px] font-black uppercase tracking-widest">Sessions</Text>
              </View>
              <View className="items-center">
                <Text className="text-navy-900 dark:text-text-primary text-2xl font-black mb-1">92%</Text>
                <Text className="text-navy-500 dark:text-text-muted text-[9px] font-black uppercase tracking-widest">Focus Rate</Text>
              </View>
            </View>

            <TouchableOpacity
              className="w-12 h-12 bg-navy-900 dark:bg-dark-surface rounded-full items-center justify-center shadow-sm absolute -bottom-6"
              onPress={openEditModal}
            >
              <Text className="text-white text-lg">✏️</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Theme Preferences */}
        <View className="px-6 mb-6 mt-4">
          <View className="bg-white dark:bg-dark-panel border border-navy-100 dark:border-dark-border p-6 rounded-3xl shadow-sm">
            <View className="flex-row items-center gap-3 mb-6">
              <View className="bg-amber-50 w-10 h-10 rounded-xl items-center justify-center border border-amber-100">
                <Text className="text-amber-500 text-lg">🎨</Text>
              </View>
              <View>
                <Text className="text-navy-900 dark:text-text-primary text-sm font-black mb-1">Theme Preferences</Text>
                <Text className="text-navy-500 dark:text-text-muted text-[10px]">Visual appearance of your Intelligent Sanctuary.</Text>
              </View>
            </View>

                        <View className="flex-row justify-between" style={{ gap: 12 }}>
              <TouchableOpacity
                className={`flex-1 bg-surface-warm dark:bg-dark-bg border-2 rounded-2xl p-4 items-center ${colorScheme !== 'dark' ? 'border-brand-500' : 'border-transparent'}`}
                onPress={() => setColorScheme('light')}
              >
                <View className="w-full h-12 bg-white rounded-lg mb-3 border border-navy-100 dark:border-dark-border" />
                <Text className="text-navy-900 dark:text-text-primary text-xs font-black">Premium Light</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-1 bg-navy-900 dark:bg-dark-surface border-2 rounded-2xl p-4 items-center shadow-sm ${colorScheme === 'dark' ? 'border-brand-500' : 'border-transparent'}`}
                onPress={() => setColorScheme('dark')}
              >
                <View className="w-full h-12 bg-[#161C2D] rounded-lg mb-3 border border-white/5" />
                <Text className="text-white text-xs font-black">Premium Dark</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Google Integrations */}
        <View className="px-6 mb-6">
          <View className="bg-white dark:bg-dark-panel border border-navy-100 dark:border-dark-border p-6 rounded-3xl shadow-sm">
            <View className="flex-row items-center gap-3 mb-6">
              <View className="bg-blue-50 w-10 h-10 rounded-xl items-center justify-center border border-blue-100">
                <Text className="text-blue-500 text-lg">📅</Text>
              </View>
              <View>
                <Text className="text-navy-900 dark:text-text-primary text-sm font-black mb-1">Google Integrations</Text>
                <Text className="text-navy-500 dark:text-text-muted text-[10px]">Connect Lumora with your Google ecosystem.</Text>
              </View>
            </View>

            <View className="flex-row items-center justify-between p-4 bg-surface-warm dark:bg-dark-bg border border-navy-100 dark:border-dark-border rounded-2xl">
              <View className="flex-1 mr-4">
                <Text className="text-navy-900 dark:text-text-primary text-xs font-black mb-1">Google Calendar</Text>
                <Text className="text-navy-500 dark:text-text-muted text-[9px]">Sync your Lumora study sessions with Google Calendar.</Text>
              </View>
              {isGoogleConnected ? (
                <TouchableOpacity onPress={handleDisconnectGoogle} className="bg-red-50 px-3 py-2 rounded-lg border border-red-100">
                  <Text className="text-red-500 text-[10px] font-bold">Disconnect</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity className="bg-navy-50 dark:bg-dark-surface px-3 py-2 rounded-lg">
                  <Text className="text-navy-500 dark:text-text-muted text-[10px] font-bold">Not Connected</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>

        {/* Current Plan */}
        <View className="px-6 mb-6">
          <View className="bg-white dark:bg-dark-panel border border-navy-100 dark:border-dark-border p-6 rounded-3xl shadow-sm">
            <Text className="text-brand-500 text-[9px] font-black uppercase tracking-widest mb-2">Current Plan</Text>
            <Text className="text-navy-900 dark:text-text-primary text-xl font-black mb-1">Lumora Pro Alpha</Text>
            <Text className="text-navy-500 dark:text-text-muted text-xs mb-6">Your subscription renews on Jan 12, 2025.</Text>

            <TouchableOpacity className="bg-surface-warm dark:bg-dark-bg py-3 rounded-xl items-center border border-navy-100 dark:border-dark-border shadow-sm">
              <Text className="text-navy-900 dark:text-text-primary font-black text-sm">Manage Billing</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Logout */}
        <View className="px-6">
          <TouchableOpacity
            className="border border-navy-100 dark:border-dark-border bg-white dark:bg-dark-panel py-4 rounded-2xl items-center shadow-sm"
            onPress={handleLogout}
          >
            <Text className="text-rose-500 dark:text-rose-400 font-bold text-sm">Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* ─── Edit Profile Modal ─── */}
      <Modal visible={showEditModal} animationType="slide" transparent>
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white dark:bg-dark-panel rounded-t-3xl px-6 pt-6 pb-10" style={{ maxHeight: '80%' }}>

            {/* Modal Header */}
            <View className="flex-row items-center justify-between mb-6">
              <Text className="text-xl font-black text-navy-900 dark:text-text-primary">Edit Profile</Text>
              <TouchableOpacity
                onPress={() => setShowEditModal(false)}
                className="bg-surface-warm dark:bg-dark-bg border border-navy-100 dark:border-dark-border px-4 py-2 rounded-xl"
              >
                <Text className="text-navy-500 dark:text-text-muted text-xs font-bold">Cancel</Text>
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Avatar */}
              <View className="items-center mb-6">
                <TouchableOpacity onPress={pickImage} className="relative">
                  <View className="w-24 h-24 rounded-full bg-surface-warm dark:bg-dark-bg border-4 border-brand-500 overflow-hidden items-center justify-center">
                    {editAvatarUri ? (
                      <Image source={{ uri: editAvatarUri }} className="w-full h-full" resizeMode="cover" />
                    ) : avatarSource ? (
                      <Image source={{ uri: avatarSource }} className="w-full h-full" resizeMode="cover" />
                    ) : (
                      <Text className="text-4xl">👨🏽‍🎓</Text>
                    )}
                  </View>
                  <View className="absolute bottom-0 right-0 w-8 h-8 bg-navy-900 dark:bg-dark-surface rounded-full items-center justify-center border-2 border-white">
                    <Text className="text-white text-xs">📷</Text>
                  </View>
                </TouchableOpacity>
                <Text className="text-navy-500 dark:text-text-muted text-[10px] mt-2 font-bold">Tap to change photo</Text>
              </View>

              {/* Name Input */}
              <View className="mb-4">
                <Text className="text-navy-900 dark:text-text-primary text-sm font-bold mb-2">Display Name</Text>
                <TextInput
                  value={editName}
                  onChangeText={setEditName}
                  placeholder="Enter your name"
                  placeholderTextColor="#9CA3AF"
                  className="bg-surface-warm dark:bg-dark-bg text-navy-900 dark:text-text-primary px-4 py-4 rounded-2xl border border-navy-100 dark:border-dark-border text-sm"
                />
              </View>

              {/* Role Input */}
              <View className="mb-6">
                <Text className="text-navy-900 dark:text-text-primary text-sm font-bold mb-2">Role / Title</Text>
                <TextInput
                  value={editRole}
                  onChangeText={setEditRole}
                  placeholder="e.g. Graduate Student • Cognitive Science"
                  placeholderTextColor="#9CA3AF"
                  className="bg-surface-warm dark:bg-dark-bg text-navy-900 dark:text-text-primary px-4 py-4 rounded-2xl border border-navy-100 dark:border-dark-border text-sm"
                />
              </View>

              {/* Save Button */}
              <TouchableOpacity
                onPress={saveProfile}
                disabled={saving}
                className={`py-4 rounded-2xl items-center shadow-sm ${saving ? 'bg-orange-300' : 'bg-brand-500'}`}
              >
                {saving ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text className="text-white font-black text-sm">Save Changes</Text>
                )}
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
