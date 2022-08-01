import { useState, useEffect } from "react";
import axios from "axios";
import {GreyButton} from "../styles/GeneralStyles"
import {SectionProfile, Wrapper, InputNames, InputContacts, PictureControlsWrapper, PictureText, PictureWrapper, PictureInput, Picture, ButtonsWrapper, UploadButton} from "../styles/ProfileStyles"
import TwoButtonsDialogBox from "../components/TwoButtonsDialogBox";
import ChangePassword from "../components/ChangePassword";


const Profile = ({navigate, token, password}) => {
  const [preview, setPreview] = useState(null)
  const [openDialogBox, setOpenDialogBox] = useState(false)
  const [openPasswordBox, setOpenPasswordBox] = useState(false)
  const [buttonTitle, setButtonTitle] = useState("")
  const [buttonText, setButtonText] = useState("")
  const [profile, setProfile] = useState({})
  const [photo, setPhoto] = useState()

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

  const getProfile = async () => {
    const profileDetails = await axios.get(
      "https://interview.intrinsiccloud.net/profile",
      { headers: {"Authorization" : `Bearer ${token}`} }
      )
      setProfile(profileDetails.data)
  }

// const getPhoto = async () => {
//   const photoDetails = await axios.get(
//     "https://interview.intrinsiccloud.net/profile/profileImage/3",
//     {headers: {"Authorization" : `Bearer ${token}`}})
//     //  responseType:""})
//     // const photoURL = URL.createObjectURL(photoDetails)
//     // console.log(photoDetails.request.responseURL)
//     setPhoto(photoDetails.request.responseURL)
// }


const getPhoto = async () => {
  const res = await fetch("https://interview.intrinsiccloud.net/profile/profileImage/3");
  const imageBlob = await res.blob();
  const imageObjectURL = URL.createObjectURL(imageBlob);
  // console.log(imageObjectURL)
  setPhoto(imageObjectURL);
};



useEffect(() => {
  getProfile()
  getPhoto()
}, [])

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
        password={password}
        token={token}
        buttonTitle={buttonTitle}
        buttonText={buttonText}
      />
      <h1>Profile</h1>
      <Wrapper>
        <PictureControlsWrapper>
          <PictureText>Click to select new photo:</PictureText>
          <PictureWrapper>
            <PictureInput type="file" id="image" onChange={getImage} />
            <Picture src={photo} />
          </PictureWrapper>
          <UploadButton
            variant="contained" onClick={(() => {
              getPhoto()
              setButtonTitle("Upload?")
              setButtonText("Are you sure you want to upload this picture?")
              // handleClickOpen()
            })}>Upload</UploadButton>
        </PictureControlsWrapper>
        <InputNames
          label="First Name"
          type="text"
          variant="standard"
          readOnly
          value={profile.firstName ? profile.firstName : ""}
        />
        <InputNames
          label="Last Name"
          type="text"
          variant="standard"
          readOnly
          value={profile.lastName ? profile.lastName : ""}
        />
        <InputContacts
          label="Email"
          type="text"
          variant="standard"
          readOnly
          value={profile.emailAddress ? profile.emailAddress : ""}
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