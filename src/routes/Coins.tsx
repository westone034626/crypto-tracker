import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { fetchAllCoins } from '../api';
import Toggle from 'react-switch';
import { useTheme } from '../ThemeProvider';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: #2f3640;
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  grid-column: 2 / span 1;
`;
const ThemeTogglebutton = styled(Toggle)`
  justify-self: end;
  pointer: cursor;
`;
const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  // const [coins, setCoins] = useState<CoinInterface[]>([]);
  // const [loading, setLoading] = useState(true);
  const { isLoading: loading, data: coins } = useQuery<ICoin[]>(
    'allCoins',
    fetchAllCoins
  );
  const { isDarkMode, onToggleTheme } = useTheme() ?? {
    isDarkMode: true,
    onToggleTheme: () => {},
  };

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch('https://api.coinpaprika.com/v1/coins');
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <Container>
      <Helmet>
        <title>??????</title>
      </Helmet>
      <Header>
        <Title>??????</Title>
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
        <CoinsList>
          {coins?.slice(0, 100).map((coin) => {
            return (
              <Coin key={coin.id}>
                <Link
                  to={{
                    pathname: `/${coin.id}`,
                    state: { name: coin.name },
                  }}
                >
                  <Img
                    // ?????? api??? path??? ??? ??????????????? ????????? ???????????? ??????????????? ?????? toLowerCase()?????? ?????? ?????????
                    src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  {coin.name} &rarr;
                </Link>
              </Coin>
            );
          })}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;

// ???????????? ??????(????????????: high)
// gh-pages??? ????????????

// ??????????????? ?????? ?????????(????????????: low)
// 1. scroll??? ???????????? progress bar ??????(position sticky)
// 2. Header??? ??????????????? ????????????
// 3. Header ????????? sticky?????? ????????????
// 4. ????????? ????????? ????????? floating button ??????
// 5. useMemo, useCallback, React.memo ???????????????
