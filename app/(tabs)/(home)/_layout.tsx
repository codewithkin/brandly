import { Stack } from "expo-router"

export default function layout() {
  return (
    <Stack>
        <Stack.Screen
        options={{
          headerShown: false
        }}
          name="(posts)"
        />
    </Stack>
  )
}
