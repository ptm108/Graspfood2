import React, { Component, Fragment } from "react";
import { Grid, Header, Card, Rating, Segment } from "semantic-ui-react";
import AccountNav from "../user/AccountNav";
import { connect } from "react-redux";
import { fetchReviews } from "./customerUtils/customerActions";
import { Link } from "react-router-dom";

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  reviews: state.customer.reviews,
});

const mapDispatchToProps = { fetchReviews };

class ReviewPostings extends Component {
  componentDidMount() {
    this.props.fetchReviews(this.props.currentUser);
  }

  render() {
    const { reviews } = this.props;
    console.log(reviews);

    return (
      <Fragment>
        <Grid>
          <Grid.Column width={12}>
            <Segment.Group>
              <Segment inverted>
                <Header>Review Postings</Header>
              </Segment>
              <Segment>
                <Card.Group itemsPerRow={3}>
                  {reviews &&
                    reviews.map((review) => (
                      <Card
                        as={Link}
                        to={`/order/${review.oid}`}
                        color="orange"
                      >
                        <Card.Content>
                          <Card.Header>Title: {review.title}</Card.Header>
                          <Card.Meta>Order ID: {review.oid}</Card.Meta>
                          <Card.Meta>
                            Review Date:{" "}
                            {new Date(review.timestamp).toLocaleDateString()}
                          </Card.Meta>
                          <Card.Description>
                            Description: {review.description}
                          </Card.Description>
                        </Card.Content>
                        <Card.Content>
                          <Rating
                            defaultRating={review.rating}
                            maxRating={5}
                            disabled
                          ></Rating>
                        </Card.Content>
                      </Card>
                    ))}
                </Card.Group>
              </Segment>
            </Segment.Group>
          </Grid.Column>
          <Grid.Column width={4}>
            <AccountNav />
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPostings);
