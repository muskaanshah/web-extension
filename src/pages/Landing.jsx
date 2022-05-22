import "./landingpage.css";
import "./loader.css";
import { Focus } from "../components/Focus/Focus";
import { Weather } from "../components/Weather/Weather";
import { GoogleSearch } from "../components/GoogleSearch/GoogleSearch";
import { Quote } from "../components/Quote/Quote";
import { Countdown } from "../components/countdown/Countdown";
import { TimeDisplay } from "../components/TimeDisplay/TimeDisplay";
import { TodoWrapper } from "../components/Todo/TodoWrapper";
import { Settings } from "../components/Settings/Settings";
import { useState } from "react";

function Landing() {
    const [quote, setQuote] = useState({ text: "", author: "" });
    const [updateQuote, setUpdateQuote] = useState(false);
    return (
        <div className="landingimage overlay-wrapper">
            <div className="overlay">
                <TimeDisplay />
                <Focus />
                <Settings setQuote={setQuote} setUpdateQuote={setUpdateQuote} />
                <Weather />
                <Countdown />
                <Quote setQuote={setQuote} quote={quote} updateQuote={updateQuote} />
                <TodoWrapper />
                <GoogleSearch />
            </div>
        </div>
    );
}

export { Landing };
