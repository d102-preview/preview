import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/home/HomePage';
import InterviewPage from './pages/interview/InterviewPage';
import LoginPage from './pages/login/LoginPage';
import MyPage from './pages/my/MyPage';
import QuestionPage from './pages/question/QuestionPage';
import RecordPage from './pages/record/RecordPage';
import ResultPage from './pages/result/ResultPage';
import SignUpPage from './pages/signup/SignupPage';
import ResultReportPage from './pages/result/ResultReportPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/signup',
    element: <SignUpPage />,
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
    path: '/record',
    element: <RecordPage />,
  },
  {
    path: '/question',
    element: <QuestionPage />,
  },
  {
    path: '/question-list',
    element: <QuestionPage />,
  },
  {
    path: '/result',
    element: <ResultPage />,
  },
  {
    path: '/result/:id',
    element: <ResultReportPage />,
  },
]);
function App() {
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
