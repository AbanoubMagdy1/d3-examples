import Loader from '../Loader/Loader';
import Message from '../Message/Message';

function HandleAsync ({ MainComponent, error, loading, ...props }) {
  if (loading) {
    return <Loader/>;
  }

  if (error) {
    return <Message>{error}</Message>;
  }

  return <MainComponent {...props}/>;
}

export default HandleAsync;