import React, {useEffect, useReducer} from 'react';
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

const initialState = {
    repos: null,
    selectedLanguage: 'All',
    error: null,
    loading: false,
}

function reducer(state, action) {
    if (action.type === 'success') {
        return {...state, repos: action.repos, error: null, loading: false};
    } else if (action.type === 'error') {
        return {...state, error: 'There was an error fetching the repositories', loading: false}
    } else if (action.type === 'loading') {
        return {...state, selectedLanguage: action.selectedLanguage, repos: null, error: null, loading: true};
    } else {
        throw new Error("This action type isn't supported.");
    }
}

const Popular = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {selectedLanguage, repos, error, loading} = state;
    const updateLanguage = (selectedLanguage) => {
        dispatch({type: 'loading', selectedLanguage});

        fetchPopularRepos(selectedLanguage)
            .then((repos) => {
                dispatch({type: 'success', repos});
            })
            .catch((error) => {
                console.warn("Error fetching repos:", error);
                dispatch({type: 'error', error});
            })
    }

    useEffect(() => {
        updateLanguage(selectedLanguage);
    }, [])

    return (
        <main className={'stack main-stack animate-in'}>
            <div className={'split'}>
                <h1>Popular</h1>
                <LanguageNav
                    selected={selectedLanguage}
                    onUpdateLanguage={updateLanguage}
                />
            </div>

            {loading && <div className={'text-center'}><Loading/></div>}

            {error && <p className={'text-center error'}>{error}</p>}

            {repos && <Table repos={repos}/>}
        </main>
    );
};

export default Popular;