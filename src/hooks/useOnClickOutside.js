import { useEffect } from "react"

function useOnClickOutside(modalRef, toggleRef, handler) {
    useEffect(
        () => {
            const listener = (event) => {
                // Do nothing if clicking ref's element or descendent elements
                if (!modalRef.current ||
                    !toggleRef.current ||
                    modalRef.current.contains(event.target) ||
                    toggleRef.current.contains(event.target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener("mousedown", listener);
            document.addEventListener("touchstart", listener);
            return () => {
                document.removeEventListener("mousedown", listener);
                document.removeEventListener("touchstart", listener);
            };
        },
        [modalRef, handler, toggleRef]
    );
}

export { useOnClickOutside }