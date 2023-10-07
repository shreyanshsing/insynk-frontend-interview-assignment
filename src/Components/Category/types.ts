export interface Category {
    name: string
    isMain: boolean
    order: number
}

export const defaultCategories: Category[] = [
    { isMain: true, order: 1, name: "Food" },
    { isMain: true, order: 2, name: "Transportation" },
    { isMain: true, order: 3, name: "Work" },
    { isMain: false, order: 4, name: "Traveling" },
]