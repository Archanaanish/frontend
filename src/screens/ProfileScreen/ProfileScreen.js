import React,{useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import "./ProfileScreen.css";
import MainScreen from "../../components/MainScreen";
import { updateProfile } from "../../actions/userActions";
import { Col, Row, Button, Form } from 'react-bootstrap';
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useHistory } from 'react-router-dom';

const ProfileScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [picMessage, setPicMessage] = useState();



    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading, error, success } = userUpdate;

    const history = useHistory()

    useEffect(() => {
        if (!userInfo) {
          history.push("/");
        } else {
          setName(userInfo.name);
          setEmail(userInfo.email);
          
        }
      }, [history, userInfo]);
    
     
     
     
     
     
      const submitHandler = (e) => {
        e.preventDefault();

        if(password===confirmPassword)
        dispatch(updateProfile({ name, email, password}));
      };
   
   
   
   
      return (
        <MainScreen  title="EDIT PROFILE">
            <div>
                <Row className='profileContainer'>
                    <Col lg={6}>
                    <Form onSubmit={submitHandler} >
              {loading && <Loading />}
              {success && (
                <ErrorMessage variant="success">
                  Updated Successfully
                </ErrorMessage>
              )}
              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group controlId="name">
                <Form.Label className='mt-2'>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label className='mt-2'>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label className='mt-2'>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                <Form.Label className='mt-2'>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>{" "}
              {picMessage && (
                <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
              )}
               <Button className='mt-4' type="submit" varient="primary">
                Update
              </Button>
            </Form>
          </Col>
                    



                </Row>
            </div>
        </MainScreen>
    )
}

export default ProfileScreen
