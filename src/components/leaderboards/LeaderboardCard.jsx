import PropTypes from 'prop-types';
import BaseCard from '../ui/BaseCard';
import LeaderboardItem from './LeaderboardItem';

function LeaderboardCard({ leaderboards }) {
  return (
    <BaseCard className="flex flex-col gap-3">
      <h2 className="font-semibold text-gray-800 mb-5">Leaderboard</h2>
      <div className="flex flex-col gap-5">
        {leaderboards.map((leaderboard, index) => {
          return <LeaderboardItem key={index} {...leaderboard} />;
        })}
      </div>
    </BaseCard>
  );
}

LeaderboardCard.propTypes = {
  leaderboards: PropTypes.array.isRequired,
};

export default LeaderboardCard;
