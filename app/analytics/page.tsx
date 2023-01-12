'use client';

import React from "react";

export default () => {
    return (<section className="section">
        <div className="text">Analytics</div>
        <div className={ "info" }>
            <div className={ "card flex-column w-fit" }>
                <div className={ "text" }>#TEXT</div>
                <div className={ "text" } style={{
                    padding: "0 10px",
                    fontSize: 20,
                    inlineSize: 226,
                    overflowWrap: "break-word"
                }}>#TEXT#TEXT#TEXT#TEXT#TEXT#TEXT#TEXT#TEXT#TEXT#TEXT#TEXT#TEXT#TEXT#TEXT#TEXT#TEXT#TEXT#TEXT</div>
                <input type={ "button" } value={ "Apply" } className={ "card-button" }/>
            </div>
        </div>
    </section>)
}
