import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  
  async validateUser(username: string, password: string) {
    
    const user = { id: 1, username: 'admin', password: 'admin', role: 'admin' };
    
    if (username === user.username && password === user.password) {
      
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  
  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
