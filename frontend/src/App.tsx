import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './pages/home/HomePage';
import InterviewPage from './pages/interview/InterviewPage';
import LoginPage from './pages/login/LoginPage';
import MyPage from './pages/my/MyPage';
import PrivateRoute from './pages/private/PrivateRoute';
import QuestionPage from './pages/question/QuestionPage';
import RecordPage from './pages/record/RecordPage';
import ResultPage from './pages/result/ResultPage';
import ResultReportPage from './pages/result/ResultReportPage';
import SignUpPage from './pages/signup/SignupPage';

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
    element: (
      <PrivateRoute>
        <MyPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/interview',
    element: <InterviewPage />,
  },
  {
    path: '/record',
    element: (
      <PrivateRoute>
        <RecordPage />
      </PrivateRoute>
    ),
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
    element: (
      <PrivateRoute>
        <ResultPage />
      </PrivateRoute>
    ),
  },
  {
    path: '/result/:id',
    element: (
      <PrivateRoute>
        <ResultReportPage />
      </PrivateRoute>
    ),
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
