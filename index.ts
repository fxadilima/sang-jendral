import {h, render, Component} from 'preact';
import {
    lazy,
    LocationProvider,
    ErrorBoundary,
    Router,
    Route
} from 'preact-iso';

import Home from './content/home.mdx';
import { JSX } from "preact/compat/jsx-dev-runtime";
 
console.log(`[index.ts] loaded (as index.js)`);

const NotesComponent = lazy(() => import('./content/notes.mdx'));

class App extends Component<unknown> {
    override render(): JSX.Element {
        return h(Home,
            { class: "container p-5" },
            this.props.children
        );
    }
}

class Notes extends Component<unknown> {
    override render(): JSX.Element {
        return h("div",
            { class: "container p-2 my-3" }, [
                h(NotesComponent, null)
            ]);
    }
}

class Stories extends Component<unknown> {
    override render(): JSX.Element {
        return h("div", { class: "container p-3 my-2" }, [
            h("h1", null, "Stories")
        ]);
    }
}

class NotFound extends Component<unknown> {
    override render(): JSX.Element {
        return h("div", { class: "card p-5 my-5" }, [
            h("h1", { class: "text-center" }, "Not Found"),
            h('p', null, 'Could not find the page!'),
            h('a', { class: "btn btn-info", href: "/" }, "Back to Home")
        ])
    }
}

render(h("div", { class: "container-fluid my-5" }, [
    h(LocationProvider, null, [
        h(ErrorBoundary, null, [
            h(Router, null, [
                h(Route, { path: "/", component: App }),
                h(Route, { path: "/notes", component: Notes }),
                h(Route, { path: "/stories", component: Stories }),
                h(Route, { default: true, component: NotFound })
            ])
        ])
    ])
]), document.getElementById('app')!);
