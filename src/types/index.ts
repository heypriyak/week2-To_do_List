export interface Task {
    id: number;
    text: string;
    completed: boolean;
    dateAdded: Date;
    priority: 'low' | 'medium' | 'high';
}

export type SortOption = 'dateAdded' | 'alphabetical' | 'priority' | 'completionStatus';