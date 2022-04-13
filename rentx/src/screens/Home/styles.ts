import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatList, FlatListProps } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { CarDTO } from "../../dtos/CarDTO";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: 112px;
  background-color: ${({ theme }) => theme.colors.header};
  justify-content: flex-end;
  padding: 32px 24px;
`;

export const HeaderContent = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TotalCars = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_400};
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text};
`;

export const CarsList = styled(
  FlatList as new (props: FlatListProps<CarDTO>) => FlatList<CarDTO>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    padding: 24,
  },
})``;

export const MyCarsButton = styled(RectButton)`
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.main};
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  position: absolute;
  bottom: 22px;
  right: 22px;
`;
