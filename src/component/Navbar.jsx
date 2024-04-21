import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { signOutUser } from '../Firebase';
import Cookies from 'js-cookie';
import styled from 'styled-components';


const Navbar = () => {
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedName = localStorage.getItem("name");
        const storedEmail = localStorage.getItem("email");
        const storedProfilePic = localStorage.getItem("profilePic");

        setName(storedName || '');
        setEmail(storedEmail || '');
        setProfilePic(storedProfilePic || '');
        setLoading(false);
    }, []);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            signOutUser();
            localStorage.removeItem("name");
            localStorage.removeItem("email");
            localStorage.removeItem("profilePic");
            Cookies.remove('authenticated'); // Remove the authentication cookie
            navigate('/login'); // Redirect to login page
        }
    };

    return (
        <NavbarContainer>
            <NavbarContent>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <UserInfo>
                        <ProfilePic src={profilePic} alt="Profile" />
                        <div>
                            <UserName>{name}</UserName>
                            <UserEmail>{email}</UserEmail>
                        </div>
                    </UserInfo>
                )}
            <NavLink to="/interpreter" style={{ textDecoration: 'none', color: 'white', marginRight: '10px' }}>Interpreter</NavLink>
        <NavLink to="/dreams" style={{ textDecoration: 'none', color: 'white', marginRight: '10px' }}>Dreams</NavLink>

                <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </NavbarContent>
        </NavbarContainer>
    );
};

export default Navbar;

    const NavbarContainer = styled.nav`
      background-color: #333;
      color: #fff;
      padding: 0.5rem;
    `;

    const NavbarContent = styled.div`
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: 1200px;
      margin: 0 auto;
    `;

    const UserInfo = styled.div`
      display: flex;
      align-items: center;
    `;

    const UserName = styled.h1`
      margin-right: 0.5rem;
      font-size: 1rem;
    `;

    const UserEmail = styled.h2`
      margin-right: 0.5rem;
      font-size: 0.8rem;
    `;

    const ProfilePic = styled.img`
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 0.5rem;
    `;

    const LogoutButton = styled.button`
      background-color: transparent;
      color: #fff;
      border: none;
      cursor: pointer;
      font-size: 0.8rem;
    `;







// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { useNavigate, NavLink } from 'react-router-dom';

// const NavbarContainer = styled.nav`
//   background-color: #333;
//   color: #fff;
//   padding: 0.5rem;
// `;

// const NavbarContent = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   max-width: 1200px;
//   margin: 0 auto;
// `;

// const UserInfo = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const UserName = styled.h1`
//   margin-right: 0.5rem;
//   font-size: 1rem;
// `;

// const UserEmail = styled.h2`
//   margin-right: 0.5rem;
//   font-size: 0.8rem;
// `;

// const ProfilePic = styled.img`
//   width: 30px;
//   height: 30px;
//   border-radius: 50%;
//   margin-right: 0.5rem;
// `;

// const LogoutButton = styled.button`
//   background-color: transparent;
//   color: #fff;
//   border: none;
//   cursor: pointer;
//   font-size: 0.8rem;
// `;

// const Navbar = () => {
//   const [loading, setLoading] = useState(true);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [profilePic, setProfilePic] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Simulate loading for the first time after 3 seconds
//     const timer = setTimeout(() => {
//       const storedName = localStorage.getItem("name");
//       const storedEmail = localStorage.getItem("email");
//       const storedProfilePic = localStorage.getItem("profilePic");

//       setName(storedName || '');
//       setEmail(storedEmail || '');
//       setProfilePic(storedProfilePic || '');
//       setLoading(false);
//     }, 3000);

//     return () => clearTimeout(timer); // Cleanup timeout on unmount

//   }, []);

//   const handleLogout = () => {
//     const confirmLogout = window.confirm("Are you sure you want to logout?");
//     if (confirmLogout) {
//       // signOutUser(); // You might have your sign out logic here
//       localStorage.removeItem("name");
//       localStorage.removeItem("email");
//       localStorage.removeItem("profilePic");
//       // Cookies.remove('authenticated'); // Remove the authentication cookie
//       navigate('/login'); // Redirect to login page
//     }
//   };

//   return (
//     <NavbarContainer>
//       <NavbarContent>
//         {loading ? (
//           <div>Loading...</div>
//         ) : (
//           <UserInfo>
//             <ProfilePic src={profilePic} alt="Profile" />
//             <div>
//               <UserName>{name}</UserName>
//               <UserEmail>{email}</UserEmail>
//             </div>
//           </UserInfo>
//         )}
//         <NavLink to="/interpreter" style={{ textDecoration: 'none', color: 'white', marginRight: '10px' }}>Interpreter</NavLink>
//         <NavLink to="/dreams" style={{ textDecoration: 'none', color: 'white', marginRight: '10px' }}>Dreams</NavLink>

//         <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
//       </NavbarContent>
//     </NavbarContainer>
//   );
// };

// export default Navbar;
