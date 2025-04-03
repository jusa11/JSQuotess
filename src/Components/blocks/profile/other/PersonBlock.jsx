import UserCard from '../../../others/UserCard';
import Logo from '../../../others/Logo';

const PersonBlock = () => {
  return (
    <div className="person-block">
      <Logo />
      <UserCard hidden={true} />
    </div>
  );
};

export default PersonBlock;
