import PropTypes from 'prop-types';

function LeaderboardItem({ name, avatar, score }) {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row gap-2 items-center">
        <img alt="Profile" className="rounded-full w-7" src={avatar} />
        <p>{name}</p>
      </div>
      <p>{score}</p>
    </div>
  );
}

LeaderboardItem.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default LeaderboardItem;
