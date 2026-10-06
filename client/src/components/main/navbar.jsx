import React from "react";

function Navbar (props) {
    return (
        <div id="navbar" className="flx">
            <div>
                <h1>Tega </h1>
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 1024 1024">
                    <path d="M0 0h1024v1024H0z" fill="none" />
                    <path fill="currentColor" d="M912 302.3L784 376V224c0-35.3-28.7-64-64-64H128c-35.3 0-64 28.7-64 64v576c0 35.3 28.7 64 64 64h592c35.3 0 64-28.7 64-64V648l128 73.7c21.3 12.3 48-3.1 48-27.6V330c0-24.6-26.7-40-48-27.7M328 352c0 4.4-3.6 8-8 8H208c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h112c4.4 0 8 3.6 8 8zm560 273l-104-59.8V458.9L888 399z" />
                </svg>
            </div>



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