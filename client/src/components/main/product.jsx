import React, {forwardRef} from "react";
import {motion} from "framer-motion"

const Product = forwardRef((props, ref) => {
    return (
        <div id="product" className="grd" ref={ref}>
            <div id="project-row-1" className="grd"> 
                <div id="project-cell-1" className="flx flx-drc">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.5">
                            <path d="M2.5 12c0-4.478 0-6.718 1.391-8.109S7.521 2.5 12 2.5c4.478 0 6.718 0 8.109 1.391S21.5 7.521 21.5 12c0 4.478 0 6.718-1.391 8.109S16.479 21.5 12 21.5c-4.478 0-6.718 0-8.109-1.391S2.5 16.479 2.5 12Z" />
                            <path stroke-linecap="round" d="M7 16v-4m0 0V8.571C7 8.218 7.234 8 7.571 8H9a2 2 0 1 1 0 4zm7-1.5v2m0 0V16m0-3.5c.561-.748 1.083-1.68 2-1.934q.231-.065.5-.066" />
                        </g>
                    </svg>
                    <p>Adobe Premier Pro</p>
                    <p>A video editing software used to enhance video and audio.</p>
                    {/* <a>Certificate</a> */}
                </div>

                <div id="project-cell-2" className="flx flx-drc">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path fill="#fff" fill-rule="evenodd" d="M24.189 6.442V2.671l-4.535 2.383V4.91c.002-1.505-1.078-2.411-2.638-2.411H2.64C.993 2.5 0 3.407 0 4.91v3.81L6.354 12L0 15.316v3.8C0 20.595 1 21.5 2.64 21.5h14.373c1.56 0 2.639-.907 2.639-2.382v-.197l4.536 2.409v-3.828L13.64 12l10.55-5.557zM9.982 13.873l7.797 4.083H2.157zm7.741-7.828l-7.742 4.057l-7.825-4.057z" />
                    </svg>

                    <p>CapCut</p>
                    <p>A user-friendly video editing app designed for quick and creative editing</p>
                    {/* <a>Certificate</a> */}
                </div>
                    
                <div id="project-cell-3" className="flx flx-drc">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.03em" height="1em" viewBox="0 0 256 250">
                        <path d="M0 0h256v250H0z" fill="none" />
                        <rect width="256" height="249.6" fill="#00005b" rx="42.5" />
                        <path fill="#99f" d="M102.843 149.333H63.172L55.1 174.454a2.02 2.02 0 0 1-1.901 1.547L32.947 176q-1.72 0-1.202-1.89l34.347-98.509l.343-1.035l.114-.354l.23-.74c.114-.382.228-.787.343-1.226c.45-2.291.68-4.62.687-6.955a1.063 1.063 0 0 1 1.202-1.202h27.306q1.2 0 1.374.859l38.983 109.335q.515 1.718-1.03 1.717h-22.326a1.59 1.59 0 0 1-1.717-1.202zm-33.488-21.181h27.134l-.387-1.277l-.621-2.022l-.909-2.896l-1.745-5.467l-1.662-5.254l-3.092-9.789a336 336 0 0 1-2.46-8.138l-.878-3.096l-.948-3.393l-.866-3.147h-.172a139 139 0 0 1-3.136 12.23l-1.16 3.723l-2.79 9l-1.414 4.585q-.383 1.242-.765 2.456l-.76 2.398l-.756 2.342l-.752 2.284l-.748 2.227q-.559 1.65-1.113 3.234m130.518 11.404h-33.831a24.1 24.1 0 0 0 3.263 9.461a17.67 17.67 0 0 0 7.813 6.44a32.6 32.6 0 0 0 13.653 2.676a62 62 0 0 0 11.077-1.216a40.8 40.8 0 0 0 9.523-2.482q.859-.685.86.858v16.315c.028.445-.061.889-.259 1.288c-.196.312-.46.576-.772.773a43.7 43.7 0 0 1-10.64 3.17a75.5 75.5 0 0 1-15.113 1.287q-11.814 0-19.917-3.545l-.52-.233a36.4 36.4 0 0 1-13.394-10.132a39.7 39.7 0 0 1-7.385-13.996A55.1 55.1 0 0 1 142 134.678a54.1 54.1 0 0 1 2.662-16.916a44.2 44.2 0 0 1 7.985-14.597a38.4 38.4 0 0 1 12.88-10.133c5.037-2.46 10.991-3.343 17.86-3.343a38.8 38.8 0 0 1 16.573 3.263a29.2 29.2 0 0 1 11.248 8.495a39 39 0 0 1 6.354 12.107a43.2 43.2 0 0 1 2.061 13.052q0 3.78-.257 6.87l-.153 1.764l-.16 1.674l-.095.848l-.022.179a1.556 1.556 0 0 1-1.545 1.374l-.471.01l-.587.03l-.457.033l-1.068.091l-.938.093q-.383.04-.795.075l-.851.067l-.909.06l-.965.05l-1.022.043l-.533.018l-1.107.03c-1.095.027-2.217-.041-3.368-.125l-1.746-.128a40 40 0 0 0-2.7-.106m-33.831-15.645h23.386l1.992-.013l1.354-.019l.877-.02l.984-.034a6 6 0 0 0 2.49-.825v-1.03a13.7 13.7 0 0 0-.686-3.95a14.03 14.03 0 0 0-13.91-9.79a14.92 14.92 0 0 0-14.169 8.072a24.8 24.8 0 0 0-2.318 7.61" />
                    </svg>
                    <p>Adobe After Effect</p>
                    <p>A motion graphics software used to create animations, compositing, and visual effects.</p>
                    {/* <a>Certificate</a> */}
                </div>
            </div>

            <div id="project-row-2" className="grd">
                <div id="project-cell-4" className="flx flx-drc">
                    <h1>1</h1>
                    <p>Year experience </p>
                </div>

                <div id="project-cell-5" className="grd">
                    <div className="flx flx-drc">
                        <h1>3</h1>
                        <p>Clients</p>
                    </div>

                    <div className="flx flx-drc">
                        <h1>1</h1>
                        <p>Year experience </p>
                    </div>
                </div>

                <div id="project-cell-6" className="grd">
                    <div className="flx flx-drc">
                        <h1>50+</h1>
                        <p>Completed Projects</p>
                    </div>

                    <div className="flx flx-drc">
                        <h1>10</h1>
                        <p>Achievements</p>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default Product;