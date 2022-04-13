import React, { useState } from "react";
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
import { Calendar, DayProps, MarkedDateProps } from "../../components/Calendar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { generateInterval } from "../../components/Calendar/generateDateInterval";
import { format } from "date-fns";
import { getPlatformDate } from "../../utils/getPlatformDate";
import { Alert } from "react-native";
import { CarDTO } from "../../dtos/CarDTO";

interface RentalPeriod {
  start: number;
  startFormatted: string;
  end: number;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

export function Scheduling() {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();

  const { car } = route.params as Params;

  const [lastSelectedDate, setLastSelectedDate] = React.useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>(
    {} as MarkedDateProps
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );

  function handleConfirmRental() {
    navigation.navigate("SchedulingDetails", {
      car,
      dates: Object.keys(markedDates),
    });
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const dateKeys = Object.keys(interval);

    const firstDate = dateKeys[0];
    const endDate = dateKeys[dateKeys.length - 1];

    setRentalPeriod({
      start: start.timestamp,
      end: end.timestamp,
      startFormatted: format(
        getPlatformDate(new Date(firstDate)),
        "dd/MM/yyyy"
      ),
      endFormatted: format(getPlatformDate(new Date(endDate)), "dd/MM/yyyy"),
    });
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
            <DateValue selected={!!rentalPeriod.start}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.end}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.start}
          title="Confirmar"
        />
      </Footer>
    </Container>
  );
}
