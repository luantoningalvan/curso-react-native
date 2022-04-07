import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";

type TypeProps = { type: "up" | "down" };

type ContainerProps = { isActive: boolean } & TypeProps;

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1.5px solid
    ${({ theme, isActive }) => (isActive ? "transparent" : theme.colors.border)};
  border-radius: 4px;
  padding: 16px;

  ${({ isActive, type, theme }) =>
    isActive &&
    type === "down" &&
    css`
      background-color: ${theme.colors.attention_light};
    `}

  ${({ isActive, type, theme }) =>
    isActive &&
    type === "up" &&
    css`
      background-color: ${theme.colors.success_light};
    `}
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
  color: ${({ theme, type }) =>
    type === "up" ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.title};
  font-size: ${RFValue(14)}px;
`;
