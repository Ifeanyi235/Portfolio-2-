import React , {useState, useRef, useEffect} from "react";
import NavBar from "./navbar";
import Home from "./home";
import Product from "./product";
import Project from "./project";
import Contact from "./contact";
import Footer from "./footer";

function Main () {

    const [pageNumber, setPageNumber] = useState(1);

    const pages = {
        home: useRef(),
        product: useRef(),
        about: useRef(),
        contact: useRef(),
    };

    useEffect(() => {
        const handleScroll = () => {
            const page = Math.ceil(window.scrollY / window.innerHeight) + 1;
            5 > page > 0 && setPageNumber(page);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    function scrollToNext (pageref, currentPosition) {
        // console.log(window.scrollY);
        console.log(window.scrollY);
        const realign = ((pageNumber - 1) * window.innerHeight) - window.scrollY;
        if (pageNumber <= currentPosition) {
            pageref.current.scrollIntoView({ behavior: "smooth" }); 
        } else {
            console.log("current:", currentPosition, "page:", pageNumber, "realign:", realign);
            const difference = (currentPosition - pageNumber);
            console.log(difference);
            window.scrollBy({
                top: ((window.innerHeight * difference) + realign),
                behavior: "smooth"
            });
        }
        setPageNumber(currentPosition);
    };

    return (
        <div id="main" className="flx flx-drc">
            <NavBar pages={pages} scrollToNext={scrollToNext} />
            <Home ref={pages.home} />
            <Product ref={pages.product} />
            <Project ref={pages.about} />
            <Contact ref={pages.contact} pages={pages} scrollToNext={scrollToNext} />
            <Footer/>
        </div>
    )
}

export default Main;