

import styled from 'styled-components';

const ItemsContainer = styled.div`

`;

const Item = styled.div`

`;

export default function Items({ items }) {
  return (
    <ItemsContainer>
      {items.map((item) => (
        <Item key={item.productid}>
          <h3>{item.productname}</h3>
          <p>{item.price}</p>
        </Item>
      ))}
    </ItemsContainer>
  );
};

