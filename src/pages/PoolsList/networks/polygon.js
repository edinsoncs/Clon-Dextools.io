import { useParams } from "react-router-dom";

import Quickswap from '../../../apollo/quickswap';
import KyberswapPoly from '../../../apollo/kyberswappoly';

function Polygon() {

  const { defi } = useParams()

  return (
    <>
            <section className="board pools">

                <Quickswap view={true} />
                <KyberswapPoly view={true} />

            </section>



    </>
  );
}

export default Polygon;
