import React, {forwardRef} from "react";

const Contact = forwardRef((props, ref) => {

    return (
        <div id="contact" className="flx flx-drc" ref={ref}>
            <div className="flx flx-drc">
                <div id="quote" className="flx">
                    <div className="flx flx-drc font-body">
                        <p>Let's work together on your next project</p>
                        <p>I’m excited to bring your ideas to life through creative and engaging video content. I look forward to working with you.</p>
                    </div>

                    <div className="flx">
                        <button>CONTACT</button>
                    </div>
                </div>

                <div className="flx">
                    <button onClick={() => props.scrollToNext(props.pages.home, 1)}>HOME</button>
                    <button onClick={() => props.scrollToNext(props.pages.product, 2)}>PRODUCT</button>
                    <button onClick={() => props.scrollToNext(props.pages.about, 3)}>PROJECT</button>
                </div>
            </div>

            <div></div>
        </div>
    )
});

export default Contact;