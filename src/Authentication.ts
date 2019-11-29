import { useCookies } from "react-cookie";
import { AxiosInstance } from "axios";

export class Authentication {
  private cookie: AuthenticationCookie;
  private readonly setCookie: (name: string, value: any) => void;
  private readonly removeCookie: (name: string) => void;

  constructor(
    private readonly api: AxiosInstance
  ) {
    const [cookie, setCookie, removeCookie] = useCookies(["auth"]);

    this.cookie = cookie.auth;
    this.setCookie = setCookie;
    this.removeCookie = removeCookie;
  }

  public get isAuthenticated(): boolean {
    return this.cookie && this.cookie.token !== undefined;
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

  public logout(): void {
    this.removeCookie("auth");
  }

}

interface AuthenticationCookie {
  token?: string
}
