import { useProjectsList } from '../../hooks';
import HomeComponent from './HomeComponent';

export function HomePresenter() {
  const { data } = useProjectsList();

  return <HomeComponent projects={data} />;
}
