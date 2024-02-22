import React, {Component} from 'react';
import PropTypes from "prop-types";

function LanguageNav({selected, onUpdateLanguage}) {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python', 'PHP'];

    return (
        <select
            onChange={(e) => onUpdateLanguage(e.target.value)}
            defaultValue={selected}
        >
            {languages.map((language) => (
                <option
                    key={language}
                    value={language}
                >
                    {language}
                </option>
            ))}
        </select>
    )
}

LanguageNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

class Popular extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedLanguage: "All"
        }

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    updateLanguage(selectedLanguage) {
        this.setState({
            selectedLanguage
        })
    }

    render() {
        const {selectedLanguage} = this.state;

        return (
            <main>
                <LanguageNav
                    selected={selectedLanguage}
                    onUpdateLanguage={this.updateLanguage}
                />
                {JSON.stringify(this.state, null, 2)}
            </main>
        );
    }
}

export default Popular;