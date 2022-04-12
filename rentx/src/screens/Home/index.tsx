import { StatusBar } from "expo-status-bar";
import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarsList,
} from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";

const data = Array(5).fill({
  id: "car-1",
  brand: "AUDI",
  name: "RS 5 Coupé",
  thumbnail:
    "https://static.wikia.nocookie.net/forzamotorsport/images/4/45/HOR_XB1_Audi_RS_5.png/revision/latest?cb=2019120115405",
  rent: {
    period: "AO DIA",
    price: 500,
  },
});

export function Home() {
  const navigation = useNavigation();

  function handleCarDetails() {
    navigation.navigate("CarDetails");
  }

  return (
    <Container>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      <CarsList
        data={data}
        keyExtractor={(data) => String(data)}
        renderItem={({ item }) => (
          <Car data={item} onPress={handleCarDetails} />
        )}
      />
    </Container>
  );
}
