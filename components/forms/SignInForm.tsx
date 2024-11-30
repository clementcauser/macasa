import { firebaseAuth } from "@/constants/firebase";
import { signInFormValidationSchema } from "@/features/auth/validation";
import { toast } from "@backpackapp-io/react-native-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Icon, Input, Spinner, Text } from "@ui-kitten/components";
import { Link, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ComponentProps, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const DEFAULT_VALUES: FormData = {
  confirmPassword: "",
  email: "",
  password: "",
};

type EyeToggleIconProps = Omit<ComponentProps<typeof Icon>, "name"> & {
  secureTextEntry: boolean;
  onToggle: () => void;
};

const EyeToggleIcon = ({
  secureTextEntry,
  onToggle,
  ...props
}: EyeToggleIconProps) => (
  <TouchableWithoutFeedback onPress={onToggle}>
    <Icon {...props} name={secureTextEntry ? "eye-off" : "eye"} />
  </TouchableWithoutFeedback>
);

export default function SignInForm() {
  const router = useRouter();
  const [isSecuredTextEntry, setIsSecuredTextEntry] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(signInFormValidationSchema),
  });

  const onSubmit = async ({ email, password }: FormData) => {
    try {
      setIsSubmitting(true);
      await signInWithEmailAndPassword(firebaseAuth, email, password);

      router.push("/home");
    } catch (err) {
      toast.error(
        'Une erreur est survenue pendant votre authentification. Vérifiez les informations renseignées ou appuyez sur "Mot de passe oublié".'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView>
      <View>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, value, name }, fieldState }) => (
            <Input
              style={styles.input}
              id={name}
              value={value}
              label="Adresse email"
              status={!!fieldState?.error ? "danger" : "basic"}
              keyboardType="email-address"
              placeholder="harry.potter@poudlard.com"
              onChangeText={(nextValue) => onChange(nextValue.toLowerCase())}
              accessoryLeft={(props) => (
                <Icon {...props} name="email-outline" />
              )}
              caption={
                fieldState.error ? (
                  <Text status="danger">{fieldState.error?.message}</Text>
                ) : undefined
              }
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, value, name }, fieldState }) => (
            <Input
              style={styles.input}
              id={name}
              status={!!fieldState?.error ? "danger" : "basic"}
              value={value}
              label="Mot de passe"
              placeholder="********"
              accessoryLeft={(props) => <Icon {...props} name="lock-outline" />}
              secureTextEntry={isSecuredTextEntry}
              onChangeText={(nextValue) => onChange(nextValue)}
              caption={
                fieldState.error ? (
                  <Text status="danger">{fieldState.error?.message}</Text>
                ) : undefined
              }
              accessoryRight={(props) => (
                <EyeToggleIcon
                  {...props}
                  onToggle={() => setIsSecuredTextEntry((prev) => !prev)}
                  secureTextEntry={isSecuredTextEntry}
                />
              )}
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field: { onChange, value, name }, fieldState }) => (
            <Input
              style={styles.input}
              id={name}
              value={value}
              accessoryLeft={(props) => <Icon {...props} name="lock-outline" />}
              label="Confirmation mot de passe"
              status={!!fieldState?.error ? "danger" : "basic"}
              placeholder="********"
              secureTextEntry={isSecuredTextEntry}
              onChangeText={(nextValue) => onChange(nextValue)}
              caption={
                fieldState.error ? (
                  <Text status="danger">{fieldState.error?.message}</Text>
                ) : undefined
              }
              accessoryRight={(props) => (
                <EyeToggleIcon
                  {...props}
                  onToggle={() => setIsSecuredTextEntry((prev) => !prev)}
                  secureTextEntry={isSecuredTextEntry}
                />
              )}
            />
          )}
        />
        <Link style={styles.forgotPasswordLink} href="/(auth)/reset-password">
          <Text status="primary" style={styles.forgotPassword}>
            Mot de passe oublié ?
          </Text>
        </Link>
        <Button
          style={styles.submit}
          disabled={isSubmitting}
          accessoryLeft={() => (
            <View style={styles.indicator}>
              <Spinner size="small" />
            </View>
          )}
          onPress={handleSubmit(onSubmit)}
        >
          {isSubmitting ? "Connexion en cours" : "Se connecter"}
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  input: {
    marginBottom: 16,
  },
  submit: {
    marginTop: 24,
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordLink: {
    marginTop: 8,
  },
  forgotPassword: {
    textAlign: "right",
  },
});