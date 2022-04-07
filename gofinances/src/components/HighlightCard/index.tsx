import { Container } from "./styles";
import { Header, Title, Footer, Amount, LastTransaction, Icon } from "./styles";

interface HighlightCardProps {
  title: string;
  amount: string;
  lastTransaction: string;
  type: "up" | "down" | "total";
}

export function HighlightCard({
  type,
  title,
  amount,
  lastTransaction,
}: HighlightCardProps) {
  const icon = {
    up: "arrow-up-circle",
    down: "arrow-down-circle",
    total: "dollar-sign",
  };
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon type={type} name={icon[type]}></Icon>
      </Header>

      <Footer>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
}
