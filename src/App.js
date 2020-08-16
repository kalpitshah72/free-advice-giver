import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import axios from "axios";
import { Button, Descriptions, Layout } from "antd";
import "antd/dist/antd.css";

const HeartSvg = () => (
  <svg width="1em" height="1em" fill="red" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);

const App = () => {
  const [showAdvice, setShowAdvice] = useState("");
  const { Header, Footer, Content } = Layout;
  const getAdvice = async () => {
    const { data } = await axios.get("https://api.adviceslip.com/advice");
    const { advice } = data.slip;
    if (showAdvice === advice) {
      getAdvice();
    }
    setShowAdvice(advice);
  };

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <>
      <Layout>
        <Header>
          <div className="header">
            <h2>FREE ADVICE GIVER</h2>
          </div>
        </Header>
        <Content>
          <div className="app-container">
            {showAdvice && (
              <Fragment>
                {/* <h1 className="heading"> SEEK ADVICE </h1> */}
                <Descriptions
                  bordered
                  column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                >
                  <Descriptions.Item>
                    <h2 className="heading">{showAdvice}</h2>
                  </Descriptions.Item>
                </Descriptions>
                <Button className="button" onClick={() => getAdvice()}>
                  <span className="heading">Get An Advice ! </span>
                </Button>
              </Fragment>
            )}
          </div>
        </Content>
        <Footer>
          <div className="footer">
            <h3>
              Made with <HeartSvg /> by Kalpit{" "}
            </h3>
          </div>
        </Footer>
      </Layout>
    </>
  );
};

export default App;
