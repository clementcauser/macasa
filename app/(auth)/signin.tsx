import SignInForm from "@/components/forms/SignInForm";
import { APP_NAME } from "@/constants/app";
import { Divider, Layout, Text } from "@ui-kitten/components";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Signin() {
  return (
    <Layout level="1" style={styles.pageLayout}>
      <ScrollView style={styles.container}>
        <Text category="h2" style={styles.title}>
          Heureux de vous revoir sur{" "}
          <Text category="h2" status="primary">
            {APP_NAME}
          </Text>{" "}
          !
        </Text>
        <Text style={styles.hint} appearance="hint">
          Nous avions hâte de vous retrouver parmis nous. Connectez-vous pour
          reprendre vos activités familiales .
        </Text>
        <SignInForm />
        <Divider style={{ marginVertical: 32 }} />
        <Text>
          Vous n'avez pas encore de compte ?{" "}
          <Link href="/(auth)/signup">
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
