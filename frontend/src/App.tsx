import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import HomePage from './pages/home/HomePage';
import InterviewPage from './pages/interview/InterviewPage';
import LoginPage from './pages/login/LoginPage';
import MyPage from './pages/my/MyPage';
import QuestionPage from './pages/question/QuestionPage';
import ResultPage from './pages/result/ResultPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/interview',
    element: <InterviewPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/my',
    element: <MyPage />,
  },
  {
    path: '/interview',
    element: <InterviewPage />,
  },
  {
    path: '/question',
    element: <QuestionPage />,
  },
  {
    path: '/result',
    element: <ResultPage />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
