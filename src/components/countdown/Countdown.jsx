import { useEffect, useState } from "react";

import "./countdown.css";
import { CountdownModal } from "./CountdownModal";
import { dateFormat } from "../../utils/dateFormat";
import { EventOverModal } from "./EventOverModal";

const emptyEvent = {
    description: "",
    dateByUser: "",
};

function Countdown({ setNotesModal }) {
    const eventFromLocalStorage = !localStorage.getItem("Event")
        ? emptyEvent
        : {
              ...JSON.parse(localStorage.getItem("Event")),
              dateByUser: dateFormat(
                  new Date(JSON.parse(localStorage.getItem("Event")).dateByUser)
              ),
          };
    const [userEvent, setUserEvent] = useState(eventFromLocalStorage);
    let [difference, setDifference] = useState("");
    const [today, setDate] = useState(new Date());
    const [modalToggle, setModalToggle] = useState(false);
    const [eventOverModal, setEventOverModal] = useState(false);

    useEffect(() => {
        setInterval(() => {
            setDate(() => new Date());
        }, 1000);
    }, []);

    useEffect(() => {
        const currentDate = new Date(dateFormat(today));
        const diffInDays = Math.floor(
            (new Date(userEvent.dateByUser) - currentDate) /
                (1000 * 60 * 60 * 24)
        );
        const diffInHours = Math.floor(
            (new Date(userEvent.dateByUser) - currentDate) / (1000 * 60 * 60)
        );
        const diffInMinutes = Math.floor(
            (new Date(userEvent.dateByUser) - currentDate) / (1000 * 60)
        );
        if (diffInDays >= 1) {
            setDifference(`${diffInDays}d`);
        } else if (diffInHours >= 1) {
            setDifference(`${diffInHours}h`);
        } else if (diffInMinutes > 1) {
            setDifference(`${diffInMinutes}m`);
        } else if (diffInMinutes === 1) {
            setDifference(`${diffInMinutes}m`);
            setEventOverModal(true);
        } else if (diffInMinutes <= 0) {
            setEventOverModal(false);
            localStorage.removeItem("Event");
            setUserEvent(emptyEvent);
            setDifference("");
        }
    }, [userEvent.dateByUser, today]);

    const removeEventHandler = () => {
        localStorage.removeItem("Event");
        setUserEvent(emptyEvent);
        setDifference("");
    };

    return (
        <div className="countdown">
            {difference.length !== 0 ? (
                <div className="event-details">
                    <div className="text-left mr-0-5">
                        <div>
                            <p className="fs-1-25 fw-500 my-0">{difference}</p>
                            <button
                                className="btn btn-edit-event"
                                onClick={() => {
                                    setModalToggle(true);
									setNotesModal(false);
                                }}
                            >
                                <span className="material-icons-outlined">
                                    edit
                                </span>
                            </button>
                            <button
                                className="btn btn-edit-event"
                                onClick={removeEventHandler}
                            >
                                <span className="material-icons-outlined">
                                    close
                                </span>
                            </button>
                        </div>
                        <p className="fs-0-8 my-0 mt-0-5">
                            {userEvent.description}
                        </p>
                    </div>
                </div>
            ) : (
                <div
                    className="centered flex-column add-countdown"
                    onClick={() => {
                        setModalToggle(true);
                        setNotesModal(false);
                    }}
                >
                    <span className="material-icons-outlined">add_circle</span>
                    <span className="fs-0-7">Add event</span>
                </div>
            )}
            {modalToggle && (
                <CountdownModal
                    userEvent={userEvent}
                    setUserEvent={setUserEvent}
                    today={today}
                    setModalToggle={setModalToggle}
                    setEventOverModal={setEventOverModal}
                />
            )}
            {eventOverModal && (
                <EventOverModal eventName={userEvent.description} />
            )}
        </div>
    );
}

export { Countdown };
