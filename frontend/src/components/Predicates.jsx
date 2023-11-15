

const Predicates = () => {
    return(
        <div class="container-fluid">
            <div class="row">
            <div class="col-md-3">
                <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Lineitem
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <ul class="list-group">
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">I_orderkey</label>
                                </li>
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">I_partkey</label>
                                </li>
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">I_suppkey</label>
                                </li>
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">I_linenumber</label>
                                </li>
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">I_quantity</label>
                                </li>
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">I_extendedprice</label>
                                </li>
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">I_discount</label>
                                </li>
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">I_tax</label>
                                </li>
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">I_returnflag</label>
                                </li>
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">I_shipdate</label>
                                </li>
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">I_commitdate</label>
                                </li>
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">I_receiptdate</label>
                                </li>
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">I_shipinstruct</label>
                                </li>
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">I_shipmode</label>
                                </li>
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">I_comment</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Nation
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <ul class="list-group">
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">n_nationkey</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Customer
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <ul class="list-group">
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">c_custkey</label>
                                </li>
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">c_acctbal</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Supplier
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                           <ul class="list-group">
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">s_suppkey</label>
                                </li>
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">s_acctbal</label>
                                </li>
                           </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-3">
                <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Part
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <ul class="list-group">
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">p_partkey</label>
                                </li>
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">p_retailprice</label>
                                </li>
                            </ul> 
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                           PartSupp
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <ul class="list-group">
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">ps_partkey</label>
                                </li>
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">ps_suppkey</label>
                                </li>
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">ps_availqty</label>
                                </li>
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">ps_supplycost</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div class="col-md-3">
                <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Region
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <ul class="list-group">
                                <li style={{marginLeft: '7px'}}>
                                    <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                    <label class="form-check-label" for="firstCheckbox">r_regionkey</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                           Orders
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                        <ul class="list-group">
                            <li style={{marginLeft: '7px'}}>
                                <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                <label class="form-check-label" for="firstCheckbox">o_orderkey</label>
                            </li>
                            <li style={{marginLeft: '7px'}}>
                                <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                <label class="form-check-label" for="firstCheckbox">o_custkey</label>
                            </li>
                            <li style={{marginLeft: '7px'}}>
                                <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                <label class="form-check-label" for="firstCheckbox">o_orderstatus</label>
                            </li>
                            <li style={{marginLeft: '7px'}}>
                                <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                <label class="form-check-label" for="firstCheckbox">o_totalprice</label>
                            </li>
                            <li style={{marginLeft: '7px'}}>
                                <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                <label class="form-check-label" for="firstCheckbox">o_orderdate</label>
                            </li>
                            <li style={{marginLeft: '7px'}}>
                                <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                <label class="form-check-label" for="firstCheckbox">o_orderpriority</label>
                            </li>
                            <li style={{marginLeft: '7px'}}>
                                <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                <label class="form-check-label" for="firstCheckbox">o_clerk</label>
                            </li>
                            <li style={{marginLeft: '7px'}}>
                                <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                <label class="form-check-label" for="firstCheckbox">o_shippriority</label>
                            </li>
                            <li style={{marginLeft: '7px'}}>
                                <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                                <label class="form-check-label" for="firstCheckbox">o_comment</label>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}

export default Predicates;
