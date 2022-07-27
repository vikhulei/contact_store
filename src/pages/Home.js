import { useState } from "react";
import {Section, Form, Input, GreyButton} from "../styles/Style"
import {useNavigate} from "react-router-dom"

const Home = () => {

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/profile")
  }

  return (
    <Section>
      <h1>Select An Option</h1>
        <Form>
        <GreyButton variant="contained" onClick={handleSubmit}>Profile</GreyButton>
        </Form>
    </Section>
  );
}

export default Home