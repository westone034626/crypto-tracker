import Toggle from 'react-switch';
import LinesEllipsis from 'react-lines-ellipsis';

import {
  Switch,
  Route,
  useLocation,
  useParams,
  useRouteMatch,
  useHistory,
  Link,
} from 'react-router-dom';
import styled from 'styled-components';
import Chart from './Chart';
import Price from './Price';
import { useQuery } from 'react-query';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import { Helmet } from 'react-helmet';
import { useTheme } from '../ThemeProvider';

const Title = styled(LinesEllipsis)`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  grid-column: 2 / span 1;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  place-items: center center;
`;

const Backbutton = styled.div`
  justify-self: start;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
`;

const ThemeTogglebutton = styled(Toggle)`
  justify-self: end;
  pointer: cursor;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  span {
    color: white;
  }
  span:first-child {
    font-size: 10px;
    font-weight: '400';
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: '400';
  background-color: rgba(0, 0, 0, 0.5);

  border-radius: 10px;
  color: ${(props) => (props.isActive ? props.theme.accentColor : 'white')};
  a {
    padding: 7px 0px;
    display: block;
  }
`;
interface RouteParam {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

export interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

function Coin() {
  const history = useHistory();
  const { coinId } = useParams<RouteParam>();
  const { state } = useLocation<RouteState>();
  const chartMatch = useRouteMatch('/:coinId/chart');
  const priceMatch = useRouteMatch('/:coinId/price');
  const { isLoading: infoDataLoading, data: infoData } = useQuery<InfoData>(
    ['info', coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: priceDataLoading, data: priceData } = useQuery<PriceData>(
    ['price', coinId],
    () => fetchCoinTickers(coinId),
    { refetchInterval: 5000 }
  );
  const loading = infoDataLoading || priceDataLoading;

  const { isDarkMode, onToggleTheme } = useTheme() ?? {
    isDarkMode: true,
    onToggleTheme: () => {},
  };
  // const [loading, setLoading] = useState(true);
  // const [infoData, setInfoData] = useState<InfoData>();
  // const [priceData, setPriceData] = useState<PriceData>();

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const infoData = await (
  //         await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //       ).json();
  //       const priceData = await (
  //         await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //       ).json();
  //       setLoading(false);
  //       setInfoData(infoData);
  //       setPriceData(priceData);
  //       console.log(infoData);
  //       console.log(priceData);
  //     } catch (error) {
  //       console.log('error: ', error);
  //     }
  //   })();
  // }, [coinId]);

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state?.name : loading ? 'Loading...' : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Backbutton onClick={history.goBack}>&larr;</Backbutton>
        <Title
          text={
            state?.name ? state?.name : loading ? 'Loading...' : infoData?.name
          }
          maxLine="1"
          ellipsis="..."
          trimRight
          basedOn="letters"
        />

        <ThemeTogglebutton
          uncheckedIcon={isDarkMode}
          checkedIcon={isDarkMode}
          checked={isDarkMode}
          onChange={onToggleTheme}
          activeBoxShadow="0 0 2px 3px #aaa"
          offHandleColor="#f5f6fa"
          onHandleColor="#2f3640"
          onColor="#f5f6fa"
          offColor="#2f3640"
        />
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>{priceData?.quotes.USD.price.toFixed(8)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`} replace>
                Chart
              </Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`} replace>
                Price
              </Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path="/:coinId/price">
              <Price data={priceData} />
            </Route>
            <Route path="/:coinId/chart">
              <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;

// 해야하는 것들

// 1. react-query를 이용하여 Coin 페이지의 infoData, priceData 정보를 fetch하자.
