import { useParams } from "react-router-dom";

import Pancakeswap from '../../../apollo/pancakeswap';
import Bigswap from '../../../apollo/bigswap';
import Apeswap from '../../../apollo/apeswap';
import Babyswap from '../../../apollo/babyswap';
import Bakeryswap from '../../../apollo/bakeryswap';
import Sushiswap from '../../../apollo/sushiswapbsc';
import Knightswap from '../../../apollo/knightswap';
import Kyberswap from '../../../apollo/kyberswap';


function Bsc() {

  const { defi } = useParams()

  return (
    <>
            <section className="board pools">

                <Pancakeswap view={true} />

                <Bigswap view={true} />

                <Apeswap view={true} />

                <Babyswap view={true} />

            </section>

            <section className="board pools">

                <Bakeryswap view={true} />

                <Sushiswap view={true} />

                <Knightswap view={true} />

                <Kyberswap view={true} />

            </section>

    </>
  );
}

export default Bsc;
