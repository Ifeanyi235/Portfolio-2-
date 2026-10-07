import React, { useState, useEffect, useRef, forwardRef } from "react";
import {
    motion,
    animate,
    useMotionValue,
    useReducedMotion,
} from "framer-motion";
import { useNavigate } from "react-router-dom";

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";
const API_URL = process.env.REACT_APP_API_URL;

async function getJson(path, signal) {
    const response = await fetch(`${API_URL}${path}`, { signal });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Request failed");
    }

    return response.json();
}

function getFolderKey(folder, index) {
    return folder.id ?? folder._id ?? index;
}

/**
 * Renders exactly the same <motion.div> (and children) as before.
 *
 * Each item owns a motion value and drives it with animate(). Pausing uses the
 * animation's own pause()/play(), so an item resumes from the exact spot it
 * stopped at, at the original speed, and its loop keeps the original start
 * and end points.
 */
function CarouselItem({
    folder,
    row,
    windowWidth,
    started,
    paused,
    onFirstItemLeave,
    onPlayVideo,
    isLeader,
}) {
    const wide = windowWidth > 1000;
    const prefersReducedMotion = useReducedMotion();

    // Same ranges as the original code.
    const firstIntroEnd = wide ? windowWidth - 75 : 935;
    const firstLoopFrom = wide ? -windowWidth : -984;
    const firstLoopTo = wide ? windowWidth - 80 : 936;
    const secondStart = wide ? -((windowWidth * 2) + 80) : ((-936 * 2) - 48);

    const x = useMotionValue(row === "first" ? 0 : secondStart);
    const controlsRef = useRef(null);
    const pausedRef = useRef(paused);
    pausedRef.current = paused;



    useEffect(() => {
        if (prefersReducedMotion) return undefined;

        let keyframes;
        let options;

        if (!started) {
            // Intro sweep: runs once.
            keyframes = [0, firstIntroEnd];
            options = { ease: "linear", duration: 15 }; 
        } else {
            options = {
                ease: "linear",
                duration: 30,
                repeat: Infinity,
                repeatType: "loop",
            };
            keyframes = [firstLoopFrom, firstLoopTo];
        }

        const controls = animate(x, keyframes, options);
        if (pausedRef.current) controls.pause();
        controlsRef.current = controls;

        return () => {
            controls.stop();
            controlsRef.current = null;
        };
    }, [
        started,
        prefersReducedMotion,
        firstIntroEnd,
        firstLoopFrom,
        firstLoopTo,
        x,
    ]);

    useEffect(() => {
        const controls = controlsRef.current;
        if (!controls) return;

        if (paused) controls.pause();
        else controls.play();
    }, [paused]);

    return (
        <motion.div
            style={{ x }}
            viewport={{ once: false }}
            onViewportLeave={() => {
                if (isLeader && !started) onFirstItemLeave();
            }}
            id=""
            className="flx flx-drc"
        >
            <div>
                <img
                    src={folder.image ? `${API_URL}${folder.image.url}` : undefined}
                    alt={folder.title}
                />
                <h1>{folder.title}</h1>
                <p>{folder.description}</p>
                <button
                    type="button"
                    onClick={() =>
                        onPlayVideo(`${API_URL}${folder.video.shareUrl}`)
                    }
                >
                    Play Video
                </button>
            </div>
        </motion.div>
    );
}

function CarouselItem1({
    folder,
    row,
    windowWidth,
    started,
    paused,
    onFirstItemLeave,
    onPlayVideo,
    isLeader,
}) {
    const wide = windowWidth > 1000;
    const prefersReducedMotion = useReducedMotion();

    // Same ranges as the original code.
    const secondStart = wide ? -((windowWidth * 2) + 80) : ((-936 * 2) - 48);

    const x = useMotionValue(row === "first" ? 0 : secondStart);
    const controlsRef = useRef(null);
    const pausedRef = useRef(paused);
    pausedRef.current = paused;



    useEffect(() => {
        if (prefersReducedMotion) return undefined;

        let keyframes;
        let options;

        options = {
            ease: "linear",
            duration: 30,
            repeat: Infinity,
            repeatType: "loop",
        };
        keyframes = [secondStart, 0];
        

        const controls = animate(x, keyframes, options);
        if (pausedRef.current) controls.pause();
        controlsRef.current = controls;

        return () => {
            controls.stop();
            controlsRef.current = null;
        };
    }, [
        prefersReducedMotion,
        secondStart,
        x,
    ]);

    useEffect(() => {
        const controls = controlsRef.current;
        if (!controls) return;

        if (paused) controls.pause();
        else controls.play();
    }, [paused]);

    return (
        <motion.div
            style={{ x }}
            viewport={{ once: false }}
            onViewportLeave={() => {
                if (isLeader && !started) onFirstItemLeave();
            }}
            id=""
            className="flx flx-drc"
        >
            <div>
                <img
                    src={folder.image ? `${API_URL}${folder.image.url}` : undefined}
                    alt={folder.title}
                />
                <h1>{folder.title}</h1>
                <p>{folder.description}</p>
                <button
                    type="button"
                    onClick={() =>
                        onPlayVideo(`${API_URL}${folder.video.shareUrl}`)
                    }
                >
                    Play Video
                </button>
            </div>
        </motion.div>
    );
}

