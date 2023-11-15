import InputQuery from "../components/InputQuery";
import PredicatesBar from "../components/PredicatesBar";
import Predicates from "../components/Predicates";
import Footer from "../components/Footer";

const Main = () => {
    return (
        <div class="container-fluid">
            <div class="row" style={{padding: '10px', alignContent: 'center'}}>
                <PredicatesBar/>
            </div>
            <div class="row" style={{padding: '10px'}}>
                <Predicates/>
            </div>
            <div class="row" style={{padding: '10px'}}>
                <InputQuery/>
            </div>
            <div class="row" style={{padding: '10px', alignContent: 'center', justifyContent: 'center', textAlign: 'center'}}>
                <Footer firstButton="Reset" secondButton="Generate" thirdButton="QEP"/>
            </div>
        </div>
    )
}

export default Main;