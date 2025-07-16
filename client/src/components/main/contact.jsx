import React, {forwardRef} from "react";

const Contact = forwardRef((props, ref) => {

    return (
        <div id="contact" className="flx flx-drc" ref={ref}>
            <div className="flx flx-drc">
                <div id="quote" className="flx">
                    <div className="flx flx-drc font-body">
                        <p>Let's work together on your next project</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>

                    <div className="flx">
                        <button>CONTACT</button>
                    </div>
                </div>

                <div className="flx">
                    <button onClick={() => props.scrollToNext(props.pages.home, 1)}>HOME</button>
                    <button onClick={() => props.scrollToNext(props.pages.product, 2)}>PRODUCT</button>
                    <button onClick={() => props.scrollToNext(props.pages.about, 3)}>PROJECT</button>
                    <button onClick={() => props.scrollToNext(props.pages.contact, 4)}>CONTACT</button>
                </div>
            </div>

            <div></div>
        </div>
    )
});

export default Contact;