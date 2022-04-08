import { Container, Title, Amount } from "./styles";

interface HistoryCardProps {
  amount: string;
  title: string;
  color: string;
}

export function HistoryCard(props: HistoryCardProps) {
  const { title, amount, color } = props;

  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}
