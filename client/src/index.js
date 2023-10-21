import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import {
  ClerkProvider,
  RedirectToSignIn,
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ProtectedPage from "./pages/ProtectedPage";
import Landing from "./pages/Landing";
import Services from "./pages/Services";
import About from "./pages/About";
import ImgUpload from "./pages/ImgUpload";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SoilForm from "./pages/SoilForm";
import SoilForm1 from "./pages/SoilForm1";
import Forum from "./pages/Forum";

import Home from "./components/Home";
import Buy from "./components/Buy";

import PaymentSuccess from "./components/PaymentSuccess";
import { LanguageProvider } from "./context/LanguageContext";
import { ChakraProvider } from "@chakra-ui/react";
import MobileNumberService from "./components/MobileNumberServices";

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

const root = ReactDOM.createRoot(document.getElementById("root"));

const ClerkWithRoutes = () => {
  const navigate = useNavigate();

  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/sign-in/*"
          element={
            <SignIn redirectUrl={"/home"} routing="path" path="/sign-in" />
          }
        />
        <Route
          path="/sign-up/*"
          element={
            <SignUp redirectUrl={"/home"} routing="path" path="/sign-up" />
          }
        />
        <Route
          path="/protected"
          element={
            <>
              <SignedIn>
                <ProtectedPage />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/home"
          element={
            <>
              <SignedIn>
                <Landing />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/services"
          element={
            <>
              <SignedIn>
                <Services />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/upload"
          element={
            <>
              <SignedIn>
                <ImgUpload />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <SignedIn>
                <About />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/chat"
          element={
            <>
              <SignedIn>
                <Chat />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <SignedIn>
                <Register />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/soil"
          element={
            <>
              <SignedIn>
                <SoilForm />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/soil1"
          element={
            <>
              <SignedIn>
                <SoilForm1 />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/forum"
          element={
            <>
              <SignedIn>
                <Forum />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/marketplace"
          element={
            <>
              <SignedIn>
                <Home />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/buy"
          element={
            <>
              <SignedIn>
                <Buy />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/payment-success"
          element={
            <>
              <SignedIn>
                <PaymentSuccess />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/services"
          element={
            <>
              <SignedIn>
                <Services />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/mobile-number"
          element={
            <>
              <SignedIn>
                <MobileNumberService />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </ClerkProvider>
  );
};

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <LanguageProvider>
        <BrowserRouter>
          <ClerkWithRoutes />
        </BrowserRouter>
      </LanguageProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
