import { RectButtonProps } from "react-native-gesture-handler";
import GasolineSvg from "../../assets/gasoline.svg";
import {
  About,
  Brand,
  Container,
  Details,
  Period,
  Name,
  Price,
  Rent,
  Type,
  CarImage,
} from "./styles";

export interface CarData {
  id: string;
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  };
  thumbnail: string;
}

interface CarProps extends RectButtonProps {
  data: CarData;
}

export function Car({ data, ...rest }: CarProps) {
  const {
    brand,
    name,
    thumbnail,
    rent: { period, price },
  } = data;

  return (
    <Container {...rest}>
      <Details>
        <Brand>{brand}</Brand>
        <Name>{name}</Name>

        <About>
          <Rent>
            <Period>{period}</Period>
            <Price>{"R$ " + price}</Price>
          </Rent>

          <Type>
            <GasolineSvg />
          </Type>
        </About>
      </Details>

      <CarImage
        resizeMode="contain"
        source={{
          uri: thumbnail,
        }}
      />
    </Container>
  );
}
