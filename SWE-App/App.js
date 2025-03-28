import React, { useContext } from "react";
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

	return(
	<Stack.Navigator initialRouteName="I_SignUp">
		<Stack.Screen 
		name="I_Login" 
		component={I_Login}
		/> 
		<Stack.Screen 
		name="I_SignUp" 
		component={I_SignUp}
		/>
	</Stack.Navigator>
	)
}

const MainStack = () => {
	return(
	<Stack.Navigator initialRouteName="I_Mainpage">
		<Stack.Screen name="I_MainPage" component={I_MainPage} />
		<Stack.Screen name="I_InputVehDetail" component={I_InputVehDetail}/>
		<Stack.Screen name="I_Availability" component={I_Availability}/>
		<Stack.Screen name="I_PaymentUI" component={I_PaymentUI}/>
		<Stack.Screen name="I_SuccessfulUI" component={I_SuccessfulUI}/>
	</Stack.Navigator>
	)
}

			