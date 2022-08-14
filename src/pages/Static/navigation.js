import './navigation.css';
import { GiCrackedDisc } from "react-icons/gi";


function Navigation(){


    return (<> 
    
        <section className='main__Menu'>
            <div className='container'>
                <div className='main__Menu--Primary d-flex justify-content-between align-items-center'>
                    <h1>
                        Ryoshi
                    </h1>
                    <nav>
                        <ul>
                            <li>
                                <a href='#'> <GiCrackedDisc/> Board</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
    
    </>)

}

export default Navigation;