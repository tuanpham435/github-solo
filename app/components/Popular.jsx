import React, {Component} from 'react';

function LanguageNav({selected, onUpdateLanguage}) {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python', 'PHP'];

    return (
        <select
            onChange={(e) => onUpdateLanguage(e.target.value)}
        >
            {languages.map((language) => (
                <option
                    selected={selected === language}
                    key={language}
                    value={language}
                >
                    {language}
                </option>
            ))}
        </select>
    )
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