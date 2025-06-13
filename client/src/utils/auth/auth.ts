import {jwtDecode} from 'jwt-decode'

interface decodeOBJ {
    exp: number
}

class AuthService {
    getProfile() {
        const token:any = this.getToken();
        if(token){
            return jwtDecode(token);
        }
    }
    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }
    isTokenExpired(token: string) {
        try {
            const decoded: decodeOBJ = jwtDecode(token);
            if(decoded.exp < Date.now() /1000){
                return true;
            }
        } catch (err){
            return false;
        }
    }
    getToken() {
        return localStorage.getItem('id_token');
    }
    login(idToken:string) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/');
    }
    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }
}