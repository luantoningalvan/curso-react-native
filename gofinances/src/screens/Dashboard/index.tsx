import React, { useCallback, useLayoutEffect, useState } from "react";
import {
  HighlightCard,
  HighlightCardProps,
} from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardData,
} from "../../components/TransactionCard";

import {
  Container,
  Header,
  UserWrapper,
  User,
  UserInfo,
  UserGretting,
  UserName,
  Photo,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
  LogoutButton,
  LoadContainer,
} from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";
import { formatarBrl } from "../../utils/formatBrl";

export interface DataListProps extends TransactionCardData {
  id: string;
}

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlights, setHighlights] = useState<HighlightCardProps[]>([]);

  const theme = useTheme();

  useFocusEffect(
    useCallback(() => {
      async function loadTransactions() {
        setIsLoading(true);

        const dataKey = "@gofinance:transactions";

        const getDataFromAsyncStorage = await AsyncStorage.getItem(dataKey);

        const currentTransactions: any[] = getDataFromAsyncStorage
          ? JSON.parse(getDataFromAsyncStorage)
          : [];

        const transactionFormated: DataListProps[] = currentTransactions.map(
          (item: DataListProps) => {
            const amount = formatarBrl(item.amount);
            const date = new Date(item.date);
            const dateFormatted = Intl.DateTimeFormat("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            }).format(date);

            return {
              id: item.id,
              name: item.name,
              amount,
              type: item.type,
              category: item.category,
              date: dateFormatted,
            };
          }
        );

        const initialTotalizers = {
          incomes: { value: 0, lastTransaction: "" },
          expenses: { value: 0, lastTransaction: "" },
          total: { value: 0, lastTransaction: "" },
        };

        type Totalizers = typeof initialTotalizers;

        function getMaxDate(firstDate, lastDate) {
          return firstDate && new Date(firstDate).getDate() > lastDate.getDate()
            ? firstDate
            : lastDate;
        }

        const totalizers: Totalizers = currentTransactions.reduce(
          (
            prev: Totalizers,
            curr: { amount: number; type: string; date: string }
          ) => {
            const currentDate = new Date(curr.date);

            return {
              incomes:
                curr.type === "positive"
                  ? {
                      value: prev.incomes.value + curr.amount,
                      lastTransaction: getMaxDate(
                        prev.incomes.lastTransaction,
                        currentDate
                      ),
                    }
                  : prev.incomes,
              expenses:
                curr.type === "negative"
                  ? {
                      value: prev.expenses.value + curr.amount,
                      lastTransaction: getMaxDate(
                        prev.expenses.lastTransaction,
                        currentDate
                      ),
                    }
                  : prev.expenses,
              total: {
                value:
                  curr.type === "positive"
                    ? prev.total.value + curr.amount
                    : prev.total.value - curr.amount,
                lastTransaction: getMaxDate(
                  prev.total.lastTransaction,
                  currentDate
                ),
              },
            };
          },
          initialTotalizers
        );

        function formatDate(date) {
          return Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "long",
          }).format(new Date(date));
        }

        setHighlights([
          {
            title: "Entradas",
            amount: formatarBrl(totalizers.incomes.value),
            lastTransaction:
              "Última entrada dia " +
              formatDate(totalizers.incomes.lastTransaction),
            type: "up",
          },

          {
            title: "Saídas",
            amount: formatarBrl(totalizers.expenses.value),
            lastTransaction:
              "Última saída dia " +
              formatDate(totalizers.expenses.lastTransaction),
            type: "down",
          },

          {
            title: "Total",
            amount: formatarBrl(totalizers.total.value),
            lastTransaction:
              "Última transação dia " +
              formatDate(totalizers.total.lastTransaction),
            type: "total",
          },
        ]);

        setTransactions(transactionFormated);

        setIsLoading(false);
      }

      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: "https://xesque.rocketseat.dev/users/avatar/profile-f5736bd2-7463-43f4-b89b-2b86c16c5aae-1635177068015.jpg",
                  }}
                />
                <User>
                  <UserGretting>Olá,</UserGretting>
                  <UserName>Luan</UserName>
                </User>
              </UserInfo>

              <LogoutButton onPress={() => {}}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            {highlights.map((info) => (
              <HighlightCard key={info.type} {...info} />
            ))}
          </HighlightCards>

          <Transactions>
            <Title>Transações</Title>
            <TransactionList
              data={transactions}
              keyExtractor={(cat) => cat.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
};
