import React, { Fragment, useEffect } from "react";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { Button, Card, Container, Stack, Typography } from "@mui/material";
import "./Profile.css";
import Page from "../Page";
const Profile = ({ history }) => {
  // const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const isAuthenticated = localStorage.getItem("isAuthenticated");
  var userInfo = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);
  return (
    <Page title="Dashboard: Profile | Stokify">
      <Container>
        <Card>
          <Typography variant="h4" gutterBottom textAlign={"center"}>
            {userInfo["name"]}'s Profile
          </Typography>
          {isAuthenticated ? (
            <div className="profileContainer">
              <div>
                <img src={"../Profile.png"} alt={userInfo["name"]} />
                <Link to="/me/update">Edit Profile</Link>
              </div>
              <div>
                <div>
                  <h4>Role</h4>
                  <p>{userInfo["role"]}</p>
                </div>
                <div></div>
                <div>
                  <h4>Full Name</h4>
                  <p>{userInfo["name"]}</p>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>{userInfo["email"]}</p>
                </div>
                <div>
                  <h4>Joined On</h4>
                  <p>{String(userInfo.createdAt).substr(0, 10)}</p>
                </div>

                <div>
                  <Link to="/orders">My Orders</Link>
                  <Link to="/password/update">Change Password</Link>
                </div>
              </div>
            </div>
          ) : (
            <Loader />
          )}
        </Card>
      </Container>
    </Page>
  );
};

export default Profile;
