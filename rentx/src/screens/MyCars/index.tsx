import React, { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";
import { Load } from "../../components/Load";
import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../service/api";
import {
  Container,
  Header,
  Title,
  Subtitle,
  CarsList,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";
import { AntDesign } from "@expo/vector-icons";

export interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export function MyCars() {
  const theme = useTheme();
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCars() {
      setLoading(true);

      try {
        const response = await api.get("/schedules_byuser/?user_id=1");
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadCars();
  }, []);
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} color={theme.colors.shape} />

        <Title>
          Seus agendamentos,{"\n"}
          estão aqui
        </Title>
        <Subtitle>Conforto, segurança e praticidade</Subtitle>
      </Header>

      <Content>
        {loading ? (
          <Load />
        ) : (
          <>
            <Appointments>
              <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
              <AppointmentsQuantity>
                {String(cars.length).padStart(2, "0")}
              </AppointmentsQuantity>
            </Appointments>
            <CarsList
              data={cars}
              keyExtractor={(data) => data.id}
              renderItem={({ item }) => (
                <CarWrapper>
                  <Car data={item.car} onPress={() => {}} />
                  <CarFooter>
                    <CarFooterTitle>Período</CarFooterTitle>
                    <CarFooterPeriod>
                      <CarFooterDate>{item.startDate}</CarFooterDate>
                      <AntDesign
                        name="arrowright"
                        size={20}
                        color={theme.colors.title}
                        style={{ marginHorizontal: 10 }}
                      />
                      <CarFooterDate>{item.endDate}</CarFooterDate>
                    </CarFooterPeriod>
                  </CarFooter>
                </CarWrapper>
              )}
            />
          </>
        )}
      </Content>
    </Container>
  );
}
