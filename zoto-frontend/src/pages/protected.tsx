import withAuth from '../hoc/WithAuth';

const ProtectedPage = () => {
  return <div>Protected Content</div>;
};

export default withAuth(ProtectedPage);
