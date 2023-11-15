const Info= () => {
    return(
        <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            DBMS Selection Plan
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                        <p><u>Heuristics for selecting a join method:</u></p>
                        <p><b>Hash Join:</b> This join method is used when join condition uses an equality operator '=' and both sides of the relations are large.</p>
                        <p><b>Merge Joins:</b> This join method is similar to hash join except that both relations are sorted. Could be implemented when cost savings compared to hash join is greater than cost to Sort each relation.</p>
                        <p><b>Nested Loop Joins:</b> This join method is used if one side of the relation has only a few rows or if the join operator does not use an equality operator '='.</p>

                        <p><u>Heuristic for join order:</u></p>
                        <p><b>Join order</b> Relations could possibly switch positions from inner to outer loop when it is a build relation (smaller relation in outer loop).</p>

                        <p><u>Heuristics for selecting an access method:</u></p>
                        <p><b>Sequential Scan:</b> This access method is used for retrieval of large portions (approximately {">"} 5-10%) of a relation.</p>
                        <p><b>Index Scan:</b> This access method is used when only a few rows of a relation are to be accessed from a relation.</p>
                        <p><b>Bitmap Scan:</b> This access method is used when the number of rows to be read from a relation is too much for index scan to be efficient but too little for sequential scan.</p>

                        <p><u>Heuristics for additional operations:</u></p>
                        <p><b>Sort:</b> Used when output or relation is required to be sorted. Often used before Merge Joins.</p>
                        <p><b>Aggregate:</b> This operation is used to compute single results from multiple input rows. E.g of aggregate functions used: COUNT, SUM, AVG (AVERAGE), MAX (MAXIMUM) and MIN (MINIMUM).</p>
                        <p><b>Gather Merge:</b> This operation indicates that the portion of the plan below it is run in parallel.</p>
                        <p><b>Hash:</b> This operation is used to hash rows of a subtree on their join key values into a hash table before Hash Join.</p>
                        <p><b>Incremental Sort:</b> This operation is used to accelerate sorting data when data sorted from earlier parts of a query are already sorted.</p>
                        </div>
                    </div>
                </div>
                </div>
    )
}

export default Info;