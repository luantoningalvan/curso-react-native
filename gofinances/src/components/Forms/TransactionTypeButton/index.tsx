import { RectButtonProps } from "react-native-gesture-handler";
import { Container, Button, Title, Icon } from "./styles";

interface TransactionTypeButtonProps extends RectButtonProps {
  title: string;
  type: "up" | "down";
  isActive: boolean;
}

const icons = {
  up: "arrow-up-circle",
  down: "arrow-down-circle",
};

export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: TransactionTypeButtonProps) {
  return (
    <Container type={type} isActive={isActive}>
      <Button {...rest}>
        <Icon type={type} name={icons[type]} />
        <Title>{title}</Title>
      </Button>
    </Container>
  );
}
