import PropTypes from 'prop-types';
import BaseCard from '../ui/BaseCard';
import IconButton from '../buttons/IconButton';
import {
  faComment,
  faThumbsDown,
  faThumbsUp,
} from '@fortawesome/free-regular-svg-icons';
import {
  faThumbsUp as solidFaThumbsUp,
  faThumbsDown as solidFaThumbsDown,
} from '@fortawesome/free-solid-svg-icons';
import { dateToLocale } from '../../utils/date';
import { Link } from 'react-router';
import clsx from 'clsx';

function ThreadCard({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  totalComments,
  authUserId,
  fullBody = false,
  onUpVote,
  onDownVote,
}) {
  const isVote = upVotesBy.includes(authUserId);
  const isDownVote = downVotesBy.includes(authUserId);

  return (
    <BaseCard>
      <div className="lg:flex lg:flex-row block items-start gap-3">
        <img
          src={owner.avatar}
          alt="Profile"
          className="rounded-full w-7 hidden lg:block"
        />
        <div className="lg:flex-1">
          <div className="flex flex-row justify-start items-center lg:items-start gap-2">
            <img
              src={owner.avatar}
              alt="Profile"
              className="rounded-full w-7 lg:hidden"
            />
            <div>
              <p className="text-sm font-semibold  text-gray-800">
                {owner.name}
              </p>
              <p className="text-xs text-gray-600">{dateToLocale(createdAt)}</p>
            </div>
          </div>
          <Link to={`/thread/${id}`}>
            <h2 className="font-bold text-lg text-gray-800 mb-1 mt-2 hover:text-pink-600">
              {title}
            </h2>
          </Link>
          <div
            className={clsx('text-sm text-gray-800', {
              'line-clamp-5': !fullBody,
            })}
            dangerouslySetInnerHTML={{ __html: body }}
          />
          <div className="flex flex-row justify-between mt-5 items-center">
            <div className="flex flex-row gap-3">
              <IconButton
                icon={isVote ? solidFaThumbsUp : faThumbsUp}
                title={upVotesBy.length.toString()}
                titleClass="order-1"
                className="text-gray-600 gap-1 text-sm"
                onClick={onUpVote}
              />
              <IconButton
                icon={isDownVote ? solidFaThumbsDown : faThumbsDown}
                title={downVotesBy.length.toString()}
                titleClass="order-1"
                className="text-gray-600 gap-1 text-sm"
                onClick={onDownVote}
              />
              <IconButton
                icon={faComment}
                title={totalComments.toString()}
                titleClass="order-1"
                className="text-gray-600 gap-1 text-sm"
              />
            </div>
            <p className="text-xs  text-gray-600">#{category}</p>
          </div>
        </div>
      </div>
    </BaseCard>
  );
}

ThreadCard.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
  category: PropTypes.string,
  createdAt: PropTypes.string,
  owner: PropTypes.object,
  upVotesBy: PropTypes.array,
  downVotesBy: PropTypes.array,
  totalComments: PropTypes.number,
  authUserId: PropTypes.string,
  fullBody: PropTypes.bool,
  onDownVote: PropTypes.func,
  onUpVote: PropTypes.func,
};

export default ThreadCard;
