import {useAuthStore} from '../store/useAuthStore';

export const Home = () => {
 const store = useAuthStore()

  console.log('store', store)
  return (
    <div>
      Hello
    </div>
  );
};
