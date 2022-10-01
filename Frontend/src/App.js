import './App.css';
import { Col, Container, Row } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import User from "./User";
import UserOnlineApplication from "./UserOnlineApplication";
import UserInquireApplication from "./UserInquireApplication";
import Staff from "./Staff";
import StaffBrowseApplication from "./StaffBrowseApplication";
import StaffChangeStatus from "./StaffChangeStatus";
import About from "./About";
import NotFound from "./NotFound";
import React from "react";

function App() {
  return <>
    <Container>
      <Row>
        <Col>
          <Routes>
            <Route path="/" element={<Navigate replace to="/Login" />} />
            <Route path="/About" element={<About />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/User" element={<User />} />
            <Route path="/UserOnlineApplication" element={<UserOnlineApplication />} />
            <Route path="/UserInquireApplication" element={<UserInquireApplication />} />
            <Route path="/Staff" element={<Staff />} />
            <Route path="/StaffBrowseApplication" element={<StaffBrowseApplication />} />
            <Route path="/StaffChangeStatus" element={<StaffChangeStatus />} />
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </Col>
      </Row>
    </Container>
  </>;
}

export default App;
