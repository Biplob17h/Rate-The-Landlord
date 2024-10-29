const countTotalReview = (reviews, length) => {
  let totalCount = {
    repairRating: 0,
    healthRating: 0,
    rentalRating: 0,
    privacyRating: 0,
    respectRating: 0,
    total: 0,
  };
  reviews.forEach((review) => {
    totalCount.repairRating += Math.floor(review.repairRating / length);
    totalCount.healthRating += Math.floor(review.healthRating / length);
    totalCount.rentalRating += Math.floor(review.rentalRating / length);
    totalCount.privacyRating += Math.floor(review.privacyRating / length);
    totalCount.respectRating += Math.floor(review.respectRating / length);
    totalCount.total += Math.floor(review.totalRating / length);
  });

  return totalCount;
};

export default countTotalReview;
