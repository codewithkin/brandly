// Top-Tabs related imports
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from '@react-navigation/native';

// Extract the Navigator
const {Navigator} = createMaterialTopTabNavigator();

import { withLayoutContext } from 'expo-router';

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function Layout () {
    return <MaterialTopTabs
    screenOptions={{
        tabBarLabelStyle: {
            fontWeight: "500",
        },
    }}
    ></MaterialTopTabs>
}