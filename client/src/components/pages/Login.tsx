import React, { Fragment, useState } from "react";
import { Container } from "react-bootstrap";
import { connect } from "react-redux";
import { loginStaff, loginHR } from "../../actions/auth";
import PropTypes from "prop-types";
import { Button, Row, Col, Card, Space, Typography } from "antd";
import { rowGutterStyle } from "../../App";


const { Title } = Typography;

const Login = ({
  loginStaff,
  loginHR,
  auth: { user, loading },

}: any) => {
  const [view, setView] = useState("Staff");

    return (
      <Container style={{ height: "100vh" }}>
        <Row
          gutter={rowGutterStyle}
          align="middle"
          justify="center"
          style={{ height: "100%" }}
        >
          <Col xs={22} sm={22} md={14} lg={12} xl={10} xxl={8}>
            <Card>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Title level={3}>{view} Login</Title>
                <div style={{ marginTop: "5vh" }}></div>
                {view === "Staff" ? (
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Button block type="primary" onClick={loginStaff}>
                      Login
                    </Button>
                    <Button block type="link" onClick={() => setView("HR")}>
                      Switch to HR Login
                    </Button>
                  </Space>
                ) : (
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Button block type="primary" onClick={loginHR}>
                      Login
                    </Button>
                    <Button block type="link" onClick={() => setView("Staff")}>
                      Switch to Staff Login
                    </Button>
                  </Space>
                )}
              </Space>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  Login.propTypes = {
    loginHR: PropTypes.func.isRequired,
    loginStaff: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  };

  const mapStateToProps = (state: any) => ({
    auth: state.auth,
  });

export default connect(mapStateToProps, { loginHR, loginStaff})(Login);
