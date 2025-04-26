import { Provider } from 'react-redux';
import { Tabs } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import store from '../src/redux/store';

export default function RootLayout() {
  const TabBarIcon = ({ name, focused, color, size }) => {
    // For the Favorites tab, set icon based only on focused state
    if (name === 'Favorites') {
      const iconName = focused ? 'favorite' : 'favorite-outline';
      return <MaterialIcons name={iconName} size={size} color={color} />;
    }
    return <MaterialIcons name={name} size={size} color={color} />;
  };

  return (
    <Provider store={store}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: 'orange',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: '#fff' },
        }}
      >
        {/* Home Tab (Left) */}
        <Tabs.Screen
          name="index"
          options={{
            title: 'Popular Movies',
            tabBarIcon: ({ color, focused, size }) => (
              <TabBarIcon name="home" focused={focused} color={color} size={size} />
            ),
          }}
        />
        {/* Favorites Tab (Right) */}
        <Tabs.Screen
          name="favorites"
          options={{
            title: 'Favorites',
            tabBarIcon: ({ color, focused, size }) => (
              <TabBarIcon name="Favorites" focused={focused} color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </Provider>
  );
}