import { NextResponse } from "next/server";
import { incrementThoughtView } from "./utils/redis";

export async function middleware(req) {
    const [_, topic, post] = req.nextUrl.pathname.split("/");

    if (topic === "thoughts") {
        try {
            await incrementThoughtView(req.ip, post);
        } catch (err) {
            console.error("Failed to increment views");
            console.error(err);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/thoughts/:slug*"],
};
