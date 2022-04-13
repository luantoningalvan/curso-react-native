import React, { useState } from "react";
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
  Acessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentaPriceDetails,
  RentalPriceQuote,
  RentalPriceTotal,
} from "./styles";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import { Accessory } from "../../components/Accessory";

import { Button } from "../../components/Button";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessory";
import { format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { api } from "../../service/api";
import { Alert } from "react-native";

interface Params {
  car: CarDTO;
  dates: string[];
}

export function SchedulingDetails() {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { car, dates } = route.params as Params;
  const [loading, setLoading] = useState(false);

  const rentTotal = car.rent.price * dates.length;

  const rentalPeriod = {
    start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
    end: format(
      getPlatformDate(new Date(dates[dates.length - 1])),
      "dd/MM/yyyy"
    ),
  };

  async function handleConfirmRental() {
    setLoading(true);

    try {
      const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);

      const unavailable_dates = {
        ...schedulesByCar.data.unavailable_dates,
        ...dates,
      };

      await api.post("/schedules_byuser", {
        car,
        user_id: 1,
        startDate: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
        endDate: format(
          getPlatformDate(new Date(dates[dates.length - 1])),
          "dd/MM/yyyy"
        ),
      });
      await api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates,
      });
      navigation.navigate("SchedulingComplete");
    } catch (error) {
      Alert.alert("Não foi possível realizar o agendamento");
      setLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Acessories>
          {car.accessories.map((accessory) => (
            <Accessory
              name={accessory.name}
              key={accessory.type}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Acessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentaPriceDetails>
            <RentalPriceQuote>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuote>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentaPriceDetails>
        </RentalPrice>
      </Content>
      <Footer>
        <Button
          onPress={handleConfirmRental}
          title="Alugar agora"
          color={theme.colors.success}
          loading={loading}
          enabled={!loading}
        />
      </Footer>
    </Container>
  );
}
