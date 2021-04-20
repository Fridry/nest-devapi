import { UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Model, Types } from 'mongoose';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User, UserDocument } from './schemas/user.schema';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel('User')
    private userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: `${process.env.SECRET}`,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const userId = Types.ObjectId(payload.userId);

    const user = await this.userModel.findById({ _id: userId });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
