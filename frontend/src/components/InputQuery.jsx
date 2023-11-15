const InputQuery = () => {
    return(
        <div class="container-fluid">
            <div class="card">
                <div class="card-header">
                    Input SQL Query
                </div>
                <div class="card-header">
                  Ensure that the query is properly formatted and is a valid SQL query.
                  You can type your query across mulitple lines using the 'Enter' key. We do not support deep nesting of queries at the moment, but one level nesting is fine.
                </div>
                <div class="card-body">
                    <textarea class="form-control" rows="9" id="exampleFormControlTextarea1"></textarea>
                </div>
            </div>  
        </div>
    )
}
export default InputQuery;