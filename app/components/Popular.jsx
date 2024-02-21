import React, {Component} from 'react';

class Popular extends Component {
    render() {
        return (
            <select>
                <option value="All">All</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Ruby">Ruby</option>
                <option value="Java">Java</option>
                <option value="CSS">CSS</option>
                <option value="Python">Python</option>
            </select>
        );
    }
}

export default Popular;