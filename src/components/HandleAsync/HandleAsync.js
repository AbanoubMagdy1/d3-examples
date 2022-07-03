import Loader from '../Loader/Loader';
import Message from '../Message/Message';

function HandleAsync ({ children, error, loading }) {
  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <Message>{error}</Message>;
  }

  return children;
}

export default HandleAsync;