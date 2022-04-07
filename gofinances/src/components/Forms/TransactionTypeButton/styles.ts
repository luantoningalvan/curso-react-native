import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";

type TypeProps = { type: "up" | "down" };

type ContainerProps = { isActive: boolean } & TypeProps;

export const Container = styled.View<ContainerProps>`
  width: 48%;
  border: 1.5px solid
    ${({ theme, isActive }) => (isActive ? "transparent" : theme.colors.border)};
  border-radius: 4px;

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

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px;
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
