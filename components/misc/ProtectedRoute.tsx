import { RootState } from "@/store";
import { Href, useRouter } from "expo-router";
import { PropsWithChildren, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useSelector } from "react-redux";

type Props = {
  redirectTo?: Href;
};

export default function ProtectedRoute({
  children,
  redirectTo,
}: PropsWithChildren<Props>) {
  const router = useRouter();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/(auth)/signin");
    } else if (!loading && redirectTo) {
      router.replace(redirectTo);
    }
  }, [user, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}
