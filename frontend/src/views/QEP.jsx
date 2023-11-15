import Footer from "../components/Footer";
import QEPCard from "../components/QEPCard";
import ExplanationCard from "../components/ExplanationCard";
const QEP = () => {
    return (
        <div class="container-fluid">
        <div class="row">
            <div class="col-12" style={{textAlign: 'center', padding: '10px'}}>
                <h3> QEP and Explaination</h3>
            </div>
            <div class="row">
                <div class="col-6" style={{paddingLeft: '30px', paddingRight: '30px', paddingTop: '5px'}}>
                    <QEPCard/>
                </div>
                <div class="col-6" style={{paddingLeft: '30px', paddingRight: '30px', paddingTop: '5px'}}>
                    <ExplanationCard/>
                </div>  
            </div>
            <div class="row" style={{paddingTop: '20px', alignContent: 'center', justifyContent: 'center', textAlign: 'center'}}>
                <Footer firstButton="Home" secondButton="Reset" thirdButton="Graph"/>
            </div>

        </div>
    </div>
    )
}

export default QEP;