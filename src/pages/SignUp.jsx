import "../index.css";

import axios from "axios";
import { Form, Formik } from "formik";
import React from "react";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Col, FormGroup, Input, Label } from "reactstrap";
import * as Yup from "yup";

import LoginRight from "../components/LoginRight";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email tidak valid"),
  password: Yup.string().required("Password tidak valid"),
  name: Yup.string()
    .min(2, "*Nama minimal mempunyai 2 huruf")
    .max(20, "*Nama maksimal mempunyai 20 huruf")
    .required("Masukkan Nama Lengkap"),
});

function SignUp() {
  const navigate = useNavigate();
  const handleSignIn = () => navigate("/SignIn");

  return (
    <div className="signInLeft" style={{ overflow: "hidden" }}>
      <Row>
        <Col
          lg={6}
          style={{display: "flex"}}
          className="justify-content-center, align-items-center"
        >
          <div style={{ margin: "auto", width: "370px" }}>
            <div className="bluebox" style={{ backgroundColor: "#CFD4ED" }} />
            <br />
            <div>
              <h2>Welcome Back!</h2>
              <br />
            </div>
            <Formik
              enableReinitialize
              validationSchema={validationSchema}
              initialValues={{
                name: "",
                email: "",
                password: "",
              }}
              onSubmit={async (value) => {
                try {
                  const res = await axios.post(
                    "https://bootcamp-rent-cars.herokuapp.com/customer/auth/register",
                    value
                  );

                  localStorage.setItem("auth", JSON.stringify(res.data));

                  navigate("/SignIn");
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              {(formikProps) => (
                <Form>
                  <FormGroup>
                    <Label for="exampleName">Name*</Label>
                    <Input
                      id="exampleName"
                      name="name"
                      placeholder="Nama Lengkap"
                      type="name"
                      value={formikProps.values.name}
                      onChange={formikProps.handleChange}
                    />
                    {formikProps.errors.name && formikProps.touched.name && (
                      <small style={{ color: "red" }}>
                        {formikProps.errors.name}
                      </small>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="exampleEmail">Email*</Label>
                    <Input
                      id="exampleEmail"
                      name="email"
                      placeholder="Contoh: johndee@gmail.com"
                      value={formikProps.values.email}
                      onChange={formikProps.handleChange}
                    />
                    {formikProps.errors.email && formikProps.touched.email && (
                      <small style={{ color: "red" }}>
                        {formikProps.errors.email}
                      </small>
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplePassword">Password</Label>
                    <Input
                      id="examplePassword"
                      name="password"
                      placeholder="6+ karakter"
                      type="password"
                      value={formikProps.values.password}
                      onChange={formikProps.handleChange}
                    />
                    {formikProps.errors.password &&
                      formikProps.touched.password && (
                        <small style={{ color: "red" }}>
                          {formikProps.errors.password}
                        </small>
                      )}
                  </FormGroup>
                  <br />
                  <button
                    type="submit"
                    className="button1"
                    style={{ width: "100%", backgroundColor: "#0D28A6" }}
                  >
                    SignUp
                  </button>
                  <br />
                  <br />
                  <div className="text-center">
                    Already have an account?{" "}
                    <a href="#" onClick={handleSignIn}>
                      Sign In here
                    </a>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Col>
        <LoginRight />
      </Row>
    </div>
  );
}

export default SignUp;
