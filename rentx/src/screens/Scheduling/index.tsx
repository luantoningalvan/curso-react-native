import React from "react";
import {
  Container,
  Header,
  Title,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPeriod,
  Content,
  Footer,
} from "./styles";
import { BackButton } from "../../components/BackButton";

import { Button } from "../../components/Button";
import { useTheme } from "styled-components";
import ArrowSvg from "../../assets/arrow.svg";
import { Calendar } from "../../components/Calendar";
import { useNavigation } from "@react-navigation/native";

export function Scheduling() {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleConfirmRental() {
    navigation.navigate("SchedulingDetails");
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} color={theme.colors.shape} />

        <Title>
          Escolha uma data{"\n"}
          de início e fim do{"\n"}
          aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected>12/04/2022</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected>14/04/2022</DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button onPress={handleConfirmRental} title="Confirmar" />
      </Footer>
    </Container>
  );
}
