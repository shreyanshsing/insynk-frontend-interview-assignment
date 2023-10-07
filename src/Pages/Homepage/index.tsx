import { Suspense, useState } from "react"
import { Branding, Container, Label, LeftSection, RightSection } from "./styled"
import Tabs from "../../Components/Tabs"
import { Button } from "@mui/material"

function Homepage() {
    const [loadExpenseList, setLoadExpenseList] = useState(false)

    return (
        <Container>
            <LeftSection>
                <Branding>
                    Expense Tracker
                </Branding>
            </LeftSection>
            <RightSection>
                {
                    !loadExpenseList ? (
                    <div>
                        <Label>Click on the continue button to load your expenses</Label> <br />
                        <Button 
                            onClick={() => setLoadExpenseList(true)}
                            variant={'outlined'}
                            color={'primary'}
                        >
                            {'Continue >'}
                        </Button>
                    </div>
                    ) : (
                        <Suspense fallback={<div>Loading...</div>}>
                            <Tabs />
                        </Suspense>
                    )
                }
            </RightSection>
        </Container>
    )
}

export default Homepage