import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import "./index.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Nav from "./components/Nav";
import Loading from "./components/Loading";
import {useState} from "react";

/*
   In the following sections, we'll define a React component called App.
   The component will have a render method, which returns a simple JSX element.
*/

const Popular = React.lazy(() => import('./components/Popular'));
const Battle = React.lazy(() => import('./components/Battle'));
const Results = React.lazy(() => import('./components/Results'));

const App = () => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = () => {
        setTheme((theme) => theme === 'light' ? 'dark' : 'light');
    }

    return (
        <Router>
            <div className={theme}>
                <div className={'container'}>
                    <Nav theme={theme} toggleTheme={toggleTheme}/>
                    <React.Suspense fallback={<Loading/>}>
                        <Routes>
                            <Route path={'/'} element={<Popular/>}/>
                            <Route path={'/battle'} element={<Battle/>}/>
                            <Route path={'/results'} element={<Results/>}/>
                        </Routes>
                    </React.Suspense>
                </div>
            </div>
        </Router>
    );
};

// Finds the HTML element with the id 'app' and stores it in the variable rootElement.
const rootElement = document.getElementById('app');

// Creating a React root with the found rootElement using createRoot method
const root = ReactDOM.createRoot(rootElement)

// Rendering the App component inside the created root
root.render(<App/>)