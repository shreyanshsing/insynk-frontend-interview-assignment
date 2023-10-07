import { useEffect, useState } from "react"
import { ExpenseTypeEnum, type Expense, OperationMode } from "../../Components/Expense/types"
import { Card, CardContent, CardHeader, Link, List, ListItem, ListItemText } from "@mui/material"
import { useDispatch } from "react-redux"
import { setCurrentExpense, setOperationMode } from "../../Components/Expense/slice"

interface IProps {
    month: string,
    expenses: Expense[]
}

const CustomCard = ({month, expenses}: IProps) => {

    const dispatch = useDispatch()
    const [totalExpenses, setTotalExpenses] = useState<number>(0)

    useEffect(() => {
        let total = 0
        expenses?.forEach((expense: Expense) => {
            if (expense?.type === ExpenseTypeEnum.CashIn) {
                total += expense.amount
            } else {
                total -= expense.amount
            }
        })
        setTotalExpenses(total)
    }, [expenses])

    const getColor = (amount: number, expenseType?: ExpenseTypeEnum) => {
        if (amount === 0) {
            return 'gray'
        }
        if (expenseType === ExpenseTypeEnum.CashIn) {
            return 'green'
        } else if (expenseType === ExpenseTypeEnum.CashOut) {
            return 'red'
        }
        return amount < 0 ? 'red' : 'green'
    }

    const handleEdit = (expense: Expense) => {
        dispatch(setCurrentExpense(expense))
        dispatch(setOperationMode(OperationMode.Edit))
    }

    return (
        <Card sx={{margin: '1rem', maxHeight: '450px', width: '100%', overflow: 'scroll'}}>
            <CardHeader 
                title={month} 
                subheader={<div>Total Expenses: <b style={{color: getColor(totalExpenses)}}>{totalExpenses > 0 && '+'} {totalExpenses} INR </b></div>} 
                sx={{borderBottom: '1px solid lightgray'}}
            />
            <CardContent>
                <List>
                    {
                        expenses?.map((expense: Expense, index: number) => (
                            <>
                                <ListItem key={index} divider>
                                    <ListItemText>
                                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                                            <Link sx={{cursor: 'pointer'}} onClick={() => handleEdit(expense)}>
                                                {expense.category.name}
                                            </Link>
                                            <p style={{color: getColor(expense.amount, expense.type), margin: '0rem'}}>
                                                {(expense.amount !== 0) ? (expense.type === ExpenseTypeEnum.CashIn ? '+' : '-') : ''}{expense.amount} INR
                                            </p>
                                        </div>
                                    </ListItemText>
                                </ListItem>
                            </>
                        ))
                    }
                </List>
            </CardContent>
        </Card>
    )
}

export default CustomCard