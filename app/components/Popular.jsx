import React, {Component} from 'react';
import PropTypes from "prop-types";
import {fetchPopularRepos} from "../utils/api";
import Table from "./Table";
import Loading from "./Loading";

function LanguageNav({selected, onUpdateLanguage}) {
    const languages = ['All', 'JavaScript', 'Python', 'Java', 'Typescript', 'C#', 'C++', 'PHP', 'Go', 'Rust', 'Shell'];

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
            selectedLanguage: "All",
            repos: null,
            error: null,
            loading: false,
        }

        this.updateLanguage = this.updateLanguage.bind(this);
    }

    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }

    updateLanguage(selectedLanguage) {
        this.setState({
            repos: null,
            selectedLanguage,
            error: null,
            loading: true,
        });

        fetchPopularRepos(selectedLanguage)
            .then((repos) => {
                this.setState({
                    repos,
                    error: null,
                })
            })
            .catch((error) => {
                console.warn("Error fetching repos:", error);
                this.setState({
                    error: 'There was an error fetching the repositories',
                });
            })
            .finally(() => {
                this.setState({loading: false,});
            });
    }

    render() {
        const {selectedLanguage, repos, error, loading} = this.state;

        return (
            <main className={'stack main-stack animate-in'}>
                <div className={'split'}>
                    <h1>Popular</h1>
                    <LanguageNav
                        selected={selectedLanguage}
                        onUpdateLanguage={this.updateLanguage}
                    />
                </div>

                {loading && <p className={'text-center'}><Loading/></p>}

                {error && <p className={'text-center error'}>{error}</p>}

                {repos && <Table repos={repos}/>}
            </main>
        );
    }
}

export default Popular;