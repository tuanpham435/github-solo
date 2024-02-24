import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import "./index.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Nav from "./components/Nav";
import Loading from "./components/Loading";

/*
   In the following sections, we'll define a React component called App.
   The component will have a render method, which returns a simple JSX element.
*/

const Popular = React.lazy(() => import('./components/Popular'));
const Battle = React.lazy(() => import('./components/Battle'));
const Results = React.lazy(() => import('./components/Results'));

class App extends React.Component {
    state = {
        theme: 'light'
    }

    toggleTheme = () => {
        this.setState(({theme}) => ({
            theme: theme === 'light' ? 'dark' : 'light'
        }));
    }

    render() {
        return (
            <Router>
                <div className={this.state.theme}>
                    <div className={'container'}>
                        <Nav theme={this.state.theme} toggleTheme={this.toggleTheme}/>
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
        )
    }
}

// Finds the HTML element with the id 'app' and stores it in the variable rootElement.
const rootElement = document.getElementById('app');

// Creating a React root with the found rootElement using createRoot method
const root = ReactDOM.createRoot(rootElement)

// Rendering the App component inside the created root
root.render(<App/>)