import { useSelector } from "react-redux"
import { Container, Content, Header, Label } from "../Expense/styled"
import { addCategory, selectorCategorySlice } from "./slice"
import type { Category } from "./types"
import { Button, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, OutlinedInput } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete'
import theme from "../../theme"
import { useState } from "react"
import ConfirmDelete from "./ConfirmDelete"
import { useDispatch } from "react-redux"
import { useSnackbar } from "notistack"
import { expenseSelector, setExpenseList } from "../Expense/slice"
import { Expense } from "../Expense/types"

const CategoryList = () => {

    const dispatch = useDispatch()
    const {categoryList} = useSelector(selectorCategorySlice)
    const {expenseList} = useSelector(expenseSelector)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [category, setCategory] = useState<Category | undefined>(undefined)
    const [inputValue, setInputValue] = useState<string>('')
    const {enqueueSnackbar} = useSnackbar()

    const handleDeleteCategory = (category: Category) => {
        setCategory(category)
        setOpenModal(true)
        const filteredExpenses = expenseList?.filter((expense: Expense) => expense.category?.name !== category.name)
        dispatch(setExpenseList(filteredExpenses))
    }

    const handleAddCategory = () => {
        const index = categoryList.findIndex((category: Category) => category?.name === inputValue)
        if (index !== -1) {
            enqueueSnackbar('Category already exists', {variant: 'error'})
            return
        }
        const tempCategory: Category = {
            name: inputValue,
            isMain: false,
            order: categoryList?.length + 1
        }
        dispatch(addCategory(tempCategory))
        setInputValue('')
    }

    return (
        <Container>
            {
                openModal && category && (
                    <ConfirmDelete category={category} openModal={openModal} setOpenModal={setOpenModal} />
                )
            }
            <Header>
                <div />
                <Label>Category List</Label>
                <div />
            </Header>
            <Content style={{alignItems: 'flex-start'}}>
                <List sx={{width: '100%', margin: '1rem 5rem', height: '80%', overflow: 'scroll'}}>
                    {
                        categoryList?.map((category: Category, index: number) => (
                            <>
                                <ListItem key={index} divider>
                                    <ListItemText primary={category.name} primaryTypographyProps={{color: theme.palette.primary.main}}/>
                                    {
                                        !category?.isMain && (
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteCategory(category)}>
                                                    <DeleteIcon color={'error'}/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        )
                                    }
                                </ListItem>
                            </>
                        ))
                    }
                    <ListItem>
                        <OutlinedInput
                            type={'text'}
                            value={inputValue}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                            fullWidth
                            margin={'dense'}
                            placeholder={'Add Category'}
                            endAdornment={
                                <Button variant={'contained'} color={'primary'} disabled={!inputValue} onClick={() => handleAddCategory()}>Add</Button>
                            }
                        />
                    </ListItem>
                </List>
            </Content>
        </Container>
    )
}

export default CategoryList