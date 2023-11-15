const QEPCard = () => {
    return(
        <div class="card">
            <div class="card-header" style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>
                Query Plan Excution
            </div>
            <div class="card-body">
                {/* Disabled for now */}
                <textarea class="form-control" rows="20" id="exampleFormControlTextarea1" disabled></textarea>
            </div>
        </div>
    )
}

export default QEPCard;