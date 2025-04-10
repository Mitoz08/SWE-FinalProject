import React, { useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext, AuthProvider } from "./app/dist/AuthContext";
import I_Login from "./app/dist/I_Login";
import I_SignUp from "./app/dist/I_SignUp";
import I_MainPage from "./app/dist/I_MainPage";
import I_InputVehDetail from "./app/dist/I_InputVehDetail";
import I_Availability from "./app/dist/I_Availability";
import I_PaymentUI from "./app/dist/I_PaymentUI";
import I_SuccessfulUI from "./app/dist/I_SuccessfulUI";
import I_ViewTickets from "./app/dist/I_ViewTickets";
import I_ViewProfile from "./app/dist/I_ViewProfile";
import I_EditProfile from "./app/dist/I_EditProfile";
import { Platform } from 'react-native';


const Stack = createStackNavigator();

export default function App() {
	
	return (
		<AuthProvider>
			<LoginSwitch/>
		</AuthProvider>
	);
}

const LoginSwitch = () => {
	const {isLoggedIn} = useContext(AuthContext)

	return (
		<NavigationContainer>
			{isLoggedIn? <MainStack/> : <AuthStack/>}
		</NavigationContainer>
	)
}

const AuthStack = () => {
	useEffect(() => {
		if (Platform.OS === 'web') {
			document.body.style.overflow = 'auto';
		}
	}, []);

	return(
	<Stack.Navigator initialRouteName="I_SignUp">
		<Stack.Screen 
		options={{headerShown: false}}
		name="I_Login" 
		component={I_Login}
		/> 
		<Stack.Screen 
		options={{headerShown: false}}
		name="I_SignUp" 
		component={I_SignUp}
		/>
	</Stack.Navigator>
	)
}

const MainStack = () => {
	return(
	<Stack.Navigator screenOptions={{cardStyle:{flex:1}}}initialRouteName="I_MainPage">
		<Stack.Screen name="I_MainPage" component={I_MainPage} />
		<Stack.Screen name="I_InputVehDetail" component={I_InputVehDetail}/>
		<Stack.Screen name="I_Availability" component={I_Availability}/>
		<Stack.Screen name="I_PaymentUI" component={I_PaymentUI}/>
		<Stack.Screen name="I_SuccessfulUI" component={I_SuccessfulUI}/>
		<Stack.Screen name="I_ViewTickets" component={I_ViewTickets}/>
		<Stack.Screen name="I_ViewProfile" component={I_ViewProfile}/>
		<Stack.Screen name="I_EditProfile" component={I_EditProfile}/>
	</Stack.Navigator>
	)
}

			