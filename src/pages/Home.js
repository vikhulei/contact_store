import { useState } from "react";
import { Section, Form, GreyButton } from "../styles/GeneralStyles"
import TwoButtonsDialogBox from "../components/TwoButtonsDialogBox";

const Home = ({ navigate }) => {
  const [openDialogBox, setOpenDialogBox] = useState(false)

  const handleClickOpen = () => {
    setOpenDialogBox(true);
  };

  const handleClickClose = () => {
    setOpenDialogBox(false);
  };

  const action = () => {
    handleClickClose()
    navigate("/")
  }

  return (
    <Section>
      <TwoButtonsDialogBox
        openDialogBox={openDialogBox}
        handleClickClose={handleClickClose}
        action={action}
        buttonTitle="Signing Out"
        buttonText="Are you sure you want to sign out?"
      />
      <h1>Select An Option</h1>
      <Form>
        <GreyButton variant="contained" onClick={(() => navigate("/profile"))}>View Profile</GreyButton>
        <GreyButton variant="contained" onClick={(() => navigate("/contacts"))}>View Contacts</GreyButton>
        <GreyButton variant="contained" onClick={handleClickOpen}>Sign Out</GreyButton>
      </Form>
    </Section>
  );
}

export default Home