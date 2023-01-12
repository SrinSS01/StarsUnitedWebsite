import React from "react";

export default () => {
    return (<section className="section">
        <div className="text">Clan</div>
        <div className={ "info" }>
            <div className={ "card flex-column w-fit" }>
                <div style={{ display: "flex" }}>
                    <img src={ "img/SilverStars_frei_ohne_R.png" } width={ 100 } alt={ "" }/>
                    <div className={ "text" }>#TEXT<br></br>#TEXT</div>
                </div>
                <input className={ "card-button" } type={ "button" } value={ "JOIN US" }/>
            </div>
        </div>
    </section>)
}
