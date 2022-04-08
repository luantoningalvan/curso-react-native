import { categories } from "../../utils/categories";
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  CategoryName,
  Icon,
  Date,
} from "./styles";

export type TransactionCardData = {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
};

interface TransactionCardProps {
  data: TransactionCardData;
}

export function TransactionCard({ data }: TransactionCardProps) {
  const { type, name, amount, category, date } = data;
  const findCategory = categories.find(({ key }) => key === category);

  return (
    <Container>
      <Title>{name}</Title>
      <Amount type={type}>
        {type === "negative" && "- "}
        {amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={findCategory.icon} />
          <CategoryName>{findCategory.name}</CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>
    </Container>
  );
}
