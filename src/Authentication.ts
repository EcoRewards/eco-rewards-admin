import { useCookies } from "react-cookie";
import { AxiosInstance } from "axios";

export class Authentication {
  private cookie: AuthenticationCookie;
  private readonly setCookie: (name: string, value: any) => void;

  constructor(
    private readonly api: AxiosInstance
  ) {
    const [cookie, setCookie] = useCookies(["auth"]);

    this.cookie = cookie.auth;
    this.setCookie = setCookie;
  }

  public get isAuthenticated(): boolean {
    console.log(this.cookie);
    return this.cookie.token !== undefined;
  }

  public async login(username: string, password: string): Promise<void> {
    try {
      const response = await this.api.post("/login", { username, password });

      this.setCookie("auth", response.data.data);
    }
    catch (e) {
      console.error(e);
    }
  }

}

interface AuthenticationCookie {
  token?: string
}
