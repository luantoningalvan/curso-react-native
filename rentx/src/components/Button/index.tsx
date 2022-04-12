import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Title } from "./styles";

interface ButtonProps extends RectButtonProps {
  title: string;
  color?: string;
  onPress: () => void;
}

export function Button({ title, color, onPress, ...rest }: ButtonProps) {
  return (
    <Container onPress={onPress} color={color} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
