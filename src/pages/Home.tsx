// import { useLoaderData } from 'react-router-dom';

import { useAuth } from '../provider/AuthProvider';

const Home: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <h1 className="text-center">Home</h1>
      <p>
        {user.name} {user.lastname}
      </p>
    </>
  );
};

export default Home;
