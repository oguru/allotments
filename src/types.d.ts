import { MainImageTypes } from "./images/main/mainImages";

export type FirestoreNoticeType = {
    title: string;
    desc: string;
    date: string;
}

export type LocalNoticeType = FirestoreNoticeType & {
    id: string;
}

export type RouteData = {
    path: string;
    name: string;
}

export type ComponentObject = {
    [key: string]: JSX.Element;
}

export type PageRef = {
    [key: string]: RefObject<HTMLDivElement>;
}
 
export type ChildrenProps {
    children: React.ReactNode;
}

export type StringObject = {
    [key: string]: string
};

export type IntObject = {
    [key: string]: number
};

export type ImageSizes = "sm" | "md" | "lg";