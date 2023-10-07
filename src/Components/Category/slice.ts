import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category, defaultCategories } from "./types";

interface IState {
    categoryList: Category[]
}

const CategorySlice = createSlice({
    name: 'category-reducer',
    initialState: {
        categoryList: defaultCategories
    },
    reducers: {
        addCategory: (state: IState, action: PayloadAction<Category>) => {
            state.categoryList.push(action.payload)
        },
        deleteCategory: (state: IState, action: PayloadAction<Category>) => {
            const index = state.categoryList.findIndex((category: Category) => JSON.stringify(category) === JSON.stringify(action.payload))
            state.categoryList.splice(index, 1)
        }
    }
})

interface TState {
    categoryReducer: IState
}

export const selectorCategorySlice = (state: TState) => state.categoryReducer

export const { addCategory, deleteCategory } = CategorySlice.actions

export default CategorySlice.reducer