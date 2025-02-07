import { useDispatch, useSelector } from 'react-redux';
import ThreadCard from '../components/threads/ThreadCard';
import { useEffect, useState } from 'react';
import { populateThreadsAndUsers } from '../states/shared/action';
import ToggleButton from '../components/buttons/ToggleButton';
import { uniqueArray } from '../utils/array';
import {
  handleUpVoteThread,
  handleDownVoteThread,
} from '../states/threads/action';

function HomePage() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('');

  const {
    threads = [],
    users = [],
    authUser = {},
  } = useSelector((states) => states);

  const threadList = threads
    .map((thread) => {
      return {
        ...thread,
        owner: users.find((user) => thread.ownerId === user.id),
        authUserId: authUser.id,
      };
    })
    .filter((thread) => (filter ? thread.category === filter : true));

  const categories = uniqueArray(threads.map((thread) => thread.category));

  const toggleCategory = (category) => {
    filter === category ? setFilter('') : setFilter(category);
  };

  const upVote = (id) => {
    dispatch(handleUpVoteThread(id));
  };

  const downVote = (id) => {
    dispatch(handleDownVoteThread(id));
  };

  useEffect(() => {
    dispatch(populateThreadsAndUsers());
  }, [dispatch]);

  return (
    <section className="p-5 lg:p-8">
      <h2 className="font-semibold">Filter by Tag</h2>
      <div className="flex flex-row gap-2 my-4 w-full overflow-scroll">
        {categories.map((category, index) => {
          return (
            <ToggleButton
              key={index}
              title={category}
              isActive={filter === category}
              onClick={() => toggleCategory(category)}
            />
          );
        })}
      </div>
      <div className="flex flex-col gap-3">
        {threadList.map((thread) => (
          <ThreadCard
            key={thread.id}
            {...thread}
            onUpVote={() => upVote(thread.id)}
            onDownVote={() => downVote(thread.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
