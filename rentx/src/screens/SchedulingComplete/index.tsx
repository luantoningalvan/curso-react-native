import React from "react";
import { Container, Content, Title, Message, Footer } from "./styles";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { useWindowDimensions } from "react-native";
import { ConfirmButton } from "../../components/ConfirmButton";
import { useNavigation } from "@react-navigation/native";

export function SchedulingComplete() {
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();

  function handleConfirm() {
    navigation.navigate("Home");
  }

  return (
    <Container>
      <LogoSvg width={dimensions.width} />

      <Content>
        <DoneSvg />

        <Title>Carro alugado!</Title>
        <Message>
          Agora você só precisa ir {"\n"}
          até uma concessionária da RENTX{"\n"}
          pegar o seu automóvel.
        </Message>

        <Footer>
          <ConfirmButton onPress={handleConfirm} title="OK" />
        </Footer>
      </Content>
    </Container>
  );
}
