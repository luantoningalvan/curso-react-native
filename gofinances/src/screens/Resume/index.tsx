import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { addMonths, format, subMonths, isSameMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { useCallback, useState } from "react";
import { ActivityIndicator } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { VictoryPie } from "victory-native";
import { HistoryCard } from "../../components/HistoryCard";
import { TransactionCardData } from "../../components/TransactionCard";
import { categories } from "../../utils/categories";
import { formatarBrl } from "../../utils/formatBrl";

import {
  Container,
  Header,
  Title,
  Content,
  ChartContainer,
  Month,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  LoadContainer,
} from "./styles";

type CategoryStats = {
  key: string;
  name: string;
  icon: string;
  color: string;
  amount: number;
  amount_formated: string;
  percentage: number;
};

export const Resume = () => {
  const theme = useTheme();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<CategoryStats[]>([]);

  function handleChangeDate(action: "next" | "prev") {
    if (action === "next") {
      const newDate = addMonths(selectedDate, 1);
      setSelectedDate(newDate);
    } else {
      const newDate = subMonths(selectedDate, 1);
      setSelectedDate(newDate);
    }
  }

  useFocusEffect(
    useCallback(() => {
      async function loadTransactions() {
        setIsLoading(true);

        const dataKey = "@gofinance:transactions";

        const getDataFromAsyncStorage = await AsyncStorage.getItem(dataKey);

        const currentTransactions: TransactionCardData[] =
          getDataFromAsyncStorage ? JSON.parse(getDataFromAsyncStorage) : [];

        const allExpenses = currentTransactions.filter(
          (transaction) =>
            transaction.type === "negative" &&
            isSameMonth(selectedDate, new Date(transaction.date))
        );
        const totalizers: { [key: string]: number } = allExpenses.reduce(
          (prev: { [key: string]: number }, curr: TransactionCardData) => {
            return {
              ...prev,
              [curr.category]: Number(curr.amount) + (prev[curr.category] || 0),
              total: Number(curr.amount) + (prev["total"] || 0),
            };
          },
          {}
        );

        const mapCategoriesWithTotalizers: CategoryStats[] = categories
          .map((cat) => ({
            ...cat,
            amount: totalizers[cat.key],
            amount_formated: formatarBrl(totalizers[cat.key]),
            percentage: Math.round(
              Number((100 * totalizers[cat.key]) / totalizers["total"])
            ),
          }))
          .filter((cat) => cat.amount > 0);

        setStats(mapCategoriesWithTotalizers);
        setIsLoading(false);
      }

      loadTransactions();
    }, [selectedDate])
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <Content>
          <MonthSelect>
            <MonthSelectButton onPress={() => handleChangeDate("prev")}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>
              {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
            </Month>

            <MonthSelectButton onPress={() => handleChangeDate("next")}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>
          <ChartContainer>
            <VictoryPie
              colorScale={stats.map(({ color }) => color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: "bold",
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={50}
              data={stats.map((category) => ({
                x: `${category.percentage}%`,
                y: category.percentage,
              }))}
            />
          </ChartContainer>

          {stats.map((category) => (
            <HistoryCard
              title={category.name}
              amount={category.amount_formated}
              color={category.color}
              key={category.key}
            />
          ))}
        </Content>
      )}
    </Container>
  );
};
