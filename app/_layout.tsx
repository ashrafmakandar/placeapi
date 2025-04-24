
import { Stack } from 'expo-router';



export default function RootLayout() {
  

  return (
  
    <Stack>
    <Stack.Screen
    name="index"
    options={{
      title: "Home", // 👈 Change this to whatever you want
    }}
  />

</Stack>
   

  );
}
