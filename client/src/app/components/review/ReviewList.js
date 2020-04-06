import React, { Component,Fragment } from "react";
import ReviewListItem from "./ReviewListItem";
import { Header, Icon, Card, Segment } from "semantic-ui-react";
import { connect } from "react-redux";
import fetchReviews from "./ReviewActions";

const mapDispatchToProps = {
  fetchReviews
};

const mapStateToProps = ({
  reviews: StaticRange.review.reviews
});

class ReviewList extends Component {
  render() {
    const { reviewlist } = this.props;
    return (
      <Fragment>
        <Segment.Group>
          <Segment>
            <Header size="huge">
              <Icon name="Customer Reviews" />
              <Header.Content>Reviews:</Header.Content>
            </Header>
          </Segment>
          <Segment>
            <Card.Group itemsPerRow={3}>
              {reviewlist &&
                reviewlist.map(reviews => (
                  <ReviewListItem
                    key={reviews.reid}
                    reviews={reviews}
                  />
                ))}
            </Card.Group>
          </Segment>
        </Segment.Group>
      </Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
