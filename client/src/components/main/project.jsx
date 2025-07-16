import React, {forwardRef} from "react";

const Project = forwardRef((props, ref) => {
    return (
        <div id="project" className="flx flx-drc"ref={ref}>
            <div className="grd">
                <div>
                    1
                </div>

                <div>
                    2
                </div>

                <div>
                    3
                </div>

                <div>
                    4
                </div>

                <div>
                    5
                </div>
            </div>

            <div></div>
        </div>
    )
});

export default Project;