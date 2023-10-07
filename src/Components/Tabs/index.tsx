import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { TabEnums } from './types'
import { useState } from 'react'
import ExpenseList from '../Expense'
import CategoryList from '../Category'
import { Container, Footer } from './styled'


const Tabs = () => {

    const [tab, setTab] = useState<TabEnums>(TabEnums.EXPENSE)
    const [hideBottomNav, setHideBottomNav] = useState<boolean>(false)
    
    const handleTabChange = (_event: React.MouseEvent<HTMLElement>, newTab: TabEnums) => {
        setTab(newTab)
    }

    const resolveView = () => {
        if(tab === TabEnums.EXPENSE) {
            return <ExpenseList setHideBottomNav={setHideBottomNav} />
        }
        return <CategoryList />
    }
    return  (
        <Container>
            <div style={{height: '100%', width: '100%', overflow: 'hidden'}}>
                {
                    resolveView()
                }
            </div>
            { 
                !hideBottomNav && (        
                    <Footer>
                        <ToggleButtonGroup value={tab} onChange={handleTabChange} exclusive fullWidth>
                            <ToggleButton color={'primary'} value={TabEnums.EXPENSE}>Expense</ToggleButton>
                            <ToggleButton color={'primary'} value={TabEnums.CATEGORY}>Category</ToggleButton>
                        </ToggleButtonGroup>
                    </Footer>
                )
            }
        </Container>
    )
}

export default Tabs