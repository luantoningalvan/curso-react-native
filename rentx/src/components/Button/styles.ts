import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled(RectButton)<{
  color: string;
  loading?: boolean;
}>`
  width: 100%;

  padding: 19px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, color }) =>
    color ? color : theme.colors.main};
  opacity: ${({ enabled, loading }) => (!enabled || loading ? 0.5 : 1)};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.shape};
`;
