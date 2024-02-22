import React, {Component} from 'react';

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

export default class Battle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playerOne: null,
            playerTwo: null,
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(id, player) {
        this.setState({
            [id]: player
        })
    }

    render() {
        const {playerOne, playerTwo} = this.state;
        const disabled = !playerOne || !playerTwo

        return (
            <main className={'stack main-stack animate-in'}>
                <div className={'split'}>
                    <h1>Players</h1>
                    <a href="#" className={`btn primary ${disabled ? "disabled" : ""}`}>
                        Battle
                    </a>
                </div>
                <section className={'grid'}>
                    {!playerOne ? (
                        <PlayerInput
                            label={"Player One"}
                            onSubmit={(player) => this.handleSubmit("playerOne", player)}
                        />
                    ) : null}
                    {!playerTwo ? (
                        <PlayerInput
                            label={"Player Two"}
                            onSubmit={(player) => this.handleSubmit("PlayerTwo", player)}
                        />
                    ) : null}
                </section>
                <Instructions/>
            </main>
        );
    }
}
