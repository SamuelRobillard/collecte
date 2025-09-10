import test from 'node:test';
import { UserService } from '../services/user.service';


  test('should return all users', async () => {
  const users = await UserService.getAllUsers();
  
 
});