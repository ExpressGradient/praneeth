type RendererProps = {
    type: string;
    block: string;
};

const Renderer = ({ type, block }: RendererProps): JSX.Element => {
    switch (type) {
        case "title":
            return (
                <h1 className="text-center underline text-3xl md:text-4xl my-3">
                    {block}
                </h1>
            );
        case "heading":
            return (
                <h1 className="text-center text-2xl md:text-3xl my-3">
                    {block}
                </h1>
            );
        case "paragraph":
            return <p className="tracking-tight my-3 md:text-lg">{block}</p>;
    }
};

export default Renderer;
