import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();

    const hashedPassword = await this.hashPassword(password, salt);

    const newUser = new this.userModel({
      username,
      password: hashedPassword,
      salt,
    });

    try {
      await newUser.save();
    } catch (error) {
      const duplicatedUsernameErrorCode = 11000;

      if (error.code === duplicatedUsernameErrorCode) {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const userId = await this.validateUserPassword(authCredentialsDto);

    if (!userId) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { userId };

    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentialsDto;

    const user = await this.userModel.findOne({ username });

    const hash = await bcrypt.hash(password, user.salt);

    if (user && hash === user.password) {
      return user._id;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
