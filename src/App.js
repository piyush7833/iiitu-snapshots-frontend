// import logo from './logo.svg';
import styled, { ThemeProvider } from "styled-components";
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Video from './pages/Video';
import Photo from './pages/Photo';
import Auth from './pages/Auth'
import Videos from './pages/Videos';
import Photos from './pages/Photos'
import Contact from './pages/Contact'
import EmailVerify from "./pages/EmailVerify";
import BeforeEmailVerify from './pages/BeforeEmailVerify'
import ForgetPassword from './pages/ForgetPassword'
import ForgetPass from './pages/ForgetPass'
import { darkTheme } from './utils/theme';
import { lightTheme } from './utils/theme';
import { useSelector } from "react-redux";
import Footer from './components/Footer'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Payment from "./pages/Payment";
import useLocalStorage from "./useLocalstorage";
import PaymentSuccess from "./pages/PaymentSuccess";


const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
  background-color:${({ theme }) => theme.bgLighter}};
`;
const Wrapper = styled.div`
  // padding: 22px 96px;
  color:${({ theme }) => theme.text}}
`;

function App() {
  let [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  const [showMenu, setShowMenu] = useLocalStorage(true);
  const currentUser = useSelector(state => state.user.currentUser);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <BrowserRouter>
          {<Menu darkMode={darkMode} setDarkMode={setDarkMode} showMenu={showMenu} setShowMenu={setShowMenu} />}
          <Main>
            <Navbar showMenu={showMenu} setShowMenu={setShowMenu} />
            <Wrapper>
              <Routes>
                <Route path="/">
                  <Route index element={currentUser ? (<Home type="random" />) : (<Auth />)} />
                  <Route path='trend' element={<Home type="trend" />} />
                  <Route path="favorite" element={<Home type="sub" />} />
                  <Route path="recent" element={<Home type="recent" />} />
                  <Route path="myfiles" element={<Home type="myfiles" />} />
                  <Route path="saved" element={<Home type="saved" />} />
                  <Route path="history" element={<Home type="history" />} />
                  <Route path="search" element={<Search />} />
                  <Route path="videos" element={<Videos type="random" />} />
                  <Route path="photos" element={<Photos type="random" />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="payment" element={<Payment />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="verifyemail" element={<BeforeEmailVerify />} />
                  <Route path="video">
                    <Route path=":id" element={<Video />} />
                  </Route>
                  <Route path="photo">
                    <Route path=":id" element={<Photo />} />
                  </Route>
                  <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
                  {/* <Route path="/users/:id/reset/:resetToken" element={<ForgetPassword />} /> */}
                  <Route path="/users/:id/reset/:resetToken" element={<ForgetPassword />} />
                  <Route path="/recovery" element={<ForgetPass />} />

                  <Route path="/paymentsuccess" element={<PaymentSuccess />} />
                </Route>
              </Routes>
            </Wrapper>
            <Footer/>
          </Main>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}
export default App;
