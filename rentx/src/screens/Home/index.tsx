import { StatusBar } from "expo-status-bar";
import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarsList,
  MyCarsButton,
} from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { api } from "../../service/api";
import { CarDTO } from "../../dtos/CarDTO";
import { Load } from "../../components/Load";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "styled-components";

export function Home() {
  const navigation = useNavigation<any>();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    async function loadCars() {
      setLoading(true);

      try {
        const response = await api.get("/cars");
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadCars();
  }, []);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

  function handleOpenMyCars() {
    navigation.navigate("MyCars");
  }

  return (
    <Container>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total {cars.length} carros</TotalCars>
        </HeaderContent>
      </Header>
      {loading ? (
        <Load />
      ) : (
        <CarsList
          data={cars}
          keyExtractor={(data) => data.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <MyCarsButton>
        <Ionicons
          name="ios-car-sport"
          size={32}
          color={theme.colors.shape}
          onPress={handleOpenMyCars}
        />
      </MyCarsButton>
    </Container>
  );
}
