import { AddExpenseContent, ContentItem, Label } from "../styled"
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { Expense, ExpenseTypeEnum, OperationMode } from "../types"
import { useState } from "react"
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem';
import { Category } from "../../Category/types"
import { useSelector } from "react-redux"
import { selectorCategorySlice } from "../../Category/slice"
import TextField  from "@mui/material/TextField"
import { useDispatch } from "react-redux"
import { addExpense, editExpense, expenseSelector, setCurrentExpense, setOperationMode } from "../slice"
import { useSnackbar } from "notistack"
import { Button } from "@mui/material"


const AddEditExpense = ({setHideBottomNav}:{setHideBottomNav: (value: boolean) => void}) => {

    const dispatch = useDispatch()
    const {categoryList} = useSelector(selectorCategorySlice)
    const {currentExpense, operationMode} = useSelector(expenseSelector)
    const [expenseType, setExpenseType] = useState<ExpenseTypeEnum>(currentExpense ? currentExpense.type : ExpenseTypeEnum.CashIn)
    const [category, setCategory] = useState<Category | undefined>(currentExpense ? currentExpense.category : categoryList[0])
    const [amount, setAmount] = useState<number>(currentExpense ? currentExpense.amount : 0)
    const [date, setDate] = useState<Date>(currentExpense ? new Date(currentExpense.date) : new Date())
    const [description, setDescription] = useState<string>(currentExpense ? currentExpense.description : '')
    const {enqueueSnackbar} = useSnackbar()

    const handleTypeChange = (_event: React.MouseEvent<HTMLElement>, newType: ExpenseTypeEnum) => {
        setExpenseType(newType)
    }

    const handleSelectCategory = (event: SelectChangeEvent<Category>) => {
        const selectedCategory = categoryList.filter(item => item.name === event.target.value)[0]
        setCategory(selectedCategory)
    }

    const resetAllFields = () => {
        setAmount(0)
        setDescription('')
        setDate(new Date())
        setCategory(categoryList[0])
        setExpenseType(ExpenseTypeEnum.CashIn)
    }

    const handleCreateExpense = () => {
        const expense: Expense = {
            type: expenseType,
            category: category!,
            date: date,
            amount: amount,
            description: description
        }
        dispatch(addExpense(expense))
        resetAllFields()
        setHideBottomNav(false)
        enqueueSnackbar('Expense added', {variant: 'success'})
        dispatch(setOperationMode(undefined))
        dispatch(setCurrentExpense(undefined))
    }

    const handleUpdateExpense = () => {
        const expense: Expense = {
            type: expenseType,
            category: category!,
            date: date,
            amount: amount,
            description: description
        }
        dispatch(editExpense(expense))
        resetAllFields()
        setHideBottomNav(false)
        enqueueSnackbar('Expense updated', {variant: 'success'})
        dispatch(setOperationMode(undefined))
        dispatch(setCurrentExpense(undefined))
    }

    const handleCancel = () => {
        setHideBottomNav(false)
        dispatch(setOperationMode(undefined))
        resetAllFields()
        dispatch(setCurrentExpense(undefined))
    }

    const handleExpense = () => {
        if (operationMode === OperationMode.Add) {
            handleCreateExpense()
            return
        }
        if (operationMode === OperationMode.Edit) {
            handleUpdateExpense()
            return
        }
    }
    return (
        <AddExpenseContent>
            <ContentItem>
                <Label>Expense Type</Label>
                <ToggleButtonGroup
                    color={'primary'}
                    value={expenseType}
                    exclusive
                    onChange={handleTypeChange}
                    fullWidth={true}
                >
                    <ToggleButton color={'primary'} value={ExpenseTypeEnum.CashIn}>Cash In</ToggleButton>
                    <ToggleButton color={'primary'} value={ExpenseTypeEnum.CashOut}>Cash Out</ToggleButton>
                </ToggleButtonGroup>
            </ContentItem>
            <ContentItem>
                <Label>Category</Label>
                <Select 
                    value={category} 
                    fullWidth={true} 
                    margin={'dense'} 
                    inputProps={{
                        value: category?.name,
                    }}
                    required
                    placeholder={'Select Category'} 
                    onChange={handleSelectCategory}>
                    {
                        categoryList?.map((item: Category, index: number) => (
                            <MenuItem dense key={index} value={item?.name}>{item.name}</MenuItem>
                        ))
                    }
                </Select>
            </ContentItem>
            <ContentItem>
                <Label>Amount</Label>
                <TextField
                    type={'number'}
                    fullWidth={true}
                    margin={'dense'}
                    value={amount}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setAmount(parseInt(event.target.value))}
                    inputProps={{
                        min: 0
                    }}
                    required
                />
            </ContentItem>
            <ContentItem>
                <Label>Date</Label>
                <TextField 
                    type={'date'}
                    fullWidth={true}
                    inputProps={{
                        max: new Date().toISOString().split('T')[0],
                        format: 'YYYY-mm-dd'
                    }}
                    margin={'dense'}
                    value={date.toISOString().split('T')[0]}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDate(new Date(event.target.value))}
                    required
                />
            </ContentItem>
            <ContentItem>
                <Label>Description</Label>
                <TextField 
                    type={'text'}
                    rows={5}
                    fullWidth={true}
                    value={description}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)}
                />
            </ContentItem>
            <ContentItem style={{display: 'flex', marginTop: '1.5rem'}}>
                <Button 
                    fullWidth 
                    variant={'outlined'}
                    onClick={() => handleCancel()}
                >
                    Cancel
                </Button>
                <div style={{padding: '0.5rem'}} />
                <Button 
                    onClick={() => handleExpense()} 
                    fullWidth variant={'contained'} 
                    color={'primary'}
                    disabled={amount === 0}
                >
                    {operationMode === OperationMode.Add ? 'Add Expense' : 'Update Expense'}
                </Button>
            </ContentItem>
        </AddExpenseContent>
    )
}

export default AddEditExpense