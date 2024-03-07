import './Header.css'
import { Link } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'

// components
import { Button } from '@mui/material'
import PrimaryButtonThemeProvider from '../../themes/PrimaryButtonThemeProvider'

const Header = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return(
        <header>
            <div className="container">
                <Link to="/">
                    <h1>My Workout Buddy</h1>
                </Link>
                <PrimaryButtonThemeProvider>
                    <nav>
                        {user && (
                            <div className='test'>
                                <span>{user.email}</span>
                                <Button variant='outlined' onClick={handleClick}>Log out</Button>
                            </div>
                        )}
                        { !user && (
                            <div>
                                <Link to="/login">
                                    <Button variant='contained'>Login</Button>
                                </Link>
                                <Link to="/signup">
                                <Button variant='outlined'>Signup</Button>
                                </Link>
                            </div>
                        )}
                    </nav>
                </PrimaryButtonThemeProvider>
            </div>
        </header>
    )
}

export default Header
