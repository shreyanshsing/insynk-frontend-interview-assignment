import { Button, Dialog, DialogActions, DialogContent } from "@mui/material"
import type { Category } from "./types"
import { Label } from "../Expense/styled"
import { useDispatch } from "react-redux"
import { deleteCategory } from "./slice"

interface IProps {
    category: Category,
    openModal: boolean,
    setOpenModal: (args?: any) => void
}

const ConfirmDelete = ({category, openModal, setOpenModal}: IProps) => {
    
    const dispatch = useDispatch()

    const handleConfirm = () => {
        dispatch(deleteCategory(category))
        setOpenModal(false)
    }

    return (
        <Dialog open={openModal}>
            <DialogContent>
                <ul style={{padding: '1rem',fontSize: '16px'}}>
                    <li >
                        <b>{category.name}</b> will be removed
                    </li>
                    <li>
                        All the expense in this category will also be removed
                    </li>
                </ul>
                <Label>Do you really want to remove?</Label>
            </DialogContent>
            <DialogActions sx={{margin: '0px', padding: '0px'}} disableSpacing>
                <Button variant={'outlined'} color={'primary'} fullWidth onClick={() => setOpenModal(false)}>Cancel</Button>
                <Button variant={'contained'} color={'primary'} fullWidth onClick={() => handleConfirm()}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDelete
