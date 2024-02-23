import React from 'react';
import PropTypes from 'prop-types';
import Hover from "./Hover";

const container = {
    position: "relative",
    display: "flex",
};

class Tooltip extends React.Component {
    render() {
        const {children, element} = this.props;

        return (
            <Hover>
                {(hovering) => {
                    return (
                        <div
                            style={container}
                        >
                            {hovering === true && element}
                            {children}
                        </div>
                    )
                }}
            </Hover>
        );
    }
}

Tooltip.propTypes = {
    children: PropTypes.node.isRequired,
    element: PropTypes.node.isRequired,
};

export default Tooltip;