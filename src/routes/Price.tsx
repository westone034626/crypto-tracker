import React from 'react';
import styled from 'styled-components';
import { PriceData } from './Coin';

const PriceContainer = styled.ul`
  margin-top: -20px;
  margin-bottom: -20px;
  padding-top: 1px;
  padding-bottom: 1px;
`;

const PriceItem = styled.li`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: white;
  padding: 25px 50px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

interface PriceRouteProps {
  data?: PriceData;
}

const Price: React.FC<PriceRouteProps> = ({ data }) => {
  const quotes = data?.quotes;
  return (
    <PriceContainer>
      <PriceItem>Price: {quotes?.USD.price}</PriceItem>
      <PriceItem>
        Max Change rate in last 24h: {quotes?.USD.market_cap_change_24h}
      </PriceItem>
      <PriceItem>
        Change rate (last 30 Minutes): {quotes?.USD.percent_change_30m}
      </PriceItem>
      <PriceItem>
        Change rate (last 1 Hour): {quotes?.USD.percent_change_1h}
      </PriceItem>
      <PriceItem>
        Change rate (last 12 Hours): {quotes?.USD.percent_change_12h}
      </PriceItem>
      <PriceItem>
        Change rate (last 24 Hours): {quotes?.USD.percent_change_24h}
      </PriceItem>
    </PriceContainer>
  );
};

export default Price;
