const ExplanationCard = ({}) => {
    return (
        <div class="card">
            <div class="card-header" style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>
            Natural Description
            </div>
            <div class="card-body">
                {/* Disabled for now */}
                <textarea class="form-control" rows="20" id="exampleFormControlTextarea1" disabled></textarea>
            </div>
        </div>
    )
}

export default ExplanationCard;