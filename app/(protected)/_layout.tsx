import ProtectedRoute from "@/components/misc/ProtectedRoute";
import { Icon, useTheme } from "@ui-kitten/components";
import { Tabs } from "expo-router";

type TabIconProps = {
  focused: boolean;
  name: string;
};

const TabIcon = ({ focused, name }: TabIconProps) => {
  const theme = useTheme();

  return (
    <Icon
      name={name}
      fill={focused ? theme["color-primary-500"] : theme["text-hint-color"]}
    />
  );
};

export default function Layout() {
  const theme = useTheme();

  return (
    <ProtectedRoute>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="home"
          options={{
            title: "Accueil",
            tabBarActiveTintColor: theme["color-primary-500"],
            tabBarIcon(props) {
              return <TabIcon name="home-outline" focused={props.focused} />;
            },
          }}
        />
        <Tabs.Screen
          name="tasks"
          options={{
            title: "Mes tâches",
            tabBarActiveTintColor: theme["color-primary-500"],
            tabBarIcon(props) {
              return (
                <TabIcon
                  name="checkmark-circle-outline"
                  focused={props.focused}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Moi",
            tabBarActiveTintColor: theme["color-primary-500"],
            tabBarIcon(props) {
              return <TabIcon name="person-outline" focused={props.focused} />;
            },
          }}
        />
      </Tabs>
    </ProtectedRoute>
  );
}
