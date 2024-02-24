import React, {useState} from 'react';

const Hover = ({children}) => {
    const [hovering, setHovering] = useState(false);

    const mouseOver = () => {
        setHovering(true);
    }

    const mouseOut = () => {
        setHovering(false)
    }

    return (
        <div>
            <div
                onMouseOver={mouseOver}
                onMouseOut={mouseOut}
            >
                {children(hovering)}
            </div>
        </div>
    );
};

export default Hover;