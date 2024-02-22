import React, {Component} from 'react';
import PropTypes from "prop-types";
import {close} from "./icons";
import Results from "./Results";

function Instructions() {
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
}

class PlayerInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.onSubmit(this.state.username)
    }

    handleChange(username) {
        this.setState({
            username
        })
    }

    render() {
        const {label} = this.props
        const {username} = this.state

        return (
            <form className={'card'} onSubmit={this.handleSubmit}>
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
                        onChange={(e) => this.handleChange(e.target.value)}
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

export default class Battle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playerOne: null,
            playerTwo: null,
            battle: false,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleSubmit(id, player) {
        this.setState({
            [id]: player
        })
    }

    handleReset(id) {
        this.setState({
            [id]: null,
        });
    }

    render() {
        const {playerOne, playerTwo, battle} = this.state;
        const disabled = !playerOne || !playerTwo

        if (battle === true) {
            return <Results playerOne={playerOne} playerTwo={playerTwo}/>;
        }

        return (
            <main className={'stack main-stack animate-in'}>
                <div className={'split'}>
                    <h1>Players</h1>
                    <button
                        onClick={() => {
                            this.setState({battle: true});
                        }}
                        className={`btn primary ${disabled ? "disabled" : ""}`}
                    >
                        Battle
                    </button>
                </div>
                <section className={'grid'}>
                    {!playerOne ? (
                        <PlayerInput
                            label={"Player One"}
                            onSubmit={(player) => this.handleSubmit("playerOne", player)}
                        />
                    ) : (
                        <PlayerPreview
                            onReset={() => this.handleReset("playerOne")}
                            label={"Player One"}
                            username={playerOne}
                        />
                    )}
                    {!playerTwo ? (
                        <PlayerInput
                            label={"Player Two"}
                            onSubmit={(player) => this.handleSubmit("playerTwo", player)}
                        />
                    ) : (
                        <PlayerPreview
                            onReset={() => this.handleReset("PlayerTwo")}
                            label={"Player Two"}
                            username={playerTwo}
                        />
                    )}
                </section>
                <Instructions/>
            </main>
        );
    }
}
