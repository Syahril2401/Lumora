import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, ActivityIndicator, Alert, Modal, TextInput, StyleSheet, Image, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'nativewind';
import * as WebBrowser from 'expo-web-browser';
import { plannerApi, getBaseUrl, getToken } from '../../services/api';

const getColors = (colorScheme: string | null | undefined) => ({
  bg: colorScheme === 'dark' ? '#0C1222' : '#FAFAF9',
  card: colorScheme === 'dark' ? '#111827' : '#FFFFFF',
  border: colorScheme === 'dark' ? 'rgba(255,255,255,0.05)' : '#D9E2EC',
  borderLight: colorScheme === 'dark' ? 'rgba(255,255,255,0.02)' : '#E8EDF2',
  navy: colorScheme === 'dark' ? '#F0F4F8' : '#102A43',
  muted: colorScheme === 'dark' ? '#829AB1' : '#627D98',
  orange: '#F97316',
  green: '#10B981',
});

// Monthly Calendar Component
function MonthlyView({ currentDate, onAddEvent, onEditEvent, sessions }: { currentDate: Date; onAddEvent: (dateStr?: string) => void; onEditEvent: (session: any) => void; sessions: any[] }) {
  const { colorScheme } = useColorScheme();
  const COLORS = getColors(colorScheme);
  const styles = getStyles(COLORS);
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sun, 1 = Mon...
  const startOffset = firstDay === 0 ? 6 : firstDay - 1;
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  
  const calendarDays = [];
  
  for (let i = startOffset - 1; i >= 0; i--) {
    calendarDays.push({ date: daysInPrevMonth - i, isCurrentMonth: false, isToday: false });
  }
  
  const today = new Date();
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === i;
    calendarDays.push({ date: i, isCurrentMonth: true, isToday });
  }
  
  const totalSlots = calendarDays.length > 35 ? 42 : 35;
  const nextDays = totalSlots - calendarDays.length;
  for (let i = 1; i <= nextDays; i++) {
    calendarDays.push({ date: i, isCurrentMonth: false, isToday: false });
  }

  return (
    <View style={styles.calendarContainer}>
      {/* Days Header */}
      <View style={styles.daysHeader}>
        {days.map((d, i) => (
          <View key={i} style={styles.dayHeaderCell}>
            <Text style={styles.dayHeaderText}>{d}</Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={styles.calendarGrid}>
        {calendarDays.map((item, index) => {
          const cellDateStr = `${year}-${String(item.isCurrentMonth ? month + 1 : (item.date > 15 ? month : month + 2)).padStart(2, '0')}-${String(item.date).padStart(2, '0')}`;
          
          const cellSessions = sessions.filter(s => {
            if (!s.date) return false;
            return s.date.split('T')[0].split(' ')[0] === cellDateStr;
          });

          return (
            <TouchableOpacity
              key={index}
              onPress={item.isCurrentMonth ? () => onAddEvent(cellDateStr) : undefined}
              activeOpacity={0.7}
              style={[
                styles.calendarCell,
                !item.isCurrentMonth && styles.calendarCellInactive,
                { padding: 2 }
              ]}
            >
              <View style={[styles.todayCircle, item.isToday && styles.todayCircleActive, { alignSelf: 'center', marginBottom: 2 }]}>
                <Text style={[styles.dateText, item.isToday && styles.dateTextToday]}>
                  {String(item.date)}
                </Text>
              </View>
              
              <View style={{ gap: 2 }}>
                {cellSessions.slice(0, 2).map(ev => (
                  <TouchableOpacity key={ev.id} onPress={() => onEditEvent(ev)} activeOpacity={0.7}>
                    <Text numberOfLines={1} style={{ fontSize: 8, fontWeight: 'bold', color: ev.status === 'completed' ? COLORS.green : COLORS.orange, backgroundColor: ev.status === 'completed' ? '#D1FAE5' : '#FFF7ED', padding: 2, borderRadius: 2, overflow: 'hidden' }}>
                      {ev.start_time?.substring(0,5)} {ev.title}
                    </Text>
                  </TouchableOpacity>
                ))}
                {cellSessions.length > 2 && (
                  <Text style={{ fontSize: 8, color: COLORS.muted, textAlign: 'center', fontWeight: 'bold' }}>+{cellSessions.length - 2} more</Text>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

// Daily View Component
function DailyView({ currentDate, sessions, onEditEvent }: { currentDate: Date; sessions: any[]; onEditEvent: (session: any) => void }) {
  const { colorScheme } = useColorScheme();
  const COLORS = getColors(colorScheme);
  const styles = getStyles(COLORS);
  const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
  
  const dailySessions = sessions.filter(s => {
    if (!s.date) return false;
    const sessionDate = s.date.split('T')[0].split(' ')[0];
    return sessionDate === dateStr;
  });

  return (
    <View style={{ paddingHorizontal: 24 }}>
      {dailySessions.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={{ color: COLORS.muted, fontWeight: 'bold' }}>No events planned for this day.</Text>
        </View>
      ) : (
        <View style={[styles.calendarContainer, { padding: 16, borderWidth: 1, gap: 16 }]}>
          {dailySessions.map((ev) => (
            <TouchableOpacity key={ev.id} onPress={() => onEditEvent(ev)} activeOpacity={0.7} style={{
              flexDirection: 'row', 
              backgroundColor: COLORS.card, 
              borderWidth: 1, 
              borderColor: COLORS.borderLight, 
              borderRadius: 16, 
              padding: 16, 
              alignItems: 'center'
            }}>
              <View style={{ width: 60, borderRightWidth: 2, borderRightColor: '#FDBA74', marginRight: 16, alignItems: 'center' }}>
                <Text style={{ color: COLORS.orange, fontWeight: '900', fontSize: 12 }}>
                  {ev.start_time?.substring(0, 5) || '00:00'}
                </Text>
                <Text style={{ color: '#9CA3AF', fontWeight: 'bold', fontSize: 10, marginTop: 2 }}>
                  {ev.end_time?.substring(0, 5) || '01:00'}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: COLORS.navy, fontWeight: '900', fontSize: 16, marginBottom: 8 }}>{ev.title}</Text>
                <View style={{ flexDirection: 'row', gap: 8 }}>
                  <Text style={{ color: COLORS.orange, fontSize: 9, fontWeight: '900', letterSpacing: 1, backgroundColor: '#FFF7ED', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, overflow: 'hidden', textTransform: 'uppercase' }}>
                    {ev.focus_dimension || 'GENERAL'}
                  </Text>
                  <Text style={{ color: ev.status === 'completed' ? COLORS.green : COLORS.orange, fontSize: 9, fontWeight: '900', letterSpacing: 1, backgroundColor: ev.status === 'completed' ? '#D1FAE5' : '#FFF7ED', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, overflow: 'hidden', textTransform: 'uppercase' }}>
                    {ev.status || 'PLANNED'}
                  </Text>
                </View>
              </View>
              {ev.status === 'completed' && (
                <View style={{ backgroundColor: '#D1FAE5', width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: COLORS.green, fontSize: 12, fontWeight: 'bold' }}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

// Weekly View Component
function WeeklyView({ currentDate, onAddEvent, onEditEvent, sessions }: { currentDate: Date; onAddEvent: (dateStr?: string, timeStr?: string) => void; onEditEvent: (session: any) => void; sessions: any[] }) {
  const { colorScheme } = useColorScheme();
  const COLORS = getColors(colorScheme);
  const styles = getStyles(COLORS);
  const startOfWeek = new Date(currentDate);
  const dayOfWeek = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
  startOfWeek.setDate(diff);

  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    const dayName = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][d.getDay()];
    const isToday = d.toDateString() === new Date().toDateString();
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    return { name: dayName, num: d.getDate(), isToday, dateStr };
  });

  return (
    <View style={{ paddingHorizontal: 24 }}>
      <View style={styles.calendarContainer}>
        {/* Days Header */}
        <View style={styles.weeklyHeader}>
          <View style={styles.timeColumnHeader} />
          {days.map((day, i) => {
            return (
              <View
                key={i}
                style={[
                  styles.weeklyDayCell,
                  day.isToday && styles.weeklyDayCellToday,
                ]}
              >
                <Text style={[styles.weeklyDayName, day.isToday && { color: COLORS.orange }]}>{day.name}</Text>
                <Text style={styles.weeklyDayNum}>{day.num}</Text>
              </View>
            );
          })}
        </View>

        {/* Time Grid */}
        <ScrollView style={{ height: 480 }} nestedScrollEnabled={true}>
          {Array.from({ length: 24 }).map((_, hourIndex) => {
            const ampm = hourIndex < 12 ? 'AM' : 'PM';
            const displayHour = hourIndex === 0 ? 12 : hourIndex > 12 ? hourIndex - 12 : hourIndex;
            const hourText = `${displayHour} ${ampm}`;

            return (
              <View key={hourIndex} style={styles.timeRow}>
                <View style={styles.timeLabel}>
                  <Text style={styles.timeLabelText}>{hourText}</Text>
                </View>
                {days.map((day, dayIndex) => {
                  const hourSessions = sessions.filter(s => {
                    if (!s.date || !s.start_time) return false;
                    const sDate = s.date.split('T')[0].split(' ')[0];
                    const sHour = parseInt(s.start_time.split(':')[0], 10);
                    return sDate === day.dateStr && sHour === hourIndex;
                  });

                  return (
                    <TouchableOpacity 
                      key={dayIndex} 
                      style={styles.timeCell} 
                      onPress={() => {
                        const hStr = displayHour < 10 ? `0${displayHour}` : `${displayHour}`;
                        onAddEvent(day.dateStr, `${hStr}:00 ${ampm}`);
                      }} 
                      activeOpacity={0.5} 
                    >
                      {hourSessions.map(ev => (
                        <TouchableOpacity key={ev.id} onPress={() => onEditEvent(ev)} style={{ backgroundColor: ev.status === 'completed' ? '#D1FAE5' : '#FFF7ED', margin: 2, padding: 4, borderRadius: 4, borderWidth: 1, borderColor: ev.status === 'completed' ? '#10B981' : '#FDBA74', overflow: 'hidden' }}>
                          <Text numberOfLines={1} style={{ fontSize: 8, fontWeight: 'bold', color: ev.status === 'completed' ? '#10B981' : '#F97316' }}>{ev.title}</Text>
                        </TouchableOpacity>
                      ))}
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

export default function PlannerScreen() {
  const { colorScheme } = useColorScheme();
  const COLORS = getColors(colorScheme);
  const styles = getStyles(COLORS);
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [isNewEventVisible, setIsNewEventVisible] = useState(false);
  const [editingSession, setEditingSession] = useState<any>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isGoogleConnected, setIsGoogleConnected] = useState(false);

  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formStart, setFormStart] = useState('10:00 AM');
  const [formEnd, setFormEnd] = useState('11:00 PM');

  const openNewEvent = (dateStr?: string | any, timeStr?: string) => {
    setEditingSession(null);
    setFormTitle('');
    setFormDescription('');
    setFormDate(typeof dateStr === 'string' ? dateStr : currentDate.toISOString().split('T')[0]);
    setFormStart(typeof timeStr === 'string' ? timeStr : '10:00 AM');
    setFormEnd('11:00 PM');
    setIsNewEventVisible(true);
  };

  const openEditEvent = (session: any) => {
    setEditingSession(session);
    setFormTitle(session.title || '');
    setFormDescription(session.description || '');
    setFormDate(session.date ? session.date.split('T')[0].split(' ')[0] : currentDate.toISOString().split('T')[0]);
    
    // Convert 15:04:00 to 03:04 PM
    const formatTime = (timeStr: string) => {
      if (!timeStr) return '10:00 AM';
      const [h, m] = timeStr.split(':');
      let hour = parseInt(h, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12;
      hour = hour ? hour : 12;
      const hourStr = hour < 10 ? `0${hour}` : `${hour}`;
      return `${hourStr}:${m} ${ampm}`;
    };

    setFormStart(session.start_time?.includes('M') ? session.start_time : formatTime(session.start_time));
    setFormEnd('11:00 PM');
    setIsNewEventVisible(true);
  };

  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'daily') newDate.setDate(newDate.getDate() - 1);
    if (viewMode === 'weekly') newDate.setDate(newDate.getDate() - 7);
    if (viewMode === 'monthly') newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'daily') newDate.setDate(newDate.getDate() + 1);
    if (viewMode === 'weekly') newDate.setDate(newDate.getDate() + 7);
    if (viewMode === 'monthly') newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const loadSessions = async () => {
    try {
      const res = await plannerApi.getSessions();
      let allSessions = res.data || [];

      try {
        const statusRes = await plannerApi.getGoogleStatus();
        const connected = statusRes.data?.connected || false;
        setIsGoogleConnected(connected);

        if (connected) {
          const eventsRes = await plannerApi.getGoogleEvents();
          if (eventsRes.data) {
            const localGoogleIds = allSessions.map((s: any) => s.google_event_id).filter((id: any) => id);
            const newGoogleEvents = eventsRes.data.filter((ge: any) => {
              if (localGoogleIds.includes(ge.id)) return false;
              // Fallback deduplication by title and date
              const isDuplicate = allSessions.some((s: any) => {
                if (!s.date || !ge.date) return false;
                const sDate = s.date.split('T')[0].split(' ')[0];
                return s.title === ge.title && sDate === ge.date;
              });
              return !isDuplicate;
            });
            allSessions = [...allSessions, ...newGoogleEvents];
          }
        }
      } catch (googleErr) {
        console.log('Google calendar sync error:', googleErr);
      }

      setSessions(allSessions);
    } catch (err) {
      console.log('Planner load error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleConnectGoogle = async () => {
    try {
      const token = await getToken();
      const baseUrl = getBaseUrl();
      const url = `${baseUrl}/api/auth/google/login?token=${token}`;
      
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Cannot open the web browser.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open Google Login');
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadSessions();
    setRefreshing(false);
  }, []);

  const handleComplete = async (id: string) => {
    try {
      await plannerApi.completeSession(id);
      await loadSessions();
      setIsNewEventVisible(false);
      setEditingSession(null);
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  const handleSaveEvent = async () => {
    if (!formTitle.trim()) {
      Alert.alert('Error', 'Title is required');
      return;
    }
    
    // Parse hh:mm AM/PM to HH:MM:00
    const parseTo24Hour = (time12: string) => {
      try {
        if (!time12.includes(' ')) return time12; // fallback
        const [time, ampm] = time12.split(' ');
        let [h, m] = time.split(':');
        let hour = parseInt(h, 10);
        if (ampm.toUpperCase() === 'PM' && hour !== 12) hour += 12;
        if (ampm.toUpperCase() === 'AM' && hour === 12) hour = 0;
        return `${hour < 10 ? '0' + hour : hour}:${m}:00`;
      } catch {
        return time12;
      }
    };

    try {
      const data = {
        title: formTitle,
        description: formDescription,
        date: formDate,
        start_time: parseTo24Hour(formStart),
        end_time: parseTo24Hour(formEnd),
        focus_dimension: 'Career',
      };

      if (editingSession) {
        await plannerApi.updateSession(editingSession.id, data);
      } else {
        await plannerApi.createSession(data);
      }
      
      await loadSessions();
      setIsNewEventVisible(false);
      setEditingSession(null);
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to save event');
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert('Delete Session', 'Are you sure you want to delete this session?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await plannerApi.deleteSession(id);
            await loadSessions();
            setIsNewEventVisible(false);
            setEditingSession(null);
          } catch (err: any) {
            Alert.alert('Error', err.message);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    loadSessions();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.bg, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.orange} />
      </View>
    );
  }

  const getDateText = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthsLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    if (viewMode === 'daily') {
      return `${days[currentDate.getDay()]}, ${monthsLong[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
    }
    if (viewMode === 'weekly') {
      const startOfWeek = new Date(currentDate);
      const dayOfWeek = startOfWeek.getDay();
      const diff = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      startOfWeek.setDate(diff);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      const startMonth = months[startOfWeek.getMonth()];
      const endMonth = months[endOfWeek.getMonth()];
      const startDay = startOfWeek.getDate();
      const endDay = endOfWeek.getDate();
      const year = startOfWeek.getFullYear();
      
      if (startMonth === endMonth) {
        return `${startMonth} ${startDay} - ${endDay}, ${year}`;
      } else {
        return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
      }
    }
    return `${monthsLong[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 32 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.orange} />}
        scrollEnabled={viewMode !== 'weekly'}
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 24, paddingTop: 64, paddingBottom: 16 }}>
          <Text style={{ fontSize: 28, fontWeight: '900', color: COLORS.navy, marginBottom: 8 }}>Study Planner</Text>
          <Text style={{ color: COLORS.muted, fontSize: 12, fontWeight: '500', marginBottom: 24 }}>
            Manage your intellectual flow for the week.
          </Text>

          {/* Controls Row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            {/* Tab Switcher */}
            <View style={styles.tabBar}>
              {(['Daily', 'Weekly', 'Monthly'] as const).map((label) => {
                const val = label.toLowerCase() as 'daily' | 'weekly' | 'monthly';
                const isActive = viewMode === val;
                return (
                  <TouchableOpacity
                    key={val}
                    onPress={() => setViewMode(val)}
                    style={[styles.tab, isActive && styles.tabActive]}
                  >
                    <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Action Buttons */}
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {isGoogleConnected ? (
                <View style={[styles.connectBadge, { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#ECFDF5', borderColor: COLORS.green }]}>
                  <Text style={{ color: COLORS.green, fontSize: 10, fontWeight: 'bold' }}>✓ Connected</Text>
                </View>
              ) : (
                <TouchableOpacity onPress={handleConnectGoogle} style={[styles.connectBadge, { flexDirection: 'row', alignItems: 'center', gap: 6 }]}>
                  <Image 
                    source={{ uri: 'https://img.icons8.com/color/48/000000/google-calendar--v2.png' }} 
                    style={{ width: 14, height: 14 }} 
                  />
                  <Text style={{ color: COLORS.navy, fontSize: 10, fontWeight: 'bold' }}>Connect</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity style={styles.newEventBtn} onPress={() => openNewEvent()}>
                <Text style={{ color: '#FFF', fontSize: 10, fontWeight: 'bold' }}>+ New Event</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Date Navigator */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <TouchableOpacity style={styles.navBtn} onPress={handlePrev}>
              <Text style={{ color: COLORS.muted, fontSize: 12, fontWeight: 'bold' }}>{'<'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navBtnToday} onPress={handleToday}>
              <Text style={{ color: COLORS.navy, fontSize: 12, fontWeight: 'bold' }}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navBtn} onPress={handleNext}>
              <Text style={{ color: COLORS.muted, fontSize: 12, fontWeight: 'bold' }}>{'>'}</Text>
            </TouchableOpacity>
            <Text style={{ color: COLORS.navy, fontWeight: '900', marginLeft: 8 }}>{getDateText()}</Text>
          </View>
        </View>

        {/* View Content — separate stable components to avoid context loss */}
        {viewMode === 'monthly' && <MonthlyView currentDate={currentDate} onAddEvent={openNewEvent} onEditEvent={openEditEvent} sessions={sessions} />}
        {viewMode === 'daily' && <DailyView currentDate={currentDate} sessions={sessions} onEditEvent={openEditEvent} />}
        {viewMode === 'weekly' && <WeeklyView currentDate={currentDate} onAddEvent={openNewEvent} onEditEvent={openEditEvent} sessions={sessions} />}

      </ScrollView>

      {/* New Event Modal */}
      <Modal visible={isNewEventVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <Text style={{ fontSize: 20, fontWeight: '900', color: COLORS.navy }}>
                {editingSession ? 'Edit Event' : 'New Event'}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                {editingSession && (
                  <TouchableOpacity onPress={() => handleDelete(editingSession.id)} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFE4E6', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#F43F5E', fontSize: 14 }}>🗑</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => setIsNewEventVisible(false)} style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: COLORS.borderLight, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: COLORS.muted, fontSize: 14, fontWeight: 'bold' }}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text style={styles.fieldLabel}>TITLE *</Text>
              <TextInput
                value={formTitle}
                onChangeText={setFormTitle}
                placeholder="e.g. Market Equilibrium Analysis"
                placeholderTextColor="#94A3B8"
                style={styles.textInput}
              />
            </View>

            <View style={{ marginBottom: 24 }}>
              <Text style={styles.fieldLabel}>DESCRIPTION</Text>
              <TextInput
                value={formDescription}
                onChangeText={setFormDescription}
                placeholder="Summary of supply and demand curves..."
                placeholderTextColor="#94A3B8"
                multiline
                numberOfLines={3}
                style={[styles.textInput, { height: 96, textAlignVertical: 'top' }]}
              />
            </View>

            <View style={{ flexDirection: 'row', gap: 16, marginBottom: 28 }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>DATE *</Text>
                <View style={styles.fieldReadonly}>
                  <TextInput
                    value={formDate}
                    onChangeText={setFormDate}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor="#94A3B8"
                    style={{ color: COLORS.navy, fontWeight: 'bold', fontSize: 12, padding: 0, flex: 1 }}
                  />
                  <Text style={{ color: COLORS.muted, fontSize: 12 }}>📅</Text>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>START *</Text>
                <View style={styles.fieldReadonly}>
                  <TextInput
                    value={formStart}
                    onChangeText={setFormStart}
                    placeholder="hh:mm AM"
                    placeholderTextColor="#94A3B8"
                    style={{ color: COLORS.navy, fontWeight: 'bold', fontSize: 12, padding: 0, flex: 1 }}
                  />
                  <Text style={{ color: COLORS.muted, fontSize: 12 }}>🕒</Text>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.fieldLabel}>END *</Text>
                <View style={styles.fieldReadonly}>
                  <TextInput
                    value={formEnd}
                    onChangeText={setFormEnd}
                    placeholder="hh:mm PM"
                    placeholderTextColor="#94A3B8"
                    style={{ color: COLORS.navy, fontWeight: 'bold', fontSize: 12, padding: 0, flex: 1 }}
                  />
                  <Text style={{ color: COLORS.muted, fontSize: 12 }}>🕒</Text>
                </View>
              </View>
            </View>

            {editingSession ? (
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <TouchableOpacity 
                  style={[styles.createBtn, { flex: 1, backgroundColor: '#ECFDF5' }]} 
                  onPress={() => {
                    handleComplete(editingSession.id);
                  }}
                >
                  <Text style={{ color: COLORS.green, fontWeight: '900' }}>Mark Complete</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.createBtn, { flex: 1 }]} onPress={handleSaveEvent}>
                  <Text style={{ color: '#FFF', fontWeight: '900' }}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity style={styles.createBtn} onPress={handleSaveEvent}>
                <Text style={{ color: '#FFF', fontWeight: '900' }}>Create Event</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const getStyles = (COLORS: any) => StyleSheet.create({
  // Tabs
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.borderLight,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: COLORS.card,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  tabText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.muted,
  },
  tabTextActive: {
    color: COLORS.navy,
  },

  // Buttons
  connectBadge: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  newEventBtn: {
    backgroundColor: COLORS.orange,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  navBtn: {
    width: 32,
    height: 32,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBtnToday: {
    height: 32,
    paddingHorizontal: 16,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Calendar shared
  calendarContainer: {
    marginHorizontal: 24,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 24,
    overflow: 'hidden',
  },

  // Monthly
  daysHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.bg,
  },
  dayHeaderCell: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  dayHeaderText: {
    color: COLORS.muted,
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 2,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarCell: {
    width: '14.28%' as any,
    height: 56,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    padding: 4,
    backgroundColor: COLORS.card,
  },
  calendarCellInactive: {
    backgroundColor: COLORS.bg,
    opacity: 0.5,
  },
  todayCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayCircleActive: {
    backgroundColor: COLORS.orange,
  },
  dateText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.navy,
  },
  dateTextToday: {
    color: '#FFF',
  },

  // Weekly
  weeklyHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  timeColumnHeader: {
    width: 60,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  weeklyDayCell: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  weeklyDayCellToday: {
    borderBottomWidth: 3,
    borderBottomColor: COLORS.orange,
  },
  weeklyDayName: {
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 2,
    color: COLORS.muted,
    marginBottom: 4,
  },
  weeklyDayNum: {
    fontSize: 12,
    fontWeight: '900',
    color: COLORS.navy,
  },
  timeRow: {
    flexDirection: 'row',
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  timeLabel: {
    width: 60,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 4,
  },
  timeLabelText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: COLORS.muted,
  },
  timeCell: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: COLORS.borderLight,
  },

  // Daily
  emptyState: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderStyle: 'dashed',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },

  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 24,
  },
  modalCard: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  fieldLabel: {
    color: COLORS.muted,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 2,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.navy,
    padding: 16,
    borderRadius: 16,
    fontWeight: 'bold',
  },
  fieldReadonly: {
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  createBtn: {
    backgroundColor: COLORS.orange,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
});
