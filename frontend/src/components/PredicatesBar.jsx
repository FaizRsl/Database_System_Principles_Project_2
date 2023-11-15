

const PredicatesBar = () => {
    return(
        <div class="container-fluid">
            <div class="row" style={{alignItems: 'center', justifyContent: 'center'}}>
                <div class="col-12">
                    <span style={{fontSize: '1.2rem', marginLeft: '8px'}}> Selected Predicates</span>
                     <input class="form-control" type="text" value="Selected Predicates" style={{width: '100%', alignItems: 'center'}} aria-label="Disabled input example" disabled readonly />
                </div>
            </div>
        </div>

    )
}
export default PredicatesBar;