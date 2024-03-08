import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useRating } from "@/context/ratingContext";
import { useAuth } from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import { getProductReviews } from "@/utils/getProductReviews";

export const useProductRating = (id: string) => {
  const { setIsChangesSaved } = useRating();
  const { user } = useAuth();

  // const { data: ratingData } = useQuery({
  //   queryKey: ["productReviews"],
  //   queryFn: () => axiosInstance.get(`/api/products/reviews/userReview/${id}`),
  // });

  const handleDeleteComments = useCallback(
    (commentId: number) => {
      axiosInstance
        .delete(`api/products/reviews/deleteReview/${commentId}`, {
          params: {
            userId: user?.id,
          },
        })
        .then(() => {
          setIsChangesSaved(true);
        })
        .catch((error) => {
          console.error("Error deleting rating and review text", error);
        });
    },
    [user?.id, setIsChangesSaved]
  );

  const [userRating, setUserRating] = useState(0);
  const [reviewUserText, setReviewUserText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submitHandler = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const data = {
        rating: userRating,
        review_text: reviewUserText,
        userId: user?.id,
      };

      try {
        const response = await axiosInstance.post(
          `/api/products/reviews/${id}`,
          data
        );

        if (response.status === 201) {
          console.log("Review has been submitted successfully.");
          setUserRating(0);
          setReviewUserText("");
          setErrorMessage("");
          setIsChangesSaved(true);
        } else {
          console.log("Review submission was not successful.");
          setErrorMessage("Review submission was not successful.");
        }
      } catch (error: any) {
        console.error("Error submitting review", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setErrorMessage(error.response.data.message);
        } else {
          setErrorMessage("Error submitting review. Please try again later.");
        }
      }
    },
    [id, reviewUserText, user?.id, userRating, setIsChangesSaved]
  );

  return {
    // ratingData,
    handleDeleteComments,
    submitHandler,
    errorMessage,
    reviewUserText,
    setReviewUserText,
    userRating,
    setUserRating,
  };
};
