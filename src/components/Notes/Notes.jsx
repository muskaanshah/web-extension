import { useEffect, useState } from "react";
import "./notes.css";

export function Notes({ notesModal, setNotesModal }) {
    const [notes, setNotes] = useState({ title: "", desc: "" });
    const notesObj = JSON.parse(localStorage.getItem("notes_content"));
    useEffect(() => {
        if (
            localStorage.getItem("notes_content") != null &&
            (notesObj?.title.length > 0 || notesObj?.desc.length > 0)
        ) {
            setNotesModal(true);
            setNotes({ title: notesObj?.title, desc: notesObj?.desc });
        }
    }, [notesObj?.desc, notesObj?.title, setNotesModal]);
    return (
        <div className="notes-wrapper">
            <div
                className="centered mb-0-5 cursor-pointer"
                onClick={() => {
                    setNotesModal((prev) => !prev);
                }}
            >
                <p className="my-0">Notes</p>
                <span className="material-icons-outlined">edit_note</span>
            </div>
            {notesModal && (
                <div className="notes-container">
                    <button
                        className="btn-todo btn-close-countdownmodal mr-0-5 centered"
                        onClick={() => setNotesModal(false)}
                    >
                        <span className="material-icons-outlined">close</span>
                    </button>
                    <input
                        type="text"
                        placeholder="Add a title"
                        className="notes-title-input pb-0-5 mr-1"
                        value={notes.title}
                        onChange={(e) => {
                            localStorage.setItem(
                                "notes_content",
                                JSON.stringify({
                                    title: e.target.value,
                                    desc: notes.desc,
                                })
                            );
                            setNotes({
                                title: e.target.value,
                                desc: notes.desc,
                            });
                        }}
                    ></input>
                    <textarea
                        className="notes-textarea"
                        placeholder="Start typing something"
                        value={notes.desc}
                        spellCheck={false}
                        onChange={(e) => {
                            localStorage.setItem(
                                "notes_content",
                                JSON.stringify({
                                    title: notes.title,
                                    desc: e.target.value,
                                })
                            );
                            setNotes({
                                title: notes.title,
                                desc: e.target.value,
                            });
                        }}
                    ></textarea>
                </div>
            )}
        </div>
    );
}
