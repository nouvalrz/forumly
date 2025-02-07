import PropTypes from 'prop-types';
import IconButton from '../buttons/IconButton';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import {
  faThumbsUp as solidFaThumbsUp,
  faThumbsDown as solidFaThumbsDown,
} from '@fortawesome/free-solid-svg-icons';
import { dateToLocale } from '../../utils/date';

function ReplyItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  onUpVote,
  onDownVote,
  authUserId,
}) {
  const isVote = upVotesBy.includes(authUserId);
  const isDownVote = downVotesBy.includes(authUserId);

  return (
    <div className="lg:flex lg:flex-row block items-start gap-3">
      <img
        src={owner.avatar}
        alt="Profile"
        className="rounded-full w-7 hidden lg:block"
      />
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-3 items-center">
            <img
              src={owner.avatar}
              alt="Profile"
              className="rounded-full w-7 lg:hidden"
            />
            <p className="text-sm font-semibold  text-gray-800">{owner.name}</p>
          </div>
          <p className="text-xs text-gray-600">{dateToLocale(createdAt)}</p>
        </div>
        <div
          className="text-sm text-gray-800"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="flex flex-row gap-3">
          <IconButton
            icon={isVote ? solidFaThumbsUp : faThumbsUp}
            title={upVotesBy.length}
            onClick={() => onUpVote(id)}
            titleClass="order-1"
            className="text-gray-600 gap-1 text-sm"
          />
          <IconButton
            icon={isDownVote ? solidFaThumbsDown : faThumbsDown}
            title={downVotesBy.length}
            titleClass="order-1"
            onClick={() => onDownVote(id)}
            className="text-gray-600 gap-1 text-sm"
          />
        </div>
      </div>
    </div>
  );
}

ReplyItem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  authUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  onDownVote: PropTypes.func.isRequired,
  onUpVote: PropTypes.func.isRequired,
};

export default ReplyItem;
