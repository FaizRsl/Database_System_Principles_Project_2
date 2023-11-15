import Info from "../components/Info";
import ViewGraphCard from "../components/ViewGraphCard";
import Footer from "../components/Footer";
const Graph = () => {
    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-12" style={{textAlign: 'center', padding: '10px'}}>
                    <h3> Graph</h3>
                </div>
                {/* <hr style={{width: '80%', margin: 'auto', border: '1.5px solid black'}}/> */}
                <div class="col-12" style={{paddingLeft: '30px', paddingRight: '30px', paddingTop: '5px'}}>
                    <Info/>
                </div>
                <div class="col-12" style={{paddingLeft: '30px', paddingRight: '30px', paddingTop: '10px'}}>
                    <ViewGraphCard/> 
                </div>
                <div class="row" style={{padding: '10px', alignContent: 'center', justifyContent: 'center', textAlign: 'center'}}>
                    <Footer firstButton="Home" secondButton="Reset" thirdButton="QEP"/>
                </div>

            </div>
        </div>
    )
}

export default Graph;