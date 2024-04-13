import * as React from 'react';
import ReviewHistoryItem from './ReviewHistoryItem';
import { IMyFeedbackItem } from '@/types/myFeedbackType';
import myFeedbackApi from '@/api/myFeedbackApi';

export interface IReviewHistoryListProps {
}

export default function ReviewHistoryList (props: IReviewHistoryListProps) {
  const [myFeedback, setMyFeedback] = React.useState<IMyFeedbackItem[]>([]);
    React.useEffect(() => {
        myFeedbackApi.getMyFeedback().then((res) => {
          setMyFeedback(res.feedbackResponseDtos);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

  return (
    <div className="">
      <h2 className="text-center md:text-left text-xl md:text-3xl font-bold mb-4">Lịch sử đánh giá</h2>
      {myFeedback.length > 0 ? (
        myFeedback.map((item) => (
          <ReviewHistoryItem key={item.id} item={item} />
        ))
      ) : (
        <p className='text-center'>Bạn chưa từng đánh giá homestay chúng tôi</p>
      )}
    </div>
  );
}
