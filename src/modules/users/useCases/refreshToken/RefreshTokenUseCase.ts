import { updateRefreshTokenAndJWT } from "../../utils/auth/tokenAndRefreshToken";

interface IRefreshTokenUseCase {
  email: string;
  refresh_token: string;
  subject: string;
}
export class RefreshTokenUseCase {
  async execute({ email, refresh_token, subject }: IRefreshTokenUseCase) {
    const payload = { email };

    const { new_refresh_token, new_token } = await updateRefreshTokenAndJWT({
      email,
      refresh_token,
      payload,
      subject,
    });

    return { refresh_token: new_refresh_token, token: new_token };
  }
}
