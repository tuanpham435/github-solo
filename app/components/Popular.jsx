import React, {Component} from 'react';

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
        const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

        return (
            <main>
                <select
                    onChange={(e) => this.updateLanguage(e.target.value)}
                >
                    {languages.map((language) => (
                        <option
                            selected={this.state.selectedLanguage === language}
                            key={language}
                            value={language}
                        >
                            {language}
                        </option>
                    ))}
                </select>
                {JSON.stringify(this.state, null, 2)}
            </main>
        );
    }
}

export default Popular;