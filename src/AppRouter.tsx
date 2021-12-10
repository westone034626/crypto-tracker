import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
