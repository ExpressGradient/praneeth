import { ImageResponse } from "@vercel/og";

export const config = { runtime: "experimental-edge" };

export default function og(req) {
    const { searchParams } = new URL(req.url);

    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                tw="bg-zinc-800 text-white"
            >
                <h1 tw="font-serif font-bold text-3xl">Sai Praneeth</h1>
                <p tw="font-mono text-sm">
                    {searchParams.get("description") ??
                        "Gear Head | Computer Programmer | Writer | Shutterbug | Bibliophile"}
                </p>
            </div>
        ),
        {
            width: 800,
            height: 400,
        }
    );
}
