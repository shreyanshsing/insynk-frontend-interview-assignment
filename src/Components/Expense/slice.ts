import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { type Expense, type OperationMode } from "./types"


interface IState {
    expenseList: Expense[]
    operationMode?: OperationMode
    currentExpense?: Expense
}

const initialState: IState = {
    expenseList: [],
    operationMode: undefined,
    currentExpense: undefined
}

const ExpenseReducer = createSlice({
    name: 'expense-reducer',
    initialState: initialState,
    reducers: {
        setExpenseList: (state: IState, action: PayloadAction<Expense[]>) => {
            state.expenseList = action.payload
        },
        setOperationMode: (state: IState, action: PayloadAction<OperationMode | undefined>) => {
            state.operationMode = action.payload
        },
        addExpense: (state: IState, action: PayloadAction<Expense>) => {
            // find if expense category already exist for given month and year
            const index = state.expenseList.findIndex((expense: Expense) => {
                const date = expense.date?.getMonth() + '/' + expense.date?.getFullYear()
                const currentDate = action.payload.date?.getMonth() + '/' + action.payload.date?.getFullYear()

                if (date === currentDate &&
                    expense.category?.name === action.payload.category?.name
                ) {
                    return true
                }
                return false
            })
            // if already exist
            if (index !== -1) {
                const prevExpense = state.expenseList[index]
                // based on previous expense type add or subtract amount
                const prevType = prevExpense.type
                if (action.payload.type === prevType) {
                    prevExpense.amount += action.payload.amount
                } else {
                    prevExpense.amount -= action.payload.amount
                }
                state.expenseList.splice(index, 1, prevExpense)
            } else {
                state.expenseList.push(action.payload)
            }
        },
        setCurrentExpense: (state: IState, action: PayloadAction<Expense | undefined>) => {
            state.currentExpense = action.payload
        },
        editExpense: (state: IState, action: PayloadAction<Expense>) => {
            const index = state.expenseList.findIndex((expense: Expense) => JSON.stringify(expense) === JSON.stringify(action.payload))
            state.expenseList.splice(index, 1, action.payload)
        },
        deleteExpense: (state: IState, action: PayloadAction<Expense>) => {
            const index = state.expenseList.findIndex((expense: Expense) => JSON.stringify(expense) === JSON.stringify(action.payload))
            state.expenseList.splice(index, 1)
        }
    }
})

export const { setExpenseList, setOperationMode, addExpense, editExpense, deleteExpense, setCurrentExpense } = ExpenseReducer.actions

interface TState {
    expenseReducer: IState
}

export const expenseSelector = (state: TState) => state.expenseReducer

export default ExpenseReducer.reducer