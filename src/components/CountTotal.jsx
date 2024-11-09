const countTotalReview = (reviews, length) => {
  let totalCount = 0;
  reviews.forEach((review) => {
    totalCount = totalCount + review.rating;
  });

  const totalRating = totalCount / length;

  return totalRating;
};

export default countTotalReview;
