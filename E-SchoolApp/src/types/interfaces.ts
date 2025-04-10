
export interface Notification {
    notificationID: string;
    acctID: string;
    title: string;
    data: string;
    content: string;
    date: string;
    time: string;
    type: string;
}

export interface UserDetails {
    acctID: string,
    acctype: string,
    email: string,
    password: string,
    firstname: string,
    middlename: string,
    lastname: string,
    status: string,
    fileID: string,
}


export interface Class {
    id: number,
    acctID: string,
    classCode: string,
    hidden: boolean,
    memberType: string,
    classID: number,
    className: string,
    classDesc: string,
    fileID: string
}