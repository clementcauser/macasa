import SignUpForm from "@/components/forms/SignUpForm";
import { APP_NAME } from "@/constants/app";
import { Divider, Layout, Text } from "@ui-kitten/components";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function SignUp() {
  return (
    <Layout level="1" style={styles.pageLayout}>
      <ScrollView style={styles.container}>
        <Text category="h2" style={styles.title}>
          Bienvenue sur{" "}
          <Text category="h2" status="primary">
            {APP_NAME}
          </Text>{" "}
          !
        </Text>
        <Text style={styles.hint} appearance="hint">
          Rejoignez notre communauté et gérez votre vie familiale comme un.e pro
          !
        </Text>
        <SignUpForm />
        <Divider style={{ marginVertical: 32 }} />
        <Text>
          Vous avez déjà un compte ?{" "}
          <Link href="/(auth)/signin">
            <Text status="primary">Appuyez ici.</Text>
          </Link>
        </Text>
      </ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  pageLayout: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
  },
  hint: {
    marginBottom: 32,
  },
});
