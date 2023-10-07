import { configureStore } from "@reduxjs/toolkit"
import ExpenseReducer from "./Components/Expense/slice"
import CategoryReducer from "./Components/Category/slice"

export default configureStore({
    reducer: {
        expenseReducer: ExpenseReducer,
        categoryReducer: CategoryReducer
    }
})