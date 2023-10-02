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