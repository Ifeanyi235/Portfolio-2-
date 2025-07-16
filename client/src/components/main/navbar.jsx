import React from "react";

function Navbar (props) {
    return (
        <div id="navbar" className="flx">
            <div id="components" className="flx">
                <button onClick={() => props.scrollToNext(props.pages.home, 1)}>HOME</button>
                <button onClick={() => props.scrollToNext(props.pages.product, 2)}>PRODUCT</button>
                <button onClick={() => props.scrollToNext(props.pages.about, 3)}>PROJECT</button>
                <button onClick={() => props.scrollToNext(props.pages.contact, 4)}>CONTACT</button>
            </div>
        </div>
    )
}

export default Navbar;