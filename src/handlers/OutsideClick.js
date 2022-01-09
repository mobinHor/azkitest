import { useEffect } from "react";

// to handle clicks out side desired component
const OutsideClick = (ref , callback) => {
    // ref : refers to the component that we want to control
    // callback : a function that would be emitted when click outside happens 
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback()
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
        // eslint-disable-next-line
    }, [ref]);
}

export default OutsideClick