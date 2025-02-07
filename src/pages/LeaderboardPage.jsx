import { useDispatch, useSelector } from 'react-redux';
import LeaderboardCard from '../components/leaderboards/LeaderboardCard';
import { useEffect } from 'react';
import { fetchLeaderboards } from '../states/leaderboards/action';

function LeaderboardPage() {
  const dispatch = useDispatch();
  const { leaderboards = [] } = useSelector((states) => states);

  useEffect(() => {
    dispatch(fetchLeaderboards());
  }, [dispatch]);

  return (
    <section className="p-5 lg:p-8">
      <LeaderboardCard
        leaderboards={leaderboards.map((leaderboard) => {
          return {
            name: leaderboard.user.name,
            avatar: leaderboard.user.avatar,
            score: leaderboard.score,
          };
        })}
      />
    </section>
  );
}

export default LeaderboardPage;
