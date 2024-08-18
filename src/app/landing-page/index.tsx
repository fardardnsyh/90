"use client";
import Image from "next/image";
import React from "react";
import FormGenerator from "../form-generator";

type Props = {};

const LandingPage = (props: Props) => {
  return (
    <>
      <section
        className="flex flex-col items-center justify-center space-y-4 pt-4 sm:pt-[25px] w-full"
        id="hero"
      >
        <h1 className="head-text">Create your forms</h1>
        <h2 className="text-2xl p-2 capitalize font-bold text-center tracking-tighter sm:text-3xl md:text-4xl leading-2 text-foreground">
          in seconds not hours.
        </h2>
        <p className="max-w-[600px] mt-4 text-center text-gray-500md:text-xl">
          Create, publish, and share your form instantly with the help of AI
          technology. Enjoy a quick and easy setup, ensuring your forms are live
          in no time.
        </p>
        <FormGenerator />
      </section>
      <section
        className="flex flex-col items-center justify-center space-y-4 mt-12 pb-24"
        id="features"
      >
        <h2 className="text-xl capitalize font-bold text-center tracking-tighter sm:text-2xl md:text-3xl">
          How it works
        </h2>
        <ul className="grid gap-4grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl text-center">
          <li className="flex flex-col items-center space-y-4 relative max-sm:mb-4">
            <Image
              src="/images/demo1.png"
              width="300"
              height="300"
              alt="create a form"
              className="bg-transparent shadow-md rounded-md"
            />

            <p className="text-gray-500 text-sm">
              Add a prompt and describe the requirements for your form.
            </p>
          </li>
          <li className="flex flex-col items-center space-y-4 relative max-sm:mb-4">
            <Image
              src="/images/demo2.png"
              width="300"
              height="300"
              alt="generate a form"
              className="bg-transparent shadow-md rounded-md"
            />

            <p className="text-gray-500 text-sm">Let AI generate your form.</p>
          </li>
          <li className="flex flex-col items-center space-y-4 relative">
            <Image
              src="/images/demo3.png"
              width="300"
              height="300"
              alt="generate a form"
              className="bg-transparent shadow-md rounded-md"
            />

            <p className="text-gray-500 text-sm max-sm:mb-4">
              Check form results and more.
            </p>
          </li>
        </ul>
      </section>
    </>
  );
};

export default LandingPage;
