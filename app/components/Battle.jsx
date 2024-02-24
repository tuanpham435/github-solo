import React, {useState} from 'react';
import PropTypes from "prop-types";
import {close} from "./icons";
import {Link} from "react-router-dom";

const Instructions = React.memo(() => {
    return (
        <section className={'instructions-container'}>
            <h2>Instructions</h2>
            <ol>
                <li>Enter 2 Github users</li>
                <li>Battle</li>
                <li>See the reviews</li>
            </ol>
        </section>
    )
})

const PlayerInput = ({label, onSubmit}) => {
    const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit(username);
    }

    const handleChange = (e) => {
        setUsername(e.target.value);
    }

    return (
        <form className={'card'} onSubmit={handleSubmit}>
            <label htmlFor="username" className={'player-label'}>
                {label}
            </label>
            <div className={'input-row'}>
                <input
                    type="text"
                    id="username"
                    placeholder="github username"
                    autoComplete="off"
                    value={username}
                    onChange={handleChange}
                />
                <button
                    className={'btn link'}
                    type={'submit'}
                    disabled={!username}
                >
                    Submit
                </button>
            </div>
        </form>
    )
}

function PlayerPreview({username, onReset, label}) {
    return (
        <article className={'card'}>
            <h3 className={'player-label'}>{label}</h3>
            <div className={'split'}>
                <div className={'row gap-md'}>
                    <img
                        width={32}
                        height={32}
                        className={'avatar'}
                        src={`https://github.com/${username}.png?size=200`}
                        alt={`Avatar for ${username}`}
                    />
                    <a href={`https://github.com/${username}`} className={'link'}>
                        {username}
                    </a>
                </div>
                <button onClick={onReset} className="btn secondary icon">
                    {close}
                </button>
            </div>
        </article>
    )
}

PlayerPreview.propTypes = {
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
};

const Battle = () => {
    const [players, setPlayers] = useState({playerOne: null, playerTwo: null});
    const {playerOne, playerTwo} = players;
    const disabled = !playerOne || !playerTwo;

    const handleSubmit = (id, player) => {
        setPlayers({...players, [id]: player})
    }

    const handleReset = (id, player) => {
        setPlayers({...players, [id]: player})
    }

    return (
        <main className={'stack main-stack animate-in'}>
            <div className={'split'}>
                <h1>Players</h1>
                <Link
                    to={{
                        pathname: '/results',
                        search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`
                    }}
                    className={`btn primary ${disabled ? "disabled" : ""}`}
                >
                    Battle
                </Link>
            </div>
            <section className={'grid'}>
                {!playerOne ? (
                    <PlayerInput
                        label={"Player One"}
                        onSubmit={(player) => handleSubmit("playerOne", player)}
                    />
                ) : (
                    <PlayerPreview
                        onReset={() => handleReset("playerOne")}
                        label={"Player One"}
                        username={playerOne}
                    />
                )}
                {!playerTwo ? (
                    <PlayerInput
                        label={"Player Two"}
                        onSubmit={(player) => handleSubmit("playerTwo", player)}
                    />
                ) : (
                    <PlayerPreview
                        onReset={() => handleReset("playerTwo")}
                        label={"Player Two"}
                        username={playerTwo}
                    />
                )}
            </section>
            <Instructions/>
        </main>
    );
};

export default Battle;