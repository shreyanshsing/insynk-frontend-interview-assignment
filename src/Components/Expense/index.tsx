import { useSelector } from "react-redux"
import { Container, Content, Header, Label } from "./styled"
import { deleteExpense, expenseSelector, setOperationMode } from "./slice"
import { OperationMode, type Expense } from "./types"
import Card from "../../Packages/Card"
import { useDispatch } from "react-redux"
import AddEditExpense from "./AddExpense"
import { useCallback, useEffect, useState } from "react"
import { Button, Grid } from "@mui/material"
import { useSnackbar } from "notistack"


const ExpenseList = ({setHideBottomNav}: {setHideBottomNav: (value: boolean) => void}) => {

    const dispatch = useDispatch()
    const {expenseList, operationMode, currentExpense} = useSelector(expenseSelector)
    const [cardData, setCardData] = useState<{month: string, expenses: Expense[]}[]>([])
    const {enqueueSnackbar} = useSnackbar()

    const parseExpenseList = useCallback(() => {
        const map = new Map<string, Expense[]>()
        expenseList?.forEach((expense: Expense) => {
            const date = expense.date?.getMonth() + 1 + '/' + expense.date?.getFullYear()
            console.log(date)
            const list = map.get(date) || []
            list.push(expense)
            map.set(date, list)
        })
        const mapEntries = Array.from(map.entries())
        mapEntries.sort((a, b) => {
            return a[0].localeCompare(b[0])
        })
        const sortedMap = new Map(mapEntries)
        const tempData:{month: string, expenses: Expense[]}[] = []
        sortedMap.forEach((value, key) => {
            console.log(key)
            tempData.push({
                month: key,
                expenses: value
            })
        })
        setCardData(tempData)
    }, [expenseList])

    useEffect(() => {
        if (expenseList?.length > 0 && !operationMode) {
            parseExpenseList()
        }
    }, [expenseList?.length, operationMode, parseExpenseList])

    const getHeadLabel = () => {
        if (operationMode) {
            return operationMode === OperationMode.Add ? 'Add Expense' : 'Edit Expense'
        }
        return 'Expense Tracking'
    }

    const resolveView = () => {
        if (operationMode === OperationMode.Add || operationMode === OperationMode.Edit) {
            setHideBottomNav(true)
            return <AddEditExpense setHideBottomNav={setHideBottomNav} />
        } return (
            <>
                {
                    expenseList?.length === 0 ? (
                        <div>
                            <Label>You haven't added any expenses yet!</Label> <hr />
                        </div>
                    ) : (
                        <Grid style={{marginLeft: '5rem', width: '100%', height: '80%', overflow: 'scroll'}} columnGap={1} rowGap={1} container>
                            {cardData?.map((data: {month: string, expenses: Expense[]}, index: number) => (
                                <Grid item xs={12} md={6} lg={3} key={index}>
                                    <Card key={index} month={data.month} expenses={data.expenses} />
                                </Grid>
                            ))}
                        </Grid>
                    )
                }
            </>
        )
    }

    const handleDeleteExpense = () => {
        dispatch(deleteExpense(currentExpense!))
        setHideBottomNav(false)
        enqueueSnackbar('Expense deleted', {variant: 'success'})
        dispatch(setOperationMode(undefined))
    }

    const getHeaderAction = () => {
        if (!operationMode) {
            return <Button variant={'contained'} color={'primary'} onClick={() => dispatch(setOperationMode(OperationMode.Add))}>Add Expense</Button>
        }
        if (operationMode === OperationMode.Add) {
            return <div />
        }
        if (operationMode === OperationMode.Edit) {
            return <Button variant={'contained'} color={'primary'} onClick={() => handleDeleteExpense()}>Delete Expense</Button>
        }
    }

    return (
        <Container>
            <Header>
                <div />
                <Label style={{marginLeft: '5rem'}}>{getHeadLabel()}</Label>
                <div style={{marginRight: '1rem'}}>
                    {
                        getHeaderAction()
                    }
                </div>
            </Header>
            <Content>
                {resolveView()}
            </Content>
        </Container>
    )
}

export default ExpenseList
