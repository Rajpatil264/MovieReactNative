import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import UserContext from "./contexts/UserContext";

export default function App() {
  var Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <UserContext.Provider value="Guest">
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </UserContext.Provider>
    </NavigationContainer>
  );
}
