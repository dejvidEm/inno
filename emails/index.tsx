import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

type ContactFormEmailProps = {
  message: string;
  email: string;
  name: string;
  number: string;
  kurz: string;
};

export default function ContactFormEmail({
  message,
  email,
  name,
  number,
  kurz
}: ContactFormEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>INNOAcademy</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container>
            <Section className="bg-white borderBlack my-10 px-10 py-4 rounded-md">
              <Heading className="leading-tight">
                Nová registrácia na INNOAcademy
              </Heading>
              <Text>{message}</Text>
              <Hr />
              <Text>Meno odosielateľa: {name}</Text>
              <Text>Email odosielateľa: {email}</Text>
              <Text>Mobil odosielateľa: {number}</Text>
              <Text>Zvolený kurz: {kurz}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}