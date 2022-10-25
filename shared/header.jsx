import Link from "next/link";

export default function Header({ shortDesc }) {
    return (
        <header className="list gap-y-6">
            <h1>
                <Link href="/">
                    <a className="text-white">Sai Praneeth</a>
                </Link>
            </h1>

            <p id="short-description">
                {shortDesc ??
                    "Gear Head | Computer Programmer | Writer | Shutterbug | Bibliophile"}
            </p>
        </header>
    );
}
