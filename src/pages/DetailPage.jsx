import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router';
import {
  fetchThreadDetail,
  handleDownVoteComment,
  handleDownVoteThreadDetail,
  handleUpVoteComment,
  handleUpVoteThreadDetail,
} from '../states/threadDetail/action';
import ThreadCard from '../components/threads/ThreadCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import ReplyCard from '../components/threads/ReplyCard';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { threadDetail, authUser } = useSelector((states) => states);

  useEffect(() => {
    dispatch(fetchThreadDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    console.log(threadDetail);
  }, [threadDetail]);

  const upVoteThread = () => {
    dispatch(handleUpVoteThreadDetail());
  };

  const downVoteThread = () => {
    dispatch(handleDownVoteThreadDetail());
  };

  const upVoteComment = (commentId) => {
    dispatch(handleUpVoteComment(commentId));
  };

  const downVoteComment = (commentId) => {
    dispatch(handleDownVoteComment(commentId));
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <section className="p-5 lg:p-8 flex flex-col gap-5">
      <Link to="/">
        <h2 className="font-semibold text-gray-800 hover:text-pink-600">
          {' '}
          <FontAwesomeIcon icon={faArrowLeft} /> Back to home
        </h2>
      </Link>
      <ThreadCard
        {...threadDetail}
        totalComments={threadDetail.comments.length}
        fullBody
        onUpVote={upVoteThread}
        onDownVote={downVoteThread}
        authUserId={authUser.id}
      />
      <ReplyCard
        comments={threadDetail.comments}
        onUpVote={upVoteComment}
        onDownVote={downVoteComment}
        authUserId={authUser.id}
      />
    </section>
  );
}

export default DetailPage;
