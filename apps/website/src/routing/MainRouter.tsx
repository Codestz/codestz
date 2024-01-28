import { createBrowserRouter } from 'react-router-dom';
import { WithHeader } from '@codestz/common-ui';
import { HomePresenter } from '../pages';

export default function MainRouter() {
  return createBrowserRouter([
    {
      path: '/',
      element: <WithHeader />,
      children: [
        {
          index: true,
          element: <HomePresenter />,
        },
      ],
    },
  ]);
}
