import { ActivityIndicator } from "react-native";
import { RectButtonProps } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { Container, Title } from "./styles";

interface ButtonProps extends RectButtonProps {
  title: string;
  color?: string;
  enabled?: boolean;
  loading?: boolean;
  onPress: () => void;
}

export function Button({
  title,
  color,
  enabled = true,
  loading = false,
  onPress,
  ...rest
}: ButtonProps) {
  const theme = useTheme();

  return (
    <Container
      onPress={onPress}
      enabled={enabled}
      loading={loading}
      color={color}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={theme.colors.shape} />
      ) : (
        <Title>{title}</Title>
      )}
    </Container>
  );
}
