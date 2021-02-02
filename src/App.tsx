import { render, h } from 'preact';
import Home from './components/Home';

const App = () => (
    <div>
        <Home />
    </div>
)

const appElement = document.getElementById('app');

render(<App />, appElement);