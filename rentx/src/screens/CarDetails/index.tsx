import React from "react";
import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Rent,
  Name,
  Period,
  Price,
  About,
  Acessories,
  Footer,
} from "./styles";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";

import SpeedSvg from "../../assets/speed.svg";
import AccelerationSvg from "../../assets/acceleration.svg";
import ForceSvg from "../../assets/force.svg";
import GasolineSvg from "../../assets/gasoline.svg";
import ExchangeSvg from "../../assets/exchange.svg";
import PeopleSvg from "../../assets/people.svg";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

export function CarDetails() {
  const navigation = useNavigation();

  function handleConfirmRental() {
    navigation.navigate("Scheduling");
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={[
            "https://static.virgola.com.br/images/419770ee902befc4e2f40da531b00ba3ef2c66fd29072d7a4cd83cd7b2274ff4.webp",
          ]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Chevrolet</Brand>
            <Name>Montana</Name>
          </Description>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 500</Price>
          </Rent>
        </Details>

        <Acessories>
          <Accessory name="380Km/h" icon={SpeedSvg} />
          <Accessory name="3.2s" icon={AccelerationSvg} />
          <Accessory name="800 HP" icon={ForceSvg} />
          <Accessory name="Gasolina" icon={GasolineSvg} />
          <Accessory name="Auto" icon={ExchangeSvg} />
          <Accessory name="2 pessoas" icon={PeopleSvg} />
        </Acessories>

        <About>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis dolore
          provident autem totam distinctio? Maxime veniam repellendus quod
          tempore.
        </About>
      </Content>
      <Footer>
        <Button
          onPress={handleConfirmRental}
          title="Escolher período do aluguel"
        />
      </Footer>
    </Container>
  );
}
