import React, {useEffect, useState} from 'react';

const styles = {
    fontSize: "14px",
    position: "absolute",
    left: "0",
    right: "0",
    marginTop: "20px",
    textAlign: "center",
};

const Delayed = ({wait = 300, children}) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setShow(true);
        }, wait)

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [wait]);

    return (show ? children : null);
}

const Loading = ({text = 'Loading', speed = 300}) => {
    const [content, setContent] = useState(text);

    useEffect(() => {
        const updateContent = () => {
            setContent((content) => content === text + "..." ? text : content + ".")
        }

        const intervalId = window.setInterval(updateContent, speed);

        return () => {
            window.clearInterval(intervalId)
        };
    }, [text, speed]);

    return (
        <Delayed>
            <p style={styles}>{content}</p>
        </Delayed>
    );
};
export default Loading;