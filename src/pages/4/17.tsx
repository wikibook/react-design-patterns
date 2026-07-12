import { BlackBoardAccessor } from './16';

export const ACCESS_TOKEN_EXIST = Symbol('ACCESS_TOKEN_EXIST');

export class AccessTokenAccessor extends BlackBoardAccessor<boolean> {
  constructor(blackBoard: Record<PropertyKey, unknown>) {
    super(blackBoard, ACCESS_TOKEN_EXIST);
  }
}
