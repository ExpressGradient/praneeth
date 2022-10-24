import Link from "next/link";

export default function Footer() {
    return (
        <footer id="contact">
            <p>
                Wanna talk? Reach me at{" "}
                <Link href="mailto://sai.praneeth.diddigam@gmail.com?subject=Hey there, I've just seen your website. Let's talk.">
                    <a>sai.praneeth.diddigam@gmail.com</a>
                </Link>{" "}
                or{" "}
                <Link href="https://twitter.com/ExpressGradient">
                    <a target="_blank" rel="noreferrer noopener">
                        @ExpressGradient
                    </a>
                </Link>
                .
            </p>
        </footer>
    );
}
