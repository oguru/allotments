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
    name: PageCap;
}

export type JSXElementsObject = {
    [key in PageCap]: JSX.Element;
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

export type PageLower = "about" | "info" | "articles" | "home" | "admin";

export type PageCap = "About" | "Info" | "Articles" | "Home" | "Admin";
