import { NextResponse } from "next/server";
import { incrementThoughtView } from "./utils/redis";

export async function middleware(req) {
    const [_, topic, post] = req.nextUrl.pathname.split("/");

    if (topic === "thoughts") {
        await incrementThoughtView(req.ip, post);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/thoughts/:slug*"],
};
