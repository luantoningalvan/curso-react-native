import React from "react";
import { HighlightCard } from "../../components/HighlightCard";
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
} from "./styles";

export interface DataListProps extends TransactionCardData {
  id: string;
}

const data: DataListProps[] = [
  {
    id: "1",
    title: "Desenvolvimento de site",
    amount: "R$ 12.000,00",
    category: { name: "Vendas", icon: "dollar-sign" },
    date: "13/03/2022",
    type: "positive",
  },
  {
    id: "2",
    title: "Desenvolvimento de site",
    amount: "R$ 12.000,00",
    category: { name: "Alimentação", icon: "coffee" },
    date: "13/03/2022",
    type: "negative",
  },
  {
    id: "3",
    title: "Desenvolvimento de site",
    amount: "R$ 12.000,00",
    category: { name: "Vendas", icon: "dollar-sign" },
    date: "13/03/2022",
    type: "positive",
  },
  {
    id: "4",
    title: "Desenvolvimento de site",
    amount: "R$ 12.000,00",
    category: { name: "Vendas", icon: "dollar-sign" },
    date: "13/03/2022",
    type: "negative",
  },
];

export const Home = () => {
  return (
    <Container>
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

          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard
          title="Entradas"
          amount="R$ 17.300,00"
          lastTransaction="Última entrada em 04 de março"
          type="up"
        />
        <HighlightCard
          title="Saídas"
          amount="R$ 17.300,00"
          lastTransaction="Última entrada em 04 de março"
          type="down"
        />
        <HighlightCard
          title="Total"
          amount="R$ 17.300,00"
          lastTransaction="Última entrada em 04 de março"
          type="total"
        />
      </HighlightCards>

      <Transactions>
        <Title>Transações</Title>
        <TransactionList
          data={data}
          keyExtractor={(cat) => cat.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
};
