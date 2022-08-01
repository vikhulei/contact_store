import { useState } from "react";
import {GreyButton} from "../styles/GeneralStyles"
import {SectionProfile, Wrapper, InputNames, InputContacts, PictureControlsWrapper, PictureText, PictureWrapper, PictureInput, Picture, ButtonsWrapper, UploadButton} from "../styles/ProfileStyles"
import TwoButtonsDialogBox from "../components/TwoButtonsDialogBox";
import ChangePassword from "../components/ChangePassword";


const Profile = ({navigate}) => {
  const [preview, setPreview] = useState(null)
  const [openDialogBox, setOpenDialogBox] = useState(false)
  const [openPasswordBox, setOpenPasswordBox] = useState(false)
  const [buttonTitle, setButtonTitle] = useState("")
  const [buttonText, setButtonText] = useState("")

  const handleClickOpen = () => {
    setOpenDialogBox(true);
  };

  const handleClickClose = () => {
    setOpenDialogBox(false);
  };

  const handlePasswordOpen = () => {
    setOpenPasswordBox(true);
  };

  const handlePasswordClose = () => {
    setOpenPasswordBox(false);
  };

  const action = () => {
    alert("Photo uploaded")
    handleClickClose()
  }

  const getImage = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <SectionProfile>
      <TwoButtonsDialogBox
        openDialogBox={openDialogBox}
        handleClickClose={handleClickClose}
        action={action}
        buttonTitle={buttonTitle}
        buttonText={buttonText}
      />
      <ChangePassword
        openDialogBox={openPasswordBox}
        handleClickClose={handlePasswordClose}
        buttonTitle={buttonTitle}
        buttonText={buttonText}
      />
      <h1>Profile</h1>
      <Wrapper>
        <PictureControlsWrapper>
          <PictureText>Click to select new photo:</PictureText>
          <PictureWrapper>
            <PictureInput type="file" id="image" onChange={getImage} />
            <Picture src={preview} />
          </PictureWrapper>
          <UploadButton
            variant="contained" onClick={(() => {
              setButtonTitle("Upload?")
              setButtonText("Are you sure you want to upload this picture?")
              handleClickOpen()
            })}>Upload</UploadButton>
        </PictureControlsWrapper>
        <InputNames
          label="First Name"
          type="text"
          variant="standard"
          readOnly
          value="Doctor"
        />
        <InputNames
          label="Last Name"
          type="text"
          variant="standard"
          readOnly
          value="Who"
        />
        <InputContacts
          label="Email"
          type="text"
          variant="standard"
          readOnly
          value="user3@intrinsicgrouplimited.com"
        />
        <InputContacts
          label="Join Date"
          type="text"
          variant="standard"
          readOnly
          value="2022-07-25T13:35:33.066+00:00"
        />
        <ButtonsWrapper>
          <GreyButton variant="contained"
            onClick={(() => {
              setButtonTitle("Change password?")
              setButtonText("Are you sure you want to change the password?")
              handlePasswordOpen()
            })}
          >Change Password</GreyButton>
          <GreyButton variant="contained" onClick={(() => navigate(-1))}>Go Back</GreyButton>
        </ButtonsWrapper>
      </Wrapper>
    </SectionProfile>
  );
}

export default Profile