const Project = forwardRef((props, ref) => {
    const [folders, setFolders] = useState([]);
    const [playingVideo, setPlayingVideo] = useState(null);
    const [started, setStarted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const navigate = useNavigate();

    // Keep the width-based ranges in sync with the window.
    useEffect(() => {
        const onResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // Load the gallery; abort if the component unmounts mid-request.
    useEffect(() => {
        const controller = new AbortController();

        async function loadGallery() {
            try {
                const foldersData = await getJson(
                    "/api/folders",
                    controller.signal
                );
                setFolders(foldersData.folders ?? []);
            } catch (requestError) {
                if (requestError.name === "AbortError") return;
                // Nothing may be added to the DOM, so report to the console.
                console.error("Failed to load projects:", requestError.message);
            }
        }

        loadGallery();

        return () => controller.abort();
    }, []);

    // Close the video player with Escape.
    useEffect(() => {
        if (!playingVideo) return undefined;

        const onKeyDown = (event) => {
            if (event.key === "Escape") setPlayingVideo(null);
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [playingVideo]);

    const firstFolders = folders.slice(0, 5);
    const secondFolders = folders.slice(0, 5);

    // Carousels also hold still while a video is playing.
    const paused = isHovered || Boolean(playingVideo);

    const pauseBothCarousels = () => setIsHovered(true);
    const resumeBothCarousels = () => setIsHovered(false);

    // Only resume on blur when focus actually leaves the wrapper.
    const handleBlurCapture = (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            resumeBothCarousels();
        }
    };

    return (
        <div id="project" className="flx flx-drc" ref={ref}>
            <div className="grd contents">
                <div
                    className="grd contents"
                    onMouseEnter={pauseBothCarousels}
                    onMouseLeave={resumeBothCarousels}
                    onFocusCapture={pauseBothCarousels}
                    onBlurCapture={handleBlurCapture}
                >
                    {firstFolders.map((folder, index) => (
                        <CarouselItem
                            key={getFolderKey(folder, index)}
                            folder={folder}
                            row="first"
                            windowWidth={windowWidth}
                            started={started}
                            paused={paused}
                            isLeader={index === 0}
                            onFirstItemLeave={() => setStarted(true)}
                            onPlayVideo={setPlayingVideo}
                        />
                    ))}
                </div>

                <div
                    className="grd contents"
                    onMouseEnter={pauseBothCarousels}
                    onMouseLeave={resumeBothCarousels}
                    onFocusCapture={pauseBothCarousels}
                    onBlurCapture={handleBlurCapture}
                >
                    {secondFolders.map((folder, index) => (
                        <CarouselItem1
                            key={getFolderKey(folder, index)}
                            folder={folder}
                            row="second"
                            windowWidth={windowWidth}
                            started={started}
                            paused={paused}
                            isLeader={false}
                            onFirstItemLeave={() => {}}
                            onPlayVideo={setPlayingVideo}
                        />
                    ))}
                </div>
            </div>

            <div>
                <button onClick={() => navigate("/project")}>
                    View More
                </button>
            </div>

            {playingVideo && (
                <section id="video-player">
                    <video
                        src={playingVideo}
                        controls
                        autoPlay
                        preload="metadata"
                    />

                    <button
                        type="button"
                        onClick={() => setPlayingVideo(null)}
                    >
                        Close video
                    </button>
                </section>
            )}
        </div>
    );
});

Project.displayName = "Project";

export default Project;
