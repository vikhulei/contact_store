import { useState, useEffect } from "react";
import axios from "axios";
import FormData from "form-data";
import { GreyButton } from "../styles/GeneralStyles"
import { SectionProfile, Wrapper, InputNames, InputContacts, PictureControlsWrapper, PictureText, PictureWrapper, PictureInput, Picture, ButtonsWrapper, UploadButton } from "../styles/ProfileStyles"
import TwoButtonsDialogBox from "../components/TwoButtonsDialogBox";
import ChangePassword from "../components/ChangePassword";


const Profile = ({ navigate, token, password, user }) => {
  const [openTwoButtonsDialogBox, setOpenTwoButtonsDialogBox] = useState(false)
  const [openPasswordBox, setOpenPasswordBox] = useState(false)
  const [buttonTitle, setButtonTitle] = useState("")
  const [buttonText, setButtonText] = useState("")
  const [profile, setProfile] = useState({})
  const [photo, setPhoto] = useState()
  const [image, setImage] = useState()

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

  const action = () => {
    uploadImage()
    handleClickClose()
  }

  const getImage = (e) => {
    const file = e.target.files[0]
    setImage(file)
    setButtonTitle("Change the image?")
    setButtonText("Are you sure you want to upload this profile image?")
    handleClickOpen()
  }

  const uploadImage = async () => {
    const formData = new FormData()
    // formData.append("file", e.target.files[0])
    formData.append("file", image)

    try {
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
        alert("Image uploaded")
      }
    } catch (error) {
      alert(error.toString())
      // handleClickOpen()
    }
  }

  const getProfile = async () => {
    const profileDetails = await axios.get(
      "https://interview.intrinsiccloud.net/profile",
      { headers: { "Authorization": `Bearer ${token}` } }
    )
    setProfile(profileDetails.data)

  }

  const getPhoto = async () => {
    const res = await fetch("https://interview.intrinsiccloud.net/profile/profileImage/3");
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setPhoto(imageObjectURL);
  };

  useEffect(() => {
    getProfile()
    getPhoto()
  }, [photo])

  return (
    <SectionProfile>
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
            <PictureInput type="file" id="image" onChange={getImage} />
            <Picture src={photo} />
          </PictureWrapper>
          {/* <UploadButton
            variant="contained"
            onClick={uploadImage}
          >Upload</UploadButton> */}
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