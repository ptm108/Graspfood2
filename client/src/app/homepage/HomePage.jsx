import React from "react";
import {
  Segment,
  Container,
  Button,
  Icon,
  Header,
  Image
} from "semantic-ui-react";
import { Animate } from "react-move";
import { easeExpInOut } from "d3-ease";

const HomePage = ({ history }) => {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        {/* <Animate
          start={{
            opacity: 0
          }}
          enter={{
            opacity: [1],
            timing: { duration: 1000, ease: easeExpInOut }
          }}
        >
          
        </Animate> */}
        <div className="homepageheader">GraspFood</div>
        <Button
          onClick={() => history.push("/register")}
          size="huge"
          inverted
          color="black"
        >
          Register
        </Button>
        <Button
          onClick={() => history.push("/dashboard")}
          size="huge"
          inverted
          color="black"
        >
          Login
          <Icon name="right arrow" inverted />
        </Button>
      </Container>
    </Segment>
  );
};

export default HomePage;
