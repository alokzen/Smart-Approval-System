import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';

// Screens - Import these when created
// import LoginScreen from '../screens/auth/LoginScreen';
// import DashboardScreen from '../screens/dashboard/DashboardScreen';
// import ApprovalListScreen from '../screens/approvals/ApprovalListScreen';
// import ApprovalDetailScreen from '../screens/approvals/ApprovalDetailScreen';
// import CreateApprovalScreen from '../screens/approvals/CreateApprovalScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator: React.FC = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
      </Stack.Navigator>
    );
  }

  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Dashboard" component={DashboardScreen} /> */}
      {/* <Tab.Screen name="Approvals" component={ApprovalListScreen} /> */}
      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
};

export default AppNavigator;

