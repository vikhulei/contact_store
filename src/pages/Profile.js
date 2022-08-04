import { useState, useEffect, useRef } from "react";
import axios from "axios";
import FormData from "form-data";
import { CircularProgress } from "@mui/material";
import { GreyButton } from "../styles/GeneralStyles"
import { SectionProfile, Wrapper, InputNames, InputContacts, PictureControlsWrapper, PictureText, PictureWrapper, PictureInput, Picture, ButtonsWrapper, UploadButton } from "../styles/ProfileStyles"
import TwoButtonsDialogBox from "../components/TwoButtonsDialogBox";
import OneButtonDialogBox from "../components/OneButtonDialogBox";
import ChangePassword from "../components/ChangePassword";


const Profile = ({ navigate, token, password, user }) => {
  const [openTwoButtonsDialogBox, setOpenTwoButtonsDialogBox] = useState(false)
  const [openOneButtonDialogBox, setOpenOneButtonDialogBox] = useState(false)
  const [openPasswordBox, setOpenPasswordBox] = useState(false)
  const [buttonTitle, setButtonTitle] = useState("")
  const [buttonText, setButtonText] = useState("")
  const [profile, setProfile] = useState({})
  const [photo, setPhoto] = useState()
  const [image, setImage] = useState()
  const [loading, setLoading] = useState(false)
  const fileRef = useRef(null)

  const handleClickOpen = () => {
    setOpenTwoButtonsDialogBox(true);
  };

  const handleClickClose = () => {
    setOpenTwoButtonsDialogBox(false);
  };

  const handlePasswordOpen = () => {
    setOpenPasswordBox(true);
  };

  const handlePasswordClose = () => {
    setOpenPasswordBox(false);
  };

  const handleOneButtonOpen = () => {
    setOpenOneButtonDialogBox(true);
  };

  const handleOneButtonClose = () => {
    setOpenOneButtonDialogBox(false);
  };

  const action = () => {
    uploadImage()
    handleClickClose()
  }

  const getImage = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      fileRef.current.value = null
      setButtonTitle("Change the image?")
      setButtonText("Upload the selected image?")
      handleClickOpen()
    }
  }

  const uploadImage = async () => {
    const formData = new FormData()
    formData.append("file", image)
    try {
      setLoading(true)
      setButtonTitle("Uploading the image")
      setButtonText("Image has been uploaded")
      handleOneButtonOpen()
      const resp = await axios.post("https://interview.intrinsiccloud.net/profile/profileImage",
        formData,
        {
          params: { name: user },
          headers: {
            "Authorization": `Bearer ${token}`,
            "content-type": "multipart/form-data",
          }
        })
      if (resp.status === 200) {
        setLoading(false)
        setButtonTitle("Uploading the image")
        setButtonText("Image has been successfully uploaded")
        handleOneButtonOpen()
      }
    } catch (error) {
      setLoading(false)
      setButtonTitle("Can't upload the file")
      setButtonText(error.toString())
      handleOneButtonOpen()
    }
  }

  const getProfile = async () => {
    try {

      const profileDetails = await axios.get(
        "https://interview.intrinsiccloud.net/profile",
        { headers: { "Authorization": `Bearer ${token}` } }
      )
      setProfile(profileDetails.data)
    } catch (error) {
      setButtonTitle("Can't download profile details")
      setButtonText(error.toString())
      handleOneButtonOpen()
    }
  }

  const getPhoto = async () => {
    try {
      const res = await fetch("https://interview.intrinsiccloud.net/profile/profileImage/3");
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setPhoto(imageObjectURL);
    } catch (error) {
      setButtonTitle("Can't download profile image")
      setButtonText(error.toString())
      handleOneButtonOpen()
    }
  };

  useEffect(() => {
    getProfile()
    getPhoto()
  }, [photo])

  return (
    <SectionProfile>
      <OneButtonDialogBox
        openDialogBox={openOneButtonDialogBox}
        handleClickClose={handleOneButtonClose}
        buttonTitle={buttonTitle}
        buttonText={loading ? <CircularProgress /> : buttonText}
      />
      <TwoButtonsDialogBox
        openDialogBox={openTwoButtonsDialogBox}
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
          <PictureText>Click photo to upload a new profile image:</PictureText>
          <PictureWrapper>
            <PictureInput
              type="file"
              id="image"
              ref={fileRef}
              onChange={getImage}
            />
            <Picture src={photo} />
          </PictureWrapper>
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
          value={profile.joinDate ? profile.joinDate : ""}
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