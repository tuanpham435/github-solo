import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import "./index.css"
import Popular from "./components/Popular";

/*
   In the following sections, we'll define a React component called App.
   The component will have a render method, which returns a simple JSX element.
*/

class App extends React.Component {
    render() {
        return (
            <div className={'light'}>
                <div className={'container'}>
                    <Popular/>
                </div>
            </div>
        )
    }
}

// Finds the HTML element with the id 'app' and stores it in the variable rootElement.
const rootElement = document.getElementById('app');

// Creating a React root with the found rootElement using createRoot method
const root = ReactDOM.createRoot(rootElement)

// Rendering the App component inside the created root
root.render(<App/>)