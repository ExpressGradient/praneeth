import fs from "fs";
import fm from "front-matter";

export function getThoughts() {
    const thoughts = [];

    const files = fs.readdirSync("./content/thoughts");
    files.forEach((file) => {
        const data = fs.readFileSync(`./content/thoughts/${file}`, "utf-8");

        const { attributes } = fm(data);

        if (attributes.status === "published") {
            thoughts.push(attributes);
        }
    });

    return thoughts.sort(
        (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
    );
}
