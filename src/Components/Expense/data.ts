import { ExpenseTypeEnum, type Expense } from "./types";


export const dummyExpenses: Expense[] = [
    {
        type: ExpenseTypeEnum.CashIn,
        category: {
            name: 'Travel',
            isMain: true,
            order: 1
        },
        date: new Date(),
        amount: 1200,
        description: 'dummy expense'
    }
]
