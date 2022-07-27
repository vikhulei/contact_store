import { useState } from "react";
import {Section, Form, Input, GreyButton} from "../styles/Style"

const ContactsList = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Section>
      <h1>Add New Contact</h1>
        <Form>
        
        </Form>      
    </Section>
  );
}

export default ContactsList