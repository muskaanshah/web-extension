import { useEffect, useState } from "react";
import axios from "axios";

const changeQuoteHandler = (setQuote) => {
    localStorage.removeItem("Quote");
    setQuote({ text: "", author: "" });
};
function Quote() {
    const [quote, setQuote] = useState({ text: "", author: "" });

    useEffect(() => {
        const random = Math.floor(Math.random() * 1643 - 1);
        (async () => {
            try {
                const res = await axios.get("https://type.fit/api/quotes");
                const initialQuote = JSON.parse(localStorage?.getItem("Quote"));
                if (!initialQuote) {
                    setQuote({
                        text: res.data[random].text,
                        author: res.data[random].author,
                    });
                    localStorage.setItem(
                        "Quote",
                        JSON.stringify({
                            text: res.data[random].text,
                            author: res.data[random].author,
                        })
                    );
                } else setQuote(initialQuote);
            } catch (err) {
                console.error(err);
            }
        })();
    }, []);
    return (
        <div className="quote-bottom-center">
            <p className="mb-0-5">{`"${quote.text}"`}</p>
            <p className="quote-author mt-0">
                {quote.author === null ? `By unknown` : `By ${quote.author}`}
            </p>
        </div>
    );
}

export { Quote, changeQuoteHandler };
