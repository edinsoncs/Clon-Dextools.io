import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link,
  useParams
} from "react-router-dom";

import Home from './Home';
import HomeBsc from './Home/homebsc';
import HomePolygon from './Home/homepolygon';
import View from './View';
import ViewBsc from './ViewBsc';
import ViewFormat from './ViewBsc/view-format';
import ViewPoly from './ViewPoly';
import News from './News';
import Pools from './Pools';
import Favorites from './Favorites';
import PoolsList from './PoolsList';
import PoolsListDefi from './PoolsListDefi';
import Launchpad from './Launchpad';
import LaunchpadView from './Launchpad/view';


import BoardFeed from './Board';
import BoardView from './Board';
import Settings from './User/settings';




function App(): JSX.Element {

    return (

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/bsc' element={<HomeBsc/>} />
        <Route path='/polygon' element={<HomePolygon/>} />

        <Route path='/board' element={<BoardFeed/>} />
        <Route path='/board/hashtag/:hastag' element={<BoardFeed/>} />
        <Route path='/board/view/:id' element={<BoardView/>} />
        <Route path='/user/settings' element={<Settings/>} />

        <Route path='/ether/:exchange/pair-explorer/:id' element={<View/>} />
        <Route path='/bsc/:exchange/pair-explorer/:id' element={<ViewBsc/>} />
        <Route path='/bsc/pancakeswap/pair-explorer/:id' element={<ViewFormat/>} />
        <Route path='/polygon/:exchange/pair-explorer/:id' element={<ViewPoly/>} />

        <Route path='/news' element={<News/>} />

        <Route path='/pools' element={<Pools/>} />
        <Route path='/pools/:defi' element={<PoolsList/>} />
        <Route path='/pools-list/:defi' element={<PoolsListDefi/>} />

        <Route path='/favorites' element={<Favorites/>} />

        //Static launchpad
        <Route path='/launchpad' element={<Launchpad/>} />
        <Route path='/launchpad/0x05633822A3f6AF31EaDa04e69124d1aEF12012FB' element={<LaunchpadView/>} />


      </Routes>

    )
}

export default App
