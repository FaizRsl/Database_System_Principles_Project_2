const Footer = ({firstButton, secondButton, thirdButton}) =>  {
    const buttonStyle = {
        padding: '10px',
        width: '150px',
        height: '50px' // Set your desired width
      };

    return(
        <div className="col-md-6">
            <div class="row">
            <div class="col-4">
                <button type="button" className="btn btn-secondary btn-lg" style={buttonStyle}>{firstButton}</button>
            </div>
            <div class="col-4">
                <button type="button" className="btn btn-secondary btn-lg" style={buttonStyle}>{secondButton}</button>
            </div>
            <div class="col-4">
                <button type="button" className="btn btn-secondary btn-lg" style={buttonStyle}>{thirdButton}</button>
            </div>
            </div>
    </div>
    )
}

export default Footer;