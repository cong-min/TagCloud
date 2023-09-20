export interface TagCloud {
    update(texts: Array<string>): void;
    pause(): void;
    resume(): void;
    destroy(): void;
}

export interface TagCloudOptions {
    radius?: number;
    maxSpeed?: "slow" | "normal" | "fast";
    initSpeed?: "slow" | "normal" | "fast";
    deceleration?: number;
    keep?: boolean;
    containerClass?: string;
    itemClass?: string;
    useContainerInlineStyles?: boolean;
    useItemInlineStyles?: boolean;
    useHTML?: boolean;
}

export default function (
    container: string,
    texts: Array<string>,
    options?: TagCloudOptions
): TagCloud;

export default function (
    container: Element,
    texts: Array<string>,
    options?: TagCloudOptions
): TagCloud;

export default function (
    container: [Element],
    texts: Array<string>,
    options?: TagCloudOptions
): TagCloud;

export default function (
    container: Array<Element>,
    texts: Array<string>,
    options?: TagCloudOptions
): Array<TagCloud> | TagCloud;
