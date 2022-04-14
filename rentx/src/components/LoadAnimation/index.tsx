import AnimatedLottieView from "lottie-react-native";
import { Container } from "./styles";
import loadingCar from "../../assets/loadingCar.json";

export function LoadAnimation() {
  return (
    <Container>
      <AnimatedLottieView
        autoPlay
        style={{ height: 200 }}
        source={loadingCar}
        resizeMode="contain"
        loop
      />
    </Container>
  );
}
