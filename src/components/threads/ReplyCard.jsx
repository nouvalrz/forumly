import BaseCard from '../ui/BaseCard';
import ReplyItem from './ReplyItem';
import PropTypes from 'prop-types';
import ReplyForm from './ReplyForm';

function ReplyCard({ comments, onUpVote, onDownVote, authUserId }) {
  return (
    <BaseCard>
      <h2 className="font-semibold text-gray-800 mb-3">
        Comments ({comments.length})
      </h2>

      <ReplyForm />

      <div className="flex flex-col gap-3">
        {comments.map((comment) => {
          return (
            <ReplyItem
              key={comment.id}
              {...comment}
              onUpVote={onUpVote}
              onDownVote={onDownVote}
              authUserId={authUserId}
            />
          );
        })}
      </div>
    </BaseCard>
  );
}

ReplyCard.propTypes = {
  comments: PropTypes.array,
  authUserId: PropTypes.string,
  onDownVote: PropTypes.func,
  onUpVote: PropTypes.func,
};

export default ReplyCard;
