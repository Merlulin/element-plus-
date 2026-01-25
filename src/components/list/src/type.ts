export interface ListItem {
    title?: string;
    avatar?: string;
    desc?: string;
    time?: string;
    tag?: string;
    tagType?: '' | 'primary' | 'success' | 'info' | 'warning' | 'danger';
}

export interface ListOption {
    title: string;
    content: ListItem[];
}

export interface ListAction {
    icon: string;
    text: string;
}