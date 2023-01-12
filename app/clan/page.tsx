import React from "react";

const Card = () => (<div className={ "card flex-column w-fit" }>
    <div style={{ display: "flex" }}>
        <img src={ "img/SilverStars_frei_ohne_R.png" } width={ 100 } alt={ "" }/>
        <div className={ "text" }>#TEXT<br></br>#TEXT</div>
    </div>
    <div className={ "text" } style={{
        fontSize: 20,
        padding: 10
    }}>Game: #TEXT</div>
    <div className={ "text" } style={{
        fontSize: 20,
        padding: "0 10px",
        inlineSize: 200,
        overflowWrap: "break-word"
    }}>Description: #TEXT#TEXT#TEXT#TEXT#TEXT#TEXT#TEXT</div>
    <input className={ "card-button" } type={ "button" } value={ "JOIN US" }/>
</div>);

export default () => {
    return (<section className="section">
        <div className="text">Clan</div>
        <div className={ "info" }>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
            <Card/>
        </div>
    </section>)
}
