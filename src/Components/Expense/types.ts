import type { Category } from "../Category/types"

export enum ExpenseTypeEnum  {
    CashIn = "Cash In",
    CashOut = "Cash Out",
}
    
    
export interface Expense {
    type: ExpenseTypeEnum
    category: Category
    date: Date
    amount: number
    description: string
}

export enum OperationMode {
    Add = "add",
    Edit = "edit"
}