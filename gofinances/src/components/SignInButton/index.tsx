import { RectButtonProps } from "react-native-gesture-handler";
import { SvgProps } from "react-native-svg";
import { Button, ImageContainer, Text } from "./styles";

interface SignInButtonProps extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export function SignInButton(props: SignInButtonProps) {
  const { title, svg: Svg, ...rest } = props;

  return (
    <Button {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Text>{title}</Text>
    </Button>
  );
}
