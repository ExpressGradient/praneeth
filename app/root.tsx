import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "remix";
import type { MetaFunction, LinksFunction } from "remix";
import styles from "./tailwind.css";

export const meta: MetaFunction = () => {
    return {
        title: "Praneeth",
        description: "Praneeth's Personal Website",
    };
};

export const links: LinksFunction = () => {
    return [
        { rel: "stylesheet", href: styles },
        {
            rel: "preconnect",
            href: "https://fonts.googleapis.com",
        },
        {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossOrigin: "anonymous",
        },
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;1,400&display=swap",
        },
    ];
};

export default function App() {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                />
                <meta
                    name="og:image"
                    content="https://saipraneeth.in/preview_image.png"
                />
                <Meta />
                <Links />
            </head>
            <body>
                <Outlet />
                <ScrollRestoration />
                <Scripts />
                {process.env.NODE_ENV === "development" && <LiveReload />}
            </body>
        </html>
    );
}
