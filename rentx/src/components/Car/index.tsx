import { RectButtonProps } from "react-native-gesture-handler";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessory";
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

interface CarProps extends RectButtonProps {
  data: CarDTO;
}

export function Car({ data, ...rest }: CarProps) {
  const {
    brand,
    name,
    thumbnail,
    rent: { period, price },
  } = data;
  const MotorIcon = getAccessoryIcon(data.fuel_type);

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
            <MotorIcon />
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